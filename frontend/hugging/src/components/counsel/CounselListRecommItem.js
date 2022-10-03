import { Fragment } from "react";
import classes from "./CounselListRecommItem.module.css";

const CounselListRecommItem = (props) => {
  return (
    <div className={classes.back}>
      <img
        src="./sampleCounselorCircle.png"
        alt="counselor"
        className={classes.titleImage}
      ></img>
      <div className={classes.name}>{props.name} 상담사</div>
      <div className={classes.field}>#{props.field}</div>
      <div className={classes.score}>
        <img src="./Star.png" alt="star" className={classes.starImage}></img>
        <img src="./Star.png" alt="star" className={classes.starImage}></img>
        <img src="./Star.png" alt="star" className={classes.starImage}></img>
        <img src="./Star.png" alt="star" className={classes.starImage}></img>
        <img src="./Star.png" alt="star" className={classes.starImage}></img>
        <span className={classes.number}>({props.score})</span>
      </div>
    </div>
  );
};

export default CounselListRecommItem;
