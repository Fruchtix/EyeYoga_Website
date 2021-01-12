import React, { createContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import getEyeMovement from "../../utilities/getEyeMovement";

export const EyeMovementContext = createContext();

export default function EyeTracker({ children }) {
  const [eyeMovements, setEyeMovements] = useState([]);
  const webcamRef = useRef(null);

  const videoConstraints = {
    facingMode: "user",
  };

  // Load the MediaPipe Facemesh package.
  const runFacemesh = async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
      { shouldLoadIrisModel: true }
    );

    setInterval(() => {
      detect(model);
    }, 100);
  };

  //Detect Webcam Feed
  const detect = async (model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const predictions = await model.estimateFaces({
        input: webcamRef.current.video,
      });

      setEyeMovements(getEyeMovement(predictions));
    }
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={false}
        videoConstraints={videoConstraints}
        onUserMedia={runFacemesh}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 720,
          height: 500,
          display: "none",
        }}
      />
      <EyeMovementContext.Provider value={eyeMovements}>
        {children}
      </EyeMovementContext.Provider>
    </>
  );
}
