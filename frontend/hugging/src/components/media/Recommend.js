import React from "react";
import styles from "./Recommend.module.css";
import { useNavigate } from "react-router-dom";

function Recommend(props) {
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
          {props.musicdatas.map((musicdata) => (
            <button
              className={styles.Meditation}
              onClick={() => navigate(`/playing_music/${musicdata.id}`)}
            >
              <img
                src="./music.png"
                alt="music"
                className={styles.MusicImage}
              ></img>
              <p className="MeditationText">{musicdata.name}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Recommend;
