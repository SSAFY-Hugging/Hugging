import React from "react";
import styles from "./TopMusic.module.css";
import { useNavigate } from "react-router-dom";

function TopMusic() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <p className={styles.TitleText}>인기 추천</p>
      </div>
      <div className={styles.MusicTop}>
        <div>
          <button
            className={styles.music}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.MusicText}>아그라 사원으로 가는 기차</p>
            <img
              src="play-icon.png"
              alt="play-icon"
              className="play-icon"
            ></img>
          </button>
          <button
            className={styles.music}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.MusicText}>아그라 사원으로 가는 기차</p>
            <img
              src="play-icon.png"
              alt="play-icon"
              className="play-icon"
            ></img>
          </button>
          <button
            className={styles.music}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.MusicText}>아그라 사원으로 가는 기차</p>
            <img
              src="play-icon.png"
              alt="play-icon"
              className="play-icon"
            ></img>
          </button>
        </div>
        <div>
          <button
            className={styles.music}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.MusicText}>아그라 사원으로 가는 기차</p>
            <img
              src="play-icon.png"
              alt="play-icon"
              className="play-icon"
            ></img>
          </button>
          <button
            className={styles.music}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.MusicText}>아그라 사원으로 가는 기차</p>
            <img
              src="play-icon.png"
              alt="play-icon"
              className="play-icon"
            ></img>
          </button>
          <button
            className={styles.music}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.MusicText}>아그라 사원으로 가는 기차</p>
            <img
              src="play-icon.png"
              alt="play-icon"
              className="play-icon"
            ></img>
          </button>
        </div>
        <div>
          <button
            className={styles.music}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.MusicText}>아그라 사원으로 가는 기차</p>
            <img
              src="play-icon.png"
              alt="play-icon"
              className="play-icon"
            ></img>
          </button>
          <button
            className={styles.music}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.MusicText}>아그라 사원으로 가는 기차</p>
            <img
              src="play-icon.png"
              alt="play-icon"
              className="play-icon"
            ></img>
          </button>
          <button
            className={styles.music}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.MusicText}>아그라 사원으로 가는 기차</p>
            <img
              src="play-icon.png"
              alt="play-icon"
              className="play-icon"
            ></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default TopMusic;
