import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginCounselor } from "../../store";
import NavBar from "../../components/ui/NavBar";
import PersonalRecommend from "../../components/media/PersonalRecommend";
import styles from "./MainPage.module.css";
import Nav from "../../components/ui/Nav";

function MainPage() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.emotion_div}>
        <h6 className={styles.emotion_div_title}>지금 상태가 어떤가요?</h6>
        <p className={styles.emotion_div_text}>
          지금 상태에 맞춰 추천해드릴게요!
        </p>
      </div>
      <div className={styles.music_recommend}>
        <div>
          <PersonalRecommend />
        </div>
      </div>
      <div className={styles.counseling}>
        <button className={styles.counseling_btn}>
          <h6 className={styles.counseling_title}>심리 상담 </h6>{" "}
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
      <Nav></Nav>
    </div>
  );
}
export default MainPage;
