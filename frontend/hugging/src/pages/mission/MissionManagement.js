import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginCounselor } from "../../store";
import NavBar from "../../components/ui/NavBar";
import Nav from "../../components/ui/Nav";
import { useNavigate } from "react-router-dom";
import styles from "./MissionManagement.module.css";
function MissionManagement() {
  const navigate = useNavigate();
  let missionList = localStorage.getItem("missionList");
  missionList = JSON.parse(missionList);

  return (
    <div>
      <Nav></Nav>
      <NavBar></NavBar>
      <div className={styles.margin_div}>
        <h6>TODAY MISSION</h6>
        {missionList.map(function (a, i) {
          return (
            <div className={styles.mission_div}>
              <span className={styles.mission_title}>
                {missionList[i].name}
              </span>
              <button
                className={styles.start_btn}
                onClick={() => {
                  navigate("/missionstart");
                }}
              >
                <p className={styles.start_btn_text}>go</p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MissionManagement;
