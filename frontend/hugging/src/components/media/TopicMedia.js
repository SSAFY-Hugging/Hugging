import React from "react";
import styles from "./TopicMedia.module.css";
import { useNavigate } from "react-router-dom";

function TopicMedia() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className={styles.List}>
          <button
            className={styles.Topic}
            onClick={() => navigate("/playing_music")}
          >
            <p className={styles.Text}>
              아침 등교 시간, 유난히 싱그러웠던 햇살
            </p>
            <div className="ImgBox">
              <img src="agra.jfif" alt="agra" className={styles.image}></img>
              <img
                src="whiteplaybutton.png"
                alt="play"
                className={styles.Icon}
              ></img>
            </div>
          </button>
          <button
            className={styles.Topic}
            onClick={() => navigate("/playing_music")}
          >
            <p className={styles.Text}>
              아침 등교 시간, 유난히 싱그러웠던 햇살
            </p>
            <div className="ImgBox">
              <img src="agra.jfif" alt="agra" className={styles.image}></img>
              <img
                src="whiteplaybutton.png"
                alt="play"
                className={styles.Icon}
              ></img>
            </div>
          </button>{" "}
          <button
            className={styles.Topic}
            onClick={() => navigate("/playing_music")}
          >
            <p className={styles.Text}>
              아침 등교 시간, 유난히 싱그러웠던 햇살
            </p>
            <div className="ImgBox">
              <img src="agra.jfif" alt="agra" className={styles.image}></img>
              <img
                src="whiteplaybutton.png"
                alt="play"
                className={styles.Icon}
              ></img>
            </div>
          </button>{" "}
          <button
            className={styles.Topic}
            onClick={() => navigate("/playing_music")}
          >
            <p className={styles.Text}>
              아침 등교 시간, 유난히 싱그러웠던 햇살
            </p>
            <div className="ImgBox">
              <img src="agra.jfif" alt="agra" className={styles.image}></img>
              <img
                src="whiteplaybutton.png"
                alt="play"
                className={styles.Icon}
              ></img>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default TopicMedia;
