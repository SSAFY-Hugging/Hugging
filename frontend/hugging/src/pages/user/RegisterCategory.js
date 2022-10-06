import "./RegisterCategory.module.css";
import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeEmotion, deleteEmotion } from "../../store";
import styles from "./RegisterCategory.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

function RegisterCategory({ history }) {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let user = useSelector((state) => {
    return state.user;
  });
  let [btn, setBtn] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  let [emotion, setEmotion] = useState([
    "행복함",
    "편안함",
    "설렘",
    "슬픔",
    "우울함",
    "상실감",
    "지루함",
    "외로움",
    "무기력",
    "분노",
    "짜증남",
    "불편함",
  ]);

  return (
    <>
      <div className={styles.category_title}>
        <h2 className={styles.hug}>Hug</h2>
        <h2>ging</h2>
      </div>
      <div className={styles.order}></div>
      <div className={styles.writing}>
        <p className={styles.gomin}>고민</p>
        <p className={styles.category}>category</p>
      </div>
      <div id={styles.category_card}>
        {btn.map(function (a, i) {
          return (
            <button
              onClick={() => {
                let emotion = [...btn];
                emotion[i] = !btn[i];
                setBtn(emotion);
                console.log(emotion);
                if (emotion[i] === true) {
                  // emotionre[i] = emotion[i];
                  // setEmotionre(emotionre);
                  sessionStorage.setItem("emotion", JSON.stringify(emotion));
                } else {
                  // emotionre[i] = null;
                  // setEmotionre(emotionre);
                  // localStorage.setItem("emotion", emotionre);
                  sessionStorage.setItem("emotion", JSON.stringify(emotion));
                }
              }}
            >
              {emotion[i]}
            </button>
          );
        })}
        <div></div>
      </div>
      <button
        className={styles.counselor_login_btn}
        onClick={() => {
          {
            btn ===
            [
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ]
              ? null
              : null;
          }
          navigate("/profile");
        }}
      >
        다음
      </button>
    </>
  );
}

export default RegisterCategory;
