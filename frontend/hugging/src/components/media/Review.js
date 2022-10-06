import React from "react";
import styles from "./Review.module.css";

import Score from "./Score";
function Review(props) {
  return (
    <div className={styles.container}>
      <Score musicid={props.musicid} />
    </div>
  );
}
export default Review;
