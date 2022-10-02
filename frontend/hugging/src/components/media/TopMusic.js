import React from "react";
import styles from "./TopMusic.module.css";
import { useNavigate } from "react-router-dom";

function TopMusic(props) {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <p className={styles.TitleText}>인기 추천</p>
      </div>
      <div className={styles.MusicTop}>
        {props.topmusicdatas.map((topmusic) => (
          <button
            className={styles.music}
            onClick={() => navigate(`/playing_music/${topmusic.id}`)}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.MusicText}>{topmusic.name}</p>
            <img
              src="play-icon.png"
              alt="play-icon"
              className="play-icon"
            ></img>
          </button>
        ))}
      </div>
    </>
  );
}

export default TopMusic;
