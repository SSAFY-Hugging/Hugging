import "./RegisterProfile.module.css";
import axios from "axios";
import styles from "./RegisterProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { changeUser, loginUser, changeImg } from "../../store";
import promiseMiddleware from "redux-promise";
import { API_HOST_URL } from "../../config";
import jwt_decode from "jwt-decode";
import profileimg1 from "../../img/profileimg1.png";
import profileimg2 from "../../img/profileimg2.png";
import profileimg3 from "../../img/profileimg3.png";
import styled from "styled-components";

// const ProfileImg = styled.button`
//   background-image: url(${backgroundArr[(props) => props]});
//   margin: 0px;
//   width: 100vw;
//   height: 100vh;
//   background-size: cover;
//   background-repeat: no-repeat;
// `;

function RegisterProfile(props) {
  const backgroundArr = [profileimg1, profileimg2, profileimg3];
  const navigate = useNavigate();
  let user = useSelector((state) => {
    return state.user;
  });

  let dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  let [modal, setModal] = useState(false);
  let [profileimg, setProfileimg] = useState(0);
  const modalClose = () => {
    setModal(!modal);
  };
  const handleNickname = (e) => {
    setNickname(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const selectList = ["MALE", "FEMALE"];
  const [gender, setGender] = useState("MALE");

  const handleSelect = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    let emotion = sessionStorage.getItem("emotion");
    let body = {
      nickname,
      age,
      gender,
      emotion: JSON.parse(emotion),
      email,
      profileimg,
    };
    console.log(body);
    axios
      .post(API_HOST_URL + "members/join", body)
      .then((res) => {
        if (res.data.newMember) {
          sessionStorage.setItem("token", res.data);
          sessionStorage.setItem("isSocialLogin", true);
          let userId = jwt_decode(res.data);
          axios({
            url: "https://j7b204.p.ssafy.io/api/members/" + userId.sub,
            method: "GET",
          })
            .then((res) => {
              console.log("성공");
              console.log(res.data);
              localStorage.setItem("userprofile", JSON.stringify(res.data));
              sessionStorage.removeItem("emotion");
              navigate("/main");
            })
            .catch((err) => {
              console.log("실패");
              console.log(err);
            });
        } else {
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.APP}>
      <div className={styles.category_title}>
        <h2 className={styles.hug}>Hug</h2>
        <h2>ging</h2>
      </div>
      <div className={styles.order2}></div>
      <p className={styles.profile_title}>프로필 이미지</p>
      <img
        src={backgroundArr[profileimg]}
        className={styles.profile_circ}
      ></img>
      <button
        className={styles.profile_edit}
        onClick={() => {
          setModal(!modal);
        }}
      >
        <svg
          color="white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          width="30"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      {/* <div className={styles.profile_circle}> */}

      {/* </div> */}
      <form onSubmit={handleSubmit}>
        <div className={styles.nickname_icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            width="20px"
            height="20px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>

        <input
          className={styles.nickname}
          type="text"
          placeholder="닉네임"
          onChange={handleNickname}
        />
        <div id={styles.gender_age}>
          <div className={styles.age_icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              width="20px"
              height="20px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </div>

          <input
            type="number"
            min={10}
            max={100}
            placeholder="나이"
            onChange={handleAge}
          />
          <select
            className={styles.select}
            onChange={handleSelect}
            value={gender}
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              className={styles.gender_icon}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        <div className={styles.order_btn}>
          <button
            type="button"
            className={styles.previous}
            onClick={() => {
              navigate("/category");
            }}
          >
            이전
          </button>
          <button type="submit" className={styles.next}>
            가입 완료
          </button>
        </div>
      </form>
      <div className={styles.team}>
        <p className={styles.info2}>TEAM B204 | Hugging</p>
        <p className={styles.info3}>
          Copyright © 2022 Hugging All Rights Reserved.
        </p>
      </div>
      {modal === true ? (
        <div className={styles.App}>
          <div className={styles.modal_back}>
            <div className={styles.modal}>
              <div className={styles.modal_bar}></div>
              <button
                className={styles.modal_select}
                onClick={() => {
                  setProfileimg(0);
                }}
              ></button>
              <button
                className={styles.modal_select2}
                onClick={() => {
                  setProfileimg(1);
                }}
              ></button>
              <button
                className={styles.modal_select3}
                onClick={() => {
                  setProfileimg(2);
                }}
              ></button>
            </div>
            <button className={styles.select_btn} onClick={modalClose}>
              확인
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Modal(props) {
  let dispatch = useDispatch();
  let user = useSelector((state) => {
    return state.user;
  });

  return (
    <div className={styles.App}>
      <div className={styles.modal_back}>
        <div className={styles.modal}>
          <div className={styles.modal_bar}></div>
          <button
            className={styles.modal_select}
            onClick={() => {
              dispatch(changeImg(1));
              console.log(user.profileImage);
            }}
          ></button>
          <button
            className={styles.modal_select2}
            onClick={() => {
              dispatch(changeImg(2));
              console.log(user);
            }}
          ></button>
          <button
            className={styles.modal_select3}
            onClick={() => {
              dispatch(changeImg(3));
              console.log(user);
            }}
          ></button>
        </div>
        <button className={styles.select_btn} onClick={props.modalClose}>
          확인
        </button>
      </div>
    </div>
  );
}

export default RegisterProfile;
