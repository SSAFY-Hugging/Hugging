import React from "react";
import styles from "./PlayingText.module.css";

function PlayingText() {
  return (
    <>
      <div className={styles.Text}>
        <p>점심시간, 햇살 드는 창가자리를 좋아했다.</p>
        <br></br>
        <p>출처 : 트로스트 | 그림 : 트로스트</p>
        <br></br>
        <p>
          수요일 점심시간을 좋아했다. 특별식으로 나오는 급식을 맛있게 먹고 나면
          여유를 부릴 수 있는 점심시간 또한 길고 평온하게 느껴졌기 때문이다.
          교실로 돌아와 잠시 눈을 감는다. 청량한 매미 소리, 솔솔 불어오는
          바람결. 아, 이것이 행복이었구나.
        </p>
      </div>
    </>
  );
}

export default PlayingText;
