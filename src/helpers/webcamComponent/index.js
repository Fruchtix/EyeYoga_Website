import React, { useRef } from "react";
import Webcam from "react-webcam";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import { drawMesh } from "../../utilities/mesh";

export default function WebcamComponent() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
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
      // Get Video Properties
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const predictions = await model.estimateFaces({
        input: webcamRef.current.video,
      });

      // console.log(predictions);

      // const ctx = canvasRef.current.getContext("2d");
      // drawMesh(predictions, ctx);

      if (predictions.length > 0) {
        for (let i = 0; i < predictions.length; i++) {
          const {
            rightEyeIris,
            leftEyeIris,
            rightEyeLower0,
            rightEyeLower1,
            leftEyeLower0,
            leftEyeLower1,
            rightEyeUpper0,
            rightEyeUpper1,
            leftEyeUpper0,
            leftEyeUpper1,
          } = predictions[i].annotations;

          //calculate eye metrics
          const eyewidthRight = rightEyeLower0[8][0] - rightEyeLower0[0][0];
          const eyewidthLeft = leftEyeLower0[8][0] - leftEyeLower0[0][0];
          const eyeHeightRight = rightEyeLower1[3][1] - rightEyeUpper1[3][1];

          if (
            rightEyeIris[1][0] >
            rightEyeLower0[8][0] - eyewidthRight * 0.25
          ) {
            console.log("schaut nach links - rechtes Auge");
          }

          if (leftEyeIris[1][0] > leftEyeLower0[8][0] - eyewidthLeft * 0.25) {
            console.log("schaut nach links - linkes Auge");
          }

          // if (
          //   rightEyeIris[3][0] <
          //   rightEyeLower0[0][0] + eyewidthRight * 0.1125
          // ) {
          //   console.log("schaut nach rechts - rechtes Auge");
          // }

          // if (
          //   rightEyeIris[0][1] <
          //   rightEyeLower1[3][1] - eyeHeightRight * 0.5
          // ) {
          //   console.log("schaut nach oben - rechtes Auge");
          // }

          // if (
          //   rightEyeIris[0][1] >
          //   rightEyeLower1[3][1] - eyeHeightRight * 0.335
          // ) {
          //   console.log("schaut nach unten - rechtes Auge");
          // }

          // if (rightEyeIris[1][0] - rightEyeIris[3][0] < eyewidthRight * 0.385) {
          //   console.log("Augen sind zu - rechtes Auge");
          // }
        }
      }
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
          // zIndex: -100,
          display: "none",
        }}
      />
      <canvas
        ref={canvasRef}
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
        }}
      />
    </>
  );
}
