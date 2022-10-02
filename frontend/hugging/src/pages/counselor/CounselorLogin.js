import styles from "./CounselorLogin.module.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginCounselor } from "../../store";
import jwt_decode from "jwt-decode";

function CounselorLogin() {
  let dispatch = useDispatch();
  const [email, setInputEmail] = useState("");
  const [password, setInputPassword] = useState("");

  const handleInputId = (e) => {
    setInputEmail(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPassword(e.target.value);
  };

  let LoginFunc = (e) => {
    e.preventDefault();
    if (!email) {
      return alert("ID를 입력하세요.");
    } else if (!password) {
      return alert("Password를 입력하세요.");
    } else {
      let body = {
        email,
        password,
      };
      axios
        .post("https://j7b204.p.ssafy.io/api/counselors/login", body)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.data);
          console.log(res.data.data);
          let counselorId = jwt_decode(res.data.data);

          axios({
            url:
              "https://j7b204.p.ssafy.io/api/counselors/login/" +
              counselorId.sub,
            method: "GET",
          })
            .then((res) => {
              console.log("성공");
              console.log(res.data);
              localStorage.setItem(
                "counselorprofile",
                JSON.stringify(res.data.data)
              );
            })
            .catch((err) => {
              console.log("실패");
              console.log(err);
            });
        });
    }
  };
  return (
    <div className={styles.counselor}>
      <div className={styles.counselor_title}>
        <h1 className={styles.header__title2}>Hug</h1>
        <h1 className={styles.header__title3}>ging</h1>
      </div>
      <p className={styles.counselor_text}>상담사 로그인</p>

      <form id={styles.login_form} onSubmit={LoginFunc}>
        <input type="text" placeholder="Email" onChange={handleInputId}></input>
        <input type="text" placeholder="Password" onChange={handleInputPw} />
        <p className={styles.forgot_text}>Forgot your password?</p>
        <button type="submit" className={styles.counselor_login_btn}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default CounselorLogin;
