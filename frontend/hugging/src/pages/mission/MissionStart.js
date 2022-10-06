import React from "react";
import { useTimer } from "use-timer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginCounselor } from "../../store";
import NavBar from "../../components/ui/NavBar";
import Nav from "../../components/ui/Nav";
import styles from "./MissionStart.module.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useCountdown } from "react-countdown-circle-timer";
import Timer from "../../components/mission/Timer";
function MissionList() {
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: false, duration: 60, colors: "#abc" });
  let missionList = localStorage.getItem("missionList");
  missionList = JSON.parse(missionList);
  let missionId = sessionStorage.getItem("missionid");
  missionId = Number(missionId);
  let [Playing, setPlaying] = useState(false);
  let [btn, setBtn] = useState(false);
  let [mcompleted, setMcompleted] = useState(false);
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };
  return (
    <div>
      <NavBar />
      <div className={styles.margin_div}>
        <div className={styles.mission_div}>
          <div>
            <h6 className={styles.mission_text}>
              {missionList[missionId - 1].name}
            </h6>
            <span className={styles.minutes}>1 minuetes</span>
          </div>
        </div>
        <div className={styles.timer_div}>
          <Timer btn={btn} missionId={missionId} />
        </div>
        <Nav></Nav>
      </div>
    </div>
  );
}
export default MissionList;
