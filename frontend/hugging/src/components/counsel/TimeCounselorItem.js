import classes from "./TimeCounselorItem.module.css";

const TimeCounselorItem = (props) => {
  console.log(props.img);
  console.log(props.name);
  console.log(props.field);
  console.log(props.score);

  return (
    <div className={classes.back}>
      <img
        src="./sampleCounselor1.png"
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

export default TimeCounselorItem;
