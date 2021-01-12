import * as EYEMOVEMENTS from "../constants/eyeMovements";

function getEyeMovement(predictions) {
  const movements = [];
  if (predictions.length > 0) {
    for (let i = 0; i < predictions.length; i++) {
      const {
        rightEyeIris,
        leftEyeIris,
        rightEyeLower0,
        rightEyeLower1,
        leftEyeLower0,
        leftEyeLower1,
        rightEyeUpper1,
        leftEyeUpper1,
      } = predictions[i].annotations;

      //calculate eye metrics
      const eyewidthRight = rightEyeLower0[8][0] - rightEyeLower0[0][0];
      const eyewidthLeft = leftEyeLower0[0][0] - leftEyeLower0[8][0];
      const eyeHeightRight = rightEyeLower1[3][1] - rightEyeUpper1[3][1];
      const eyeHeightLeft = leftEyeLower1[3][1] - leftEyeUpper1[3][1];

      //Looks left - right eye
      if (rightEyeIris[1][0] > rightEyeLower0[8][0] - eyewidthRight * 0.25) {
        movements.push(EYEMOVEMENTS.looksLeftWithRightEye);
      }

      //Looks left - left eye
      if (leftEyeIris[3][0] > leftEyeLower0[0][0] - eyewidthLeft * 0.2) {
        movements.push(EYEMOVEMENTS.looksLeftWithLeftEye);
      }

      //Looks right - left eye
      if (leftEyeIris[1][0] < leftEyeLower0[8][0] + eyewidthLeft * 0.25) {
        movements.push(EYEMOVEMENTS.looksRightWithLeftEye);
      }

      //Looks right - right eye
      if (rightEyeIris[3][0] < rightEyeLower0[0][0] + eyewidthRight * 0.125) {
        movements.push(EYEMOVEMENTS.looksRightWithRightEye);
      }

      //Looks up - right eye
      if (rightEyeIris[0][1] < rightEyeLower1[3][1] - eyeHeightRight * 0.5) {
        movements.push(EYEMOVEMENTS.looksUpWithRightEye);
      }

      //Looks up - left eye
      if (leftEyeIris[0][1] < leftEyeLower1[3][1] - eyeHeightLeft * 0.5) {
        movements.push(EYEMOVEMENTS.looksUpWithLeftEye);
      }

      //Looks down - right eye
      if (rightEyeIris[0][1] > rightEyeLower1[3][1] - eyeHeightRight * 0.335) {
        movements.push(EYEMOVEMENTS.looksDownWithRightEye);
      }

      //Looks down - left eye
      if (leftEyeIris[0][1] > leftEyeLower1[3][1] - eyeHeightLeft * 0.335) {
        movements.push(EYEMOVEMENTS.looksDownWithLeftEye);
      }

      //Eye is shut - right eye
      if (rightEyeIris[1][0] - rightEyeIris[3][0] < eyewidthRight * 0.4) {
        movements.push(EYEMOVEMENTS.closeWithRightEye);
      }

      //Eye is shut - left eye
      if (leftEyeIris[3][0] - leftEyeIris[1][0] < eyewidthLeft * 0.4) {
        movements.push(EYEMOVEMENTS.closeWithLeftEye);
      }
    }
  }

  return movements;
}

export default getEyeMovement;
