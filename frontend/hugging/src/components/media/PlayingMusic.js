import React, { useEffect, useRef, useState } from "react";
import styles from "./PlayingMusic.module.css";
import PlayingText from "./PlayingText";
import { useNavigate } from "react-router-dom";
import Review from "./Review";
function PlayingMusic(props) {
  const navigate = useNavigate();
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

  const [audiostatus, setaudiostatus] = useState(false);
  const play = () => {
    setaudiostatus((prev) => !prev);
    audioPlayer.current.play();
  };

  const pause = () => {
    setaudiostatus((prev) => !prev);
    audioPlayer.current.pause();
  };

  const [textstatus, settextstatus] = useState(true);

  const clicktext = () => {
    settextstatus((prev) => !prev);
  };
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      {textstatus ? <PlayingText /> : <div></div>}
      <div>
        <audio
          src={music.data?.musicUrl}
          ref={audioPlayer}
          autoPlay={true}
          muted={false}
          onEnded={() => navigate(`/musicreview`)}
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
          <div>
            <button onClick={showModal}>
              <img
                src="../Heart2.png"
                className={styles.HeartButton}
                alt="heart"
              ></img>
              {modalOpen && (
                <Review setModalOpen={setModalOpen} musicid={music.data.id} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default PlayingMusic;
