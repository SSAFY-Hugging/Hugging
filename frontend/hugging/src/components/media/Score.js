import React, { useState } from "react";
import { ImStarFull } from "react-icons/im";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import styles from "./Score.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Score(props) {
  const navigate = useNavigate();
  const member = JSON.parse(localStorage.getItem("userProfile"));
  const member_id = member.id;
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const array = [0, 1, 2, 3, 4];
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  {
    array.map((el) => (
      <ImStarFull
        key={el}
        onClick={() => handleStarClick(el)}
        className={clicked[el] && "black"}
        size="20"
      />
    ));
  }

  const score = clicked.filter(Boolean).length;
  const memberId = member_id;
  const musicId = props.musicid;
  const addscore = () => {
    axios({
      method: "POST",
      url: "https://j7b204.p.ssafy.io/api/musics/review",
      headers: { "Content-Type": "application/json" },
      data: {
        memberId: memberId,
        musicId: musicId,
        score: score,
      },
    }).then((res) => console.log(res));
  };

  return (
    <div className={styles.Box}>
      <p className={styles.text}>별점 등록</p>
      <Stars>
        {array.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="50"
              onClick={() => handleStarClick(el)}
              className={clicked[el] && "yellowStar"}
            />
          );
        })}
      </Stars>
      <div className={styles.select}>
        <button className={styles.scorebutton} onClick={addscore}>
          평가하기
        </button>
        <button
          className={styles.exit}
          onClick={() => navigate("/recommend_media")}
        >
          나가기
        </button>
      </div>
    </div>
  );
}
export default Score;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;
  justify-content: space-around;
  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
