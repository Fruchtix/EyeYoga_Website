import React, { useState } from "react";
import { EyeTracker } from "../../providers";
import { Sequence } from "../../components";

function SequenceContainer() {
  const [completed, setCompleted] = useState(false);
  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <div>
      <EyeTracker>
        {!completed ? (
          <Sequence sequence={"sequenceOne"} handleComplete={handleComplete} />
        ) : (
          <div>geschafft</div>
        )}
      </EyeTracker>
    </div>
  );
}

export default SequenceContainer;
