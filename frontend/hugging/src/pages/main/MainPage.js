import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginCounselor } from "../../store";
import NavBar from "../../components/ui/NavBar";
import PersonalRecommend from "../../components/media/PersonalRecommend";
import styles from "./MainPage.module.css";
import Nav from "../../components/ui/Nav";
import CounselListRecommItem from "../../components/counsel/CounselListRecommList";
import CounselorRecommList from "../../components/counsel/CounselorRecommList";
import { Navigate, useNavigate } from "react-router-dom";

const DUMMY_RESERVE = [
  {
    id: "r1",
    counselId: "1",
    memberNickname: "주희",
    reservationDate: "22/10/01",
    reservationTime: "18:00",
    subject: "Depressed",
    counselorName: "조성규",
  },
  {
    id: "r2",
    counselId: "2",
    memberNickname: "주희",
    reservationDate: "22/10/03",
    reservationTime: "11:00",
    subject: "Depressed",
    counselorName: "이주희",
  },
  {
    id: "r3",
    counselId: "3",
    memberNickname: "주희",
    reservationDate: "22/10/05",
    reservationTime: "11:00",
    subject: "Depressed",
    counselorName: "김호진",
  },
];

const DUMMY_COUNSELOR = [
  {
    counselorId: "1",
    name: "이주희",
    subject: "우울",
    average: 3.5,
  },
  {
    counselorId: "2",
    name: "김호진",
    subject: "가족",
    average: 3.5,
  },
  {
    counselorId: "3",
    name: "김성규",
    subject: "학교",
    average: 3.5,
  },
];

function MainPage() {
  const navigate = useNavigate();
  const [counselors, setCounselors] = useState(DUMMY_COUNSELOR);
  axios.get("https://j7b204.p.ssafy.io/api/missions/").then((res) => {
    localStorage.setItem("missionList", JSON.stringify(res.data.data));
  });
  let token = localStorage.getItem("token");
  return (
    <div>
      <NavBar />
      <div className={styles.emotion_div}>
        <h6 className={styles.emotion_div_title}>지금 상태가 어떤가요?</h6>
        <p className={styles.emotion_div_text}>
          지금 상태에 맞춰 추천해드릴게요!
        </p>
      </div>
      <div className={styles.music_recommend}>
        <div>{<PersonalRecommend />}</div>
      </div>
      <div className={styles.counseling}>
        <button className={styles.counseling_btn}>
          <h6 className={styles.counseling_title}>심리 상담 </h6>
        </button>
        <p className={styles.emotion_div_text}>
          메타버스에서 편안히 상담받아요
        </p>
        <div className={styles.counseling_choice}>
          <button className={styles.counseling_choice_btn1}>
            <p className={styles.counseling_btn_title}>1:1 상담</p>
          </button>
          <button className={styles.counseling_choice_btn2}>
            <p className={styles.counseling_btn_title}>단체 상담</p>
          </button>
        </div>
        <button className={styles.test_btn}>
          <div className={styles.test_btn_logo}></div>
          심리 검사 하러 가기
        </button>
      </div>
      <CounselorRecommList counselors={counselors} />
      <Nav></Nav>
    </div>
  );
}

export default MainPage;
