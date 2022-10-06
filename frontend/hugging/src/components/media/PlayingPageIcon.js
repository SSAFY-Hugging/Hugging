import React, { useEffect, useState } from "react";
import styles from "./PlayingPageIcon.module.css";
import { useNavigate } from "react-router-dom";
function PlayingPageIcon() {

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.Icon}>
        <button onClick={() => navigate("/recommend_media")}>
          <img src="../X.png" alt="image" className={styles.image}></img>
        </button>
      </div>
    </>
  );
}

export default PlayingPageIcon;
