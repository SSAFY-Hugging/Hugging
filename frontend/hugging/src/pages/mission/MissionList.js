import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginCounselor } from "../../store";
import NavBar from "../../components/ui/NavBar";
import Nav from "../../components/ui/Nav";
import { get } from "react-scroll/modules/mixins/scroller";
import styles from "./MissionList.module.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setAutoFreeze } from "immer";

const ToggleBtn = styled.button`
  width: 50px;
  height: 25px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "grey" : "#c58bf2")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  margin-right: 5px;
`;
const Circle = styled.div`
  background-color: white;
  width: 15px;
  height: 15px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    `
      transform: translate(25px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

function MissionList() {
  useEffect(() => {}, []);
  axios.get("https://j7b204.p.ssafy.io/api/missions/").then((res) => {
    localStorage.setItem("missionList", JSON.stringify(res.data.data));
  });
  const navigate = useNavigate();
  let missionList = localStorage.getItem("missionList");
  missionList = JSON.parse(missionList);
  const [toggle, setToggle] = useState([false, false, false, false, false]);
  let userprofile = localStorage.getItem("userprofile");
  userprofile = JSON.parse(userprofile);
  let memberId = userprofile.id;

  const clickedToggle = (i) => {
    if (toggle[i] === false) {
      axios
        .post("https://j7b204.p.ssafy.io/api/missions/", {
          memberId,
          missionId: missionList[i].id,
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      const params = { missionId: missionList[i].id };
      axios
        .delete("https://j7b204.p.ssafy.io/api/missions/" + memberId, {
          params,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };
  return (
    <div>
      <NavBar></NavBar>
      <Nav></Nav>
      <div className={styles.margin_div}>
        {missionList.map(function (a, i) {
          return (
            <div className={styles.mission_div}>
              <span className={styles.mission_title}>
                {missionList[i].name}
              </span>
              {}
              <ToggleBtn
                onClick={() => {
                  console.log(toggle);
                  let to = [...toggle];
                  to[i] = !to[i];
                  setToggle(to);
                  clickedToggle(i);
                }}
                toggle={toggle[i]}
              >
                <Circle toggle={toggle[i]} />
              </ToggleBtn>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MissionList;
