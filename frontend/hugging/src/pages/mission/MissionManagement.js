import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginCounselor } from "../../store";
import NavBar from "../../components/ui/NavBar";
import Nav from "../../components/ui/Nav";
import { useNavigate } from "react-router-dom";
import styles from "./MissionManagement.module.css";
import Stamp from "../../components/mission/Stamp";
function MissionManagement() {
  let userprofile = localStorage.getItem("userprofile");
  userprofile = JSON.parse(userprofile);
  let memberId = userprofile.id;

  const navigate = useNavigate();
  let missionList = localStorage.getItem("missionList");
  missionList = JSON.parse(missionList);
  let missioncomplete = sessionStorage.getItem("missioncomplete");
  missioncomplete = JSON.parse(missioncomplete);
  let missionid = sessionStorage.getItem("missionid");
  return (
    <div>
      <Nav></Nav>
      <NavBar></NavBar>
      <div className={styles.stamp}>
        <Stamp></Stamp>
      </div>
      <div className={styles.margin_div}>
        <h6>TODAY MISSION</h6>
        {missionList.map(function (a, i) {
          return (
            <div className={styles.mission_div}>
              <span className={styles.mission_title}>
                {missionList[i].name}
              </span>
              {missioncomplete[i] === true ? (
                <div className={styles.complete_div}>
                  <p className={styles.complete}>complete</p>
                </div>
              ) : (
                <button
                  className={styles.start_btn}
                  onClick={() => {
                    navigate("/missionstart");
                    sessionStorage.setItem("missionid", i + 1);
                  }}
                >
                  <p className={styles.start_btn_text}>go</p>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MissionManagement;
