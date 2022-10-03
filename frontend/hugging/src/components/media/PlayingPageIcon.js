import React from "react";
import styles from "./PlayingPageIcon.module.css";

function PlayingPageIcon() {
  return (
    <>
      <div className={styles.Icon}>
        <a href="/recommend_media">
          <img src="../X.png" alt="image" className={styles.image}></img>
        </a>
      </div>
    </>
  );
}

export default PlayingPageIcon;
