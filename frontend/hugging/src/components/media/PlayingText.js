import React from "react";
import styles from "./PlayingText.module.css";

function PlayingText() {
  const texts = [
    "삶이라는 여행에서 겪게 되는 힘든 사건은 나를 한번 크게 되돌아보게 하고 비슷한 어려움을 겪고 있는 사람들의 아픔도 생각하게 하면서 자비심을 일으키게 하는 밑거름이 됩니다.힘든 일을 겪고 계신 분들, 그 일로 인해 지혜와 자비가 발현되시길..",
    "남들보다 더 잘하려고 고민하지 마세요. '지금의 나'보다 잘하려 애쓰는 게 중요해요",
    "용기를 내어 그대가 생각하는 대로 살지않으면 머지않아 그대는, 사는대로 생각하게 된다.",
    "긍정적으로 생각하라. 원하는 것을 마음 속 깊이 생각하고 또 생각하면 그 바람은 어김없이 현실로 나타난다. 원치 않는 걸 떠올리지 말고 갖고 싶은 것, 하고 싶은 것을 생각하라.",
    " 할 수 있다고 믿는 사람은 그렇게 되고, 할 수 없다고 믿는 사람 역시 그렇게 된다.",
    "수요일 점심시간을 좋아했다. 특별식으로 나오는 급식을 맛있게 먹고 나면 여유를 부릴 수 있는 점심시간 또한 길고 평온하게 느껴졌기 때문이다.교실로 돌아와 잠시 눈을 감는다. 청량한 매미 소리, 솔솔 불어오는 바람결. 아, 이것이 행복이었구나.",
  ];
  const getRandomIndex = function(length) {
    return parseInt(Math.random() * length)
  }
  return (
    <>
      <div className={styles.Text}>

      <p>{texts[getRandomIndex(texts.length)]}</p>
      </div>
    </>
  );
}

export default PlayingText;
