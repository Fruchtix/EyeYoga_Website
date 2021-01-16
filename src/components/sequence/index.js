import React, { useContext, useState } from "react";
import { EyeMovementContext } from "../../providers/eyeTracker";
import * as exerciseSequences from "../../fixtures/sequences";
import { Exercise } from "../../components";

function Sequence({ sequence, handleComplete }) {
  const eyeMovement = useContext(EyeMovementContext);
  const [currentExercise, setCurrentExercise] = useState(0);
  const currentSequence = sequence;

  const handleNextExercise = () => {
    if (currentExercise < exerciseSequences[currentSequence].length - 1) {
      setCurrentExercise((id) => id + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    handleComplete();
  };

  return (
    <div>
      <Exercise
        exercise={exerciseSequences[currentSequence][currentExercise]}
        eyeMovement={eyeMovement}
        completed={handleNextExercise}
      />
    </div>
  );
}

export default Sequence;
