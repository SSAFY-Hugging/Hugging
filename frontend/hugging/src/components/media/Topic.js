import React from "react";
import styles from "./Topic.module.css";
import { useNavigate } from "react-router-dom";

function Topic(props) {
  const navigate = useNavigate();

  return (
    <>
      <div>
        {props.topicdatas.map((topicdata) => (
          <div>
            <div className={styles.Title}>
              <h3 className={styles.TitleText}>{topicdata.category}</h3>
              <a
                href={`/TopicMediaPage/${topicdata.id}`}
                className={styles.LinkText}
              >
                {" "}
                전체 보기 {">"}{" "}
              </a>
            </div>
            <div className={styles.List}>
              {topicdata.musicResponseList.map((music) => (
                <button
                  class={styles.Topic}
                  onClick={() => navigate(`/playing_music/${music.id}`)}
                >
                  <img
                    src={`https://placeimg.com/200/100/${music.category}/${music.id}`}
                    alt="agra"
                    className={styles.image}
                  ></img>
                  <p className={styles.Text}>{music.name}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
        ;
      </div>
    </>
  );
}

export default Topic;
