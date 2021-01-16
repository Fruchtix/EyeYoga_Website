import React, { useEffect } from "react";

function Exercise({ exercise, completed, eyeMovement }) {
  useEffect(() => {
    if (eyeMovement.includes(exercise.exercise)) {
      completed();
    }
  }, [eyeMovement, completed, exercise]);

  return <div>{exercise.icon}</div>;
}

export default Exercise;
