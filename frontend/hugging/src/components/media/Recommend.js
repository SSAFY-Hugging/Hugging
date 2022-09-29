import React from "react";
import styles from "./Recommend.module.css";
import { useNavigate } from "react-router-dom";

function Recommend() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className={styles.Title}>
          <h3 className={styles.TitleText}>맞춤 추천</h3>
          <img
            src="./guitar.png"
            alt="guitar"
            className={styles.TitleImage}
          ></img>
        </div>
        <div className={styles.List}>
          <button
            className={styles.Meditation}
            onClick={() => navigate("/playing_music")}
          >
            <img
              src="./music.png"
              alt="music"
              className={styles.MusicImage}
            ></img>
            <p className="MeditationText">집중력 향상을 위한 아침 명상</p>
          </button>
          <button
            className={styles.Meditation}
            onClick={() => navigate("/playing_music")}
          >
            <img
              src="./music.png"
              alt="music"
              className={styles.MusicImage}
            ></img>
            <p className="MeditationText">집중력 향상을 위한 아침 명상</p>
          </button>
          <button
            className={styles.Meditation}
            onClick={() => navigate("/playing_music")}
          >
            <img
              src="./music.png"
              alt="music"
              className={styles.MusicImage}
            ></img>
            <p className="MeditationText">집중력 향상을 위한 아침 명상</p>
          </button>
          <button
            className={styles.Meditation}
            onClick={() => navigate("/playing_music")}
          >
            <img
              src="./music.png"
              alt="music"
              className={styles.MusicImage}
            ></img>
            <p className="MeditationText">집중력 향상을 위한 아침 명상</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Recommend;
