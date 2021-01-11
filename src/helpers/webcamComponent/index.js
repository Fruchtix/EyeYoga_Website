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

      const ctx = canvasRef.current.getContext("2d");
      drawMesh(predictions, ctx);

      if (predictions.length > 0) {
        for (let i = 0; i < predictions.length; i++) {
          const rightEyeIris = {
            name: "rightEyeIris",
            data: predictions[i].annotations.rightEyeIris,
          };
          const leftEyeIris = {
            name: "leftEyeIris",
            data: predictions[i].annotations.leftEyeIris,
          };
          const rightEyeLower = {
            name: "rightEyeLower",
            data: predictions[i].annotations.rightEyeLower0,
          };
          const leftEyeLower = {
            name: "leftEyeLower",
            data: predictions[i].annotations.leftEyeLower0,
          };
          const rightEyeUpper = {
            name: "rightEyeUpper",
            data: predictions[i].annotations.rightEyeUpper0,
          };
          const leftEyeUpper = {
            name: "leftEyeUpper",
            data: predictions[i].annotations.leftEyeUpper0,
          };

          const keypoints = [
            rightEyeIris,
            // leftEyeIris,
            rightEyeLower,
            // leftEyeLower,
            // leftEyeUpper,
            // rightEyeUpper,
          ];

          //calculate eyewidth
          const eyewidth = rightEyeLower.data[8][0] - rightEyeLower.data[0][0];

          if (
            rightEyeIris.data[1][0] >
            rightEyeLower.data[8][0] - eyewidth * 0.25
          ) {
            console.log("schaut nach links");
          }

          if (
            rightEyeIris.data[3][0] <
            rightEyeLower.data[0][0] + eyewidth * 0.1
          ) {
            console.log("schaut nach rechts");
          }

          // else {
          //   console.log("Iris Left" + rightEyeIris.data[3][0]);
          //   console.log("Iris Right" + rightEyeIris.data[1][0]);
          //   console.log("Lower 8:" + rightEyeLower.data[8][0]);
          //   console.log("Lower 0:" + rightEyeLower.data[0][0]);
          //   console.log("width:" + eyewidth);
          // }

          keypoints.forEach((element) => {
            for (let i = 0; i < element.data.length; i++) {
              const [x, y, z] = element.data[i];

              // console.log(`Keypoint ${element.name} ${i}: [${x}, ${y}, ${z}]`);
            }
          });
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
