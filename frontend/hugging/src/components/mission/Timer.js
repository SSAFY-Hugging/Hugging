import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Timer.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMission } from "../../store";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const minuteSeconds = 60;

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;

export default function Timer(props) {
  let navigate = useNavigate();
  const stratTime = Date.now() / 1000;
  const endTime = stratTime + 243248;
  const dispatch = useDispatch();
  const remainingTime = endTime - stratTime;
  //   let userprofile = localStorage.getItem("userprofile");
  //   userprofile = JSON.parse(userprofile);
  //   let userId = userprofile.id;
  //   console.log(userId);

  //   let token = sessionStorage.getItem("token");
  //   let userId = jwt_decode(token);
  //   console.log(userId);
  //   axios
  //     .get("https://j7b204.p.ssafy.io/api/members/" + userId.sub)
  //     .then((res) => {
  //       console.log(res);
  //     });
  let [btn, setBtn] = useState(false);
  let [mission, setMission] = useState([false, false, false, false, false]);
  let [Playing, setPlaying] = useState(false);
  //   let body = {
  //     memberId,
  //     missionId,
  //   };
  const timerProps = {
    isPlaying: btn,
    size: 200,
    strokeWidth: 15,
  };
  return (
    <div className="timer_div">
      {mission[0] === false ? (
        <div>
          <CountdownCircleTimer
            {...timerProps}
            colors="#C87CF6"
            duration={minuteSeconds}
            // initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={(totalElapsedTime) => (
              navigate("/missionlist"),
              sessionStorage.setItem("missioncomplete", true),
              setMission((mission[0] = true)),
              axios
                .put("https://j7b204.p.ssafy.io/api/missions/", {
                  memberId: 1,
                  missionId: 1,
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((res) => {
                  console.log(res);
                }),
              console.log(mission),
              {
                shouldRepeat: false,
              }
            )}
          >
            {({ elapsedTime, color }) => (
              <span style={{ color }}>
                {renderTime("seconds", getTimeSeconds(elapsedTime))}
              </span>
            )}
          </CountdownCircleTimer>
        </div>
      ) : null}
      {btn === false ? (
        <button
          className="start_btn"
          onClick={() => {
            setBtn(!btn);
            setPlaying(!Playing);
          }}
        >
          <span>시작</span>
        </button>
      ) : (
        <button
          className="end_btn"
          onClick={() => {
            setBtn(!btn);
          }}
        >
          <span>정지</span>
        </button>
      )}
    </div>
  );
}
