import React, { useContext, useEffect } from "react";
import { EyeMovementContext } from "../../providers/eyeTracker";

function Sequence() {
  const eyeMovement = useContext(EyeMovementContext);
  useEffect(() => {}, [eyeMovement]);
  return <div>sequence</div>;
}

export default Sequence;
