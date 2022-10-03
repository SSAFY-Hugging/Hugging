import React, { useEffect, useRef, useState } from "react";
import styles from "./PlayingMusic.module.css";
import PlayingText from "./PlayingText";
function PlayingMusic(props) {
  const [music, setMusic] = useState([]);
  const url = props.url;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setMusic(result);
      });
  }, []);

  const [toggle, setToggle] = useState(true);
  const ClickedToggle = () => {
    setToggle((prev) => !prev);
  };

  const audioPlayer = useRef();
  const [setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [audiostatus, setaudiostatus] = useState(true);
  const play = () => {
    setaudiostatus((prev) => !prev);
    audioPlayer.current.play();
  };

  const pause = () => {
    setaudiostatus((prev) => !prev);
    audioPlayer.current.pause();
  };

  const stop = () => {
    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;
  };

  const onPlaying = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    setSeekValue(
      (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
    );
  };

  const [textstatus, settextstatus] = useState(true);

  const clicktext = () => {
    settextstatus((prev) => !prev);
  };

  return (
    <div>
      {textstatus ? <PlayingText /> : <div></div>}
      <div>
        <audio
          src={music.data?.musicUrl}
          ref={audioPlayer}
          onTimeUpdate={onPlaying}
        ></audio>
      </div>
      {toggle ? (
        <div className={styles.FirstButton}>
          <div className={styles.MoreCircle} onClick={ClickedToggle}></div>
        </div>
      ) : (
        <div>
          <img
            src="../halfcircle.png"
            className={styles.BigCircle}
            alt="bigcircle"
          ></img>
          <img
            src="../bordercircle.png"
            className={styles.CloseButton}
            onClick={ClickedToggle}
            alt="close"
          ></img>
          {audiostatus ? (
            <img
              src="../playbutton.png"
              className={styles.PlayButton}
              alt="play"
              onClick={play}
            ></img>
          ) : (
            <img
              src="../pause.png"
              className={styles.PlayButton}
              alt="play"
              onClick={pause}
            ></img>
          )}
          <img
            src="../Document.png"
            className={styles.TextButton}
            alt="text"
            onClick={clicktext}
          ></img>
          <img
            src="../Heart2.png"
            className={styles.HeartButton}
            alt="heart"
          ></img>
        </div>
      )}
    </div>
  );
}
export default PlayingMusic;
