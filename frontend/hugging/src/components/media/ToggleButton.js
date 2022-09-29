import React from "react";
import styles from "./ToggleButton.module.css";

function ToggleButton() {
  return (
    <>
      <div className={styles.Box}>
        <div className={styles.ToggleBox}>
          <div className={styles.MeditationBox}>
            <img
              src="../meditation.png"
              alt="meditation"
              className={styles.MeditationImage}
            ></img>
            <p className={styles.Text}>명상</p>
          </div>
          <div className={styles.SoundBox}>
            <img
              src="../sound.png"
              alt="sound"
              className={styles.SoundImage}
            ></img>
            <p className={styles.Text}>사운드</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToggleButton;
