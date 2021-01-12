import React from "react";
import { EyeTracker } from "../../providers";
import { Sequence } from "../../components";
import styles from "./home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <EyeTracker>
        <Sequence />
      </EyeTracker>
    </div>
  );
}

export default Home;
