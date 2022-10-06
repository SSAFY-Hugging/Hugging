import "./RegisterCategory.module.css";
import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeEmotion, deleteEmotion } from "../../store";
import styles from "./RegisterCategory.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import emotion1 from "../../img/emotion1.png";
import emotion2 from "../../img/emotion2.png";
import emotion3 from "../../img/emotion3.png";
import emotion4 from "../../img/emotion4.png";
import emotion5 from "../../img/emotion5.png";
import emotion6 from "../../img/emotion6.png";
import emotion7 from "../../img/emotion7.png";
import emotion8 from "../../img/emotion8.png";
import emotion9 from "../../img/emotion9.png";
import emotion10 from "../../img/emotion10.png";
import emotion11 from "../../img/emotion11.png";
import emotion12 from "../../img/emotion12.png";

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
  const emotionArr = [
    emotion1,
    emotion2,
    emotion3,
    emotion4,
    emotion5,
    emotion6,
    emotion7,
    emotion8,
    emotion9,
    emotion10,
    emotion11,
    emotion12,
  ];
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
                if (emotion[i] === true) {
                  sessionStorage.setItem("emotion", JSON.stringify(emotion));
                } else {
                  sessionStorage.setItem("emotion", JSON.stringify(emotion));
                }
              }}
            >
              <img
                src={emotionArr[i]}
                width="30px"
                height="30px"
                // className={styles.emotion}
              />
              <p className={styles.emotion_txt}>{emotion[i]}</p>
            </button>
          );
        })}
        <div></div>
      </div>
      <button
        className={styles.counselor_login_btn}
        onClick={() => {
          navigate("/profile");
        }}
      >
        다음
      </button>
      <div className={styles.team}>
        <p className={styles.info2}>TEAM B204 | Hugging</p>
        <p className={styles.info3}>
          Copyright © 2022 Hugging All Rights Reserved.
        </p>
      </div>
    </>
  );
}

export default RegisterCategory;
