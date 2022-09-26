import "./RegisterProfile.module.css";
import axios from "axios";
import styles from "./RegisterProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { changeUser } from "../../store";
import promiseMiddleware from "redux-promise";
import { API_HOST_URL } from "../../config";

function RegisterProfile() {
  const navigate = useNavigate();
  let user = useSelector((state) => {
    return state.user;
  });

  let dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const selectList = ["MALE", "FEMALE"];
  const [gender, setGender] = useState("");

  const handleSelect = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let body = {
      nickname,
      age,
      gender,
    };

    dispatch(changeUser(body)).then((res) => {
      if (res.payload.status === 200) {
        axios
          .post(API_HOST_URL + "members/join", user)
          .then((res) => {
            console.log(res);
            console.log(user);
          })
          .catch((res) => {
            console.log(user);
            console.log("error");
          });
      }
    });
  };

  return (
    <>
      <div className={styles.category_title}>
        <h2 className={styles.hug}>Hug</h2>
        <h2>ging</h2>
      </div>
      <div className={styles.order2}></div>
      <p className={styles.profile_title}>프로필 이미지</p>
      <div className={styles.profile_circle}>
        <button className={styles.profile_edit}>
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
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.nickname}
          type="text"
          placeholder="닉네임"
          onChange={handleNickname}
        />
        <div id={styles.gender_age}>
          <input
            type="number"
            min={10}
            max={100}
            placeholder="나이"
            onChange={handleAge}
          />
          <select onChange={handleSelect} value={gender}>
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
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
          <button
            type="submit"
            className={styles.next}
            // onClick={()=> {
            // axios.post('https://j7b204.p.ssafy.io/api/members/join', user)
            // .then((res)=>{
            //     console.log(res)
            //     console.log(user)

            // }).catch((res)=>{
            //     console.log(user)
            //     console.log('error')}) }}
          >
            가입 완료
          </button>
        </div>
      </form>
    </>
  );
}

export default RegisterProfile;
