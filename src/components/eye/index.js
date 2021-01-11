import React from "react";
import styles from "./eye.module.css";
import { WebcamComponent } from "../../helpers";

function Eye(props) {
  return (
    <div className={styles.container}>
      <WebcamComponent />
    </div>
  );
}

export default Eye;
