import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Timer.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMission } from "../../store";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

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
  let userprofile = localStorage.getItem("userprofile");
  userprofile = JSON.parse(userprofile);
  let memberId = userprofile.id;
  let missionList = localStorage.getItem("missionList");
  missionList = JSON.parse(missionList);
  let missioncomplete = sessionStorage.getItem("missioncomplete");
  missioncomplete = JSON.parse(missioncomplete);
  let [btn, setBtn] = useState(false);
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
  console.log(props.missionId);
  return (
    <div className="timer_div">
      <div>
        <CountdownCircleTimer
          {...timerProps}
          colors="#C87CF6"
          duration={minuteSeconds}
          // initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => (
            (missioncomplete[props.missionId] = true),
            sessionStorage.setItem(
              "missioncomplete",
              JSON.stringify(missioncomplete)
            ),
            // missioncomplete.push(props.missionId),
            // sessionStorage.setItem(
            //   "missioncomplete",
            //   JSON.stringify(missioncomplete)
            // ),
            // sessionStorage.setItem("completeid", props.missionId),
            navigate("/mission/management"),
            axios
              .put("https://j7b204.p.ssafy.io/api/missions/", {
                memberId,
                missionId: props.missionId,
              })
              .then((res) => {
                console.log(res);
              })
              .catch((res) => {
                console.log(res);
              }),
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
      <div></div>
    </div>
  );
}

Timer.propTypes = {
  memberId: propTypes.number,
};
