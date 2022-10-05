import React, { useEffect, useRef, useState } from "react";
import styles from "./Recommend.module.css";
import { useNavigate } from "react-router-dom";

function Recommend(props) {
  const navigate = useNavigate();
  const [type, setType] = useState(true);
  const meditationClicked = () => {
    setType((prev) => !prev);
  };
  const soundClicked = () => {
    setType((prev) => !prev);
  };
  const AllMusic = props.musicdatas;
  console.log(AllMusic);
  const meditations = AllMusic.filter((music) => music.type === "MEDITATION");
  const sounds = AllMusic.filter((music) => music.type === "SOUND");
  console.log(meditations);
  console.log(sounds);

  return (
    <div>
      {" "}
      {type ? (
        <div>
          <div className={styles.Box}>
            <div className={styles.ToggleBox}>
              <div className={styles.MeditationBox_M}>
                <img
                  src="../meditation.png"
                  alt="meditation"
                  className={styles.MeditationImage}
                ></img>
                <p className={styles.Text}>명상</p>
              </div>
              <div className={styles.SoundBox_M} onClick={soundClicked}>
                <img
                  src="../sound.png"
                  alt="sound"
                  className={styles.SoundImage}
                ></img>
                <p className={styles.Text}>사운드</p>
              </div>
            </div>
          </div>
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
              {meditations.map((musicdata) => (
                <button
                  className={styles.Meditation}
                  onClick={() => navigate(`/playing_music/${musicdata.id}`)}
                >
                  <img
                    src={`https://placeimg.com/200/100/${musicdata.category}/${musicdata.id}`}
                    alt="music"
                    className={styles.MusicImage}
                  ></img>
                  <p className="contentText">{musicdata.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.Box}>
            <div className={styles.ToggleBox}>
              <div
                className={styles.MeditationBox_S}
                onClick={meditationClicked}
              >
                <img
                  src="../meditation.png"
                  alt="meditation"
                  className={styles.MeditationImage}
                ></img>
                <p className={styles.Text}>명상</p>
              </div>
              <div className={styles.SoundBox_S}>
                <img
                  src="../sound.png"
                  alt="sound"
                  className={styles.SoundImage}
                ></img>
                <p className={styles.Text}>사운드</p>
              </div>
            </div>
          </div>
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
                  <p className="contentText">{musicdata.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommend;
