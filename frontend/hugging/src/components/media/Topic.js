import React from "react";
import styles from "./Topic.module.css";
import { useNavigate } from "react-router-dom";

function Topic() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className={styles.Title}>
          <h3 className={styles.TitleText}>다시 같이 가요. 학교</h3>
          <a href="/" className={styles.LinkText}>
            {" "}
            전체 보기 {">"}{" "}
          </a>
        </div>
        <div className={styles.List}>
          <button
            class={styles.Topic}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.Text}>
              아침 등교 시간, 유난히 싱그러웠던 햇살
            </p>
          </button>
          <button
            class={styles.Topic}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.Text}>
              아침 등교 시간, 유난히 싱그러웠던 햇살
            </p>
          </button>
          <button
            class={styles.Topic}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.Text}>
              아침 등교 시간, 유난히 싱그러웠던 햇살
            </p>
          </button>
          <button
            class={styles.Topic}
            onClick={() => navigate("/playing_music")}
          >
            <img src="agra.jfif" alt="agra" className={styles.image}></img>
            <p className={styles.Text}>
              아침 등교 시간, 유난히 싱그러웠던 햇살
            </p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Topic;
