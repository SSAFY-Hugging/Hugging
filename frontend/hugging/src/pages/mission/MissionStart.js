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

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              width="30px"
              height="30px"
              color="#C87CF6"
              className={styles.bell}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
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
