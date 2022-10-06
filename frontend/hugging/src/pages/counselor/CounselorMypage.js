import React from "react";
import styles from "./CounselorMypage.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginCounselor } from "../../store";
import Calendar from "../../components/counselor/MyCalendar";
// import Star from "../../components/counselor/Star";
import Nav from "../../components/ui/Nav";
import Card from "../../components/ui/Card";
import { propTypes } from "react-bootstrap/esm/Image";
import { ClassNames } from "@emotion/react";

function CounselorMypage() {
  let profile = localStorage.getItem("counselorprofile");
  let counselorprofile = JSON.parse(profile);
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  //프주 수정
  // const starClickHandler = (starScore) => {
  //   console.log(starScore);
  // };

  let value = "Depressed";
  if (counselorprofile.subject === "Depressed") value = "우울";
  if (counselorprofile.subject === "Insomnia") value = "불면";
  if (counselorprofile.subject === "Family") value = "가족";
  if (counselorprofile.subject === "School") value = "학교";
  if (counselorprofile.subject === "Company") value = "직장/진로";
  if (counselorprofile.subject === "Relationship") value = "대인관계";
  if (counselorprofile.subject === "Love") value = "연애/결혼";
  if (counselorprofile.subject === "SelfUnderstanding") value = "자기이해";

  const certificates = counselorprofile.certificate.split("#");
  const careers = counselorprofile.career.split("#");
  const explains = counselorprofile.explanation.split("\\n");

  const starRendering = () => {
    const result = [];
    if (counselorprofile.average === null) {
      for (let i = 0; i < 5; i++) {
        result.push(
          <img
            key={i}
            src="../emptyStar.png"
            alt="emptyStar"
            className={styles.starImg}
          ></img>
        );
      }
    } else {
      for (let i = 0; i < Math.floor(counselorprofile.average); i++) {
        result.push(
          <img
            key={i}
            src="../Star.png"
            alt="star"
            className={styles.starImg}
          ></img>
        );
      }
      for (let i = 0; i < 5 - Math.floor(counselorprofile.average); i++) {
        result.push(
          <img
            key={i + 5}
            src="../emptyStar.png"
            alt="emptyStar"
            className={styles.starImg}
          ></img>
        );
      }
    }
    return result;
  };
  //

  return (
    <>
      <div className={styles.Nav}>
        <h6 className={styles.counselor_title}>상담사 페이지</h6>
      </div>
      <Card className={styles.counselor_card}>
        <div className={styles.back}>
          <div>
            {!counselorprofile.profileImage && (
              <img
                src="../sampleCounselorSquare.png"
                className={styles.profileImage}
              ></img>
            )}
            {counselorprofile.profileImage && (
              <img
                src={counselorprofile.profileImage}
                className={styles.profileImage}
              ></img>
            )}
            <div className="">
              <span className={styles.counselor_name}>
                {counselorprofile.name} 상담사
              </span>
            </div>
          </div>
          <div>
            <div className={styles.counselor_card_item}>
              <span className={styles.counselor_card_item_text}>가능 시간</span>
              <span className={styles.counselor_text}>
                {counselorprofile.availableTime}
              </span>
            </div>
            <div>
              <span className={styles.counselor_card_item_text}>자격증</span>
              <span className={styles.counselor_text}>
                <ul>
                  {certificates.map((certificate, index) => (
                    <li key={index} className={styles.counselor_text}>
                      {certificate}
                    </li>
                  ))}
                </ul>
              </span>
            </div>
            <div>
              <span className={styles.counselor_card_item_text}>전문분야</span>
              <span className={styles.counselor_text}>{value}</span>
            </div>
            <div>
              {/* <Star onClick={starClickHandler} /> */}
              {starRendering()}
              <span> ({counselorprofile.average})</span>
            </div>
          </div>
        </div>
        <div className={styles.space}>
          <span className={styles.counselor_card_item_text}>
            주요 자격 및 경력
          </span>
        </div>
        <div className={styles.counselor_text2}>
          <ul>
            {careers.map((career, index) => (
              <li key={index} className={styles.counselor_text}>
                {career}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className={styles.counselor_card_item_text}>상담사 이야기</span>
        </div>
        <div className={styles.counselor_text2}>
          {explains.map((explain, index) => (
            <div key={index} className={styles.counselor_text}>
              {explain}
            </div>
          ))}
        </div>
      </Card>

      <Calendar />
    </>
  );
}

export default CounselorMypage;
