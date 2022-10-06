import React from "react";
import styles from "./Recommend.module.css";
import { useNavigate } from "react-router-dom";

function Recommend(props) {
  const navigate = useNavigate();

  const sounds = props.musicdatas;

  return (
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
        {sounds.map((musicdata) => (
          <button
            className={styles.Meditation}
            onClick={() => navigate(`/playing_music/${musicdata.id}`)}
          >
            <img
              src={`https://placeimg.com/200/100/${musicdata.category}/${musicdata.id}`}
              alt="music"
              className={styles.MusicImage}
            ></img>
            <p className={styles.contentText}>{musicdata.name}</p>
            <img
              src="../whiteplaybutton.png"
              alt="play"
              className={styles.Icon}
            ></img>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Recommend;