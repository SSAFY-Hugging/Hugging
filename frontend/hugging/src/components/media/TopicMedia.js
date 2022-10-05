import React from "react";
import styles from "./TopicMedia.module.css";
import { useNavigate } from "react-router-dom";

function TopicMedia(props) {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className={styles.List}>
          {props.musicdatas.musicResponseList?.map((music) => (
            <button
              className={styles.Topic}
              onClick={() => navigate(`/playing_music/${music.id}`)}
            >
              <div className="ImgBox">
                <img
                  src={`https://placeimg.com/200/100/${music.category}/${music.id}`}
                  alt="agra"
                  className={styles.image}
                ></img>
                <img
                  src="../whiteplaybutton.png"
                  alt="play"
                  className={styles.Icon}
                ></img>
                <p className={styles.Text}>{music.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default TopicMedia;
