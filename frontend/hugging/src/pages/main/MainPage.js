import React from "react";
import { useState, useEffect, useCallback } from "react";
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
import CounselListRecommList from "../../components/counsel/CounselListRecommList";
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
import classes from "../../components/counsel/CounselListRecommList.module.css";

function MainPage() {
  const [nickName, setNickName] = useState("비회원");
  const [counselors, setCounselors] = useState();

  // 나의 추천 상담사 가져옴
  const fetchRecommCounselorHandler = useCallback(async () => {
    console.log("fetchfetchRecommCounselorHandlerHandler 실행됨");

    const loadedUserProfile = localStorage.getItem("userprofile");
    if (loadedUserProfile !== null) {
      const parsedUser = JSON.parse(loadedUserProfile);
      try {
        const response = await fetch(
          "https://j7b204.p.ssafy.io/recom/counselor/" + parsedUser.id
        ); // 프로미스 객체 반환
        if (!response.ok) {
          throw new Error("Something went wront!");
        }
        const data = await response.json(); // 프로미스 객체 반환
        console.log("추천 상담사 출력");
        console.log(data);
        setCounselors(data);
        // setReservation(data.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [setCounselors]);

  const getUserProfile = useCallback(() => {
    const loadedUserProfile = localStorage.getItem("userprofile");
    if (loadedUserProfile !== null) {
      const parsedUser = JSON.parse(loadedUserProfile);
      setNickName(parsedUser.nickname);
    }
  });

  useEffect(() => {
    getUserProfile();
    fetchRecommCounselorHandler();
  }, [getUserProfile, fetchRecommCounselorHandler]);

  function startMetaverse() {
    let url =
      "http://j7b204.p.ssafy.io/unity/index.html?from=Community&nickName=" +
      nickName;
    window.open(url);
  }
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
  const emotion = [
    "행복함",
    "편안함",
    "설렘",
    "슬픔",
    "우울함",
    "상실감",
    "지루함",
    "짜증남",
    "분노",
    "무기력",
    "외로움",
    "불편함",
  ];
  const emotion_en = [
    "Happy",
    "Comfort",
    "Flutter",
    "Sadness",
    "Melancholy",
    "Loss",
    "Boredom",
    "Annoyed",
    "Anger",
    "Lethargy",
    "Loneliness",
    "Discomfort",
  ];
  const navigate = useNavigate();
  let userprofile = localStorage.getItem("userprofile");
  userprofile = JSON.parse(userprofile);
  let memberId = userprofile.id;
  sessionStorage.setItem(
    "missioncomplete",
    JSON.stringify([false, false, false, false, false])
  );

  axios.get("https://j7b204.p.ssafy.io/api/missions/").then((res) => {
    localStorage.setItem("missionList", JSON.stringify(res.data.data));
  });
  axios
    .get("https://j7b204.p.ssafy.io/api/missions/" + memberId)
    .then((res) => {
      localStorage.setItem("mymission", JSON.stringify(res.data.data));
    });
  let token = localStorage.getItem("token");
  return (
    <div className={styles.div}>
      <NavBar />
      <div className={styles.emotion_div}>
        <h6 className={styles.emotion_div_title}>지금 상태가 어떤가요?</h6>
        <p className={styles.emotion_div_text}>
          지금 상태에 맞춰 추천해드릴게요!
        </p>
        <div className={styles.emotion_box}>
          {emotionArr.map(function (a, i) {
            return (
              <button
                onClick={() => {
                  console.log(emotion[i]);
                  axios
                    .get(
                      "https://j7b204.p.ssafy.io/recom/music/mental/" +
                        emotion_en[i]
                    )
                    .then((res) => {
                      console.log(res);
                    });
                }}
              >
                <img
                  src={emotionArr[i]}
                  width="40px"
                  height="40px"
                  className={styles.emotion}
                />
                <p className={styles.emotion_title}>{emotion[i]}</p>
              </button>
            );
          })}
        </div>
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
          <div className={styles.counsel_btn}>
            <button
              className={styles.counseling_choice_btn1}
              onClick={() => {
                navigate("/counselreserve");
              }}
            >
              <img
                src={require("../../img/one.png")}
                width="160px"
                height="100px"
                className={styles.counsel_img}
              />
            </button>
            <p className={styles.counsel_txt}>1:1 상담</p>
          </div>
          <div className={styles.counsel_btn}>
            <button
              className={styles.counseling_choice_btn2}
              onClick={startMetaverse}
            >
              <img
                src={require("../../img/group.png")}
                width="160px"
                height="100px"
                className={styles.btn_img}
              />
            </button>
            <p className={styles.counsel_txt}>단체 상담</p>
          </div>
        </div>
      </div>
      <div className={styles.counselor}></div>
      <CounselListRecommList recommCounselors={counselors} />
      <Nav></Nav>
    </div>
  );
}

export default MainPage;
