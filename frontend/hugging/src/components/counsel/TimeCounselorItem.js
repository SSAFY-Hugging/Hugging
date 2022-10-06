import classes from "./TimeCounselorItem.module.css";
import { Link } from "react-router-dom";

const TimeCounselorItem = (props) => {
  // 영어 주제 -> 한글 주제로 변경
  let value = "우울";
  if (props.subject === "Depressed") value = "우울";
  if (props.subject === "Insomnia") value = "불면";
  if (props.subject === "Family") value = "가족";
  if (props.subject === "School") value = "학교";
  if (props.subject === "Company") value = "직장/진로";
  if (props.subject === "Relationship") value = "대인관계";
  if (props.subject === "Love") value = "연애/결혼";
  if (props.subject === "SelfUnderstanding") value = "자기이해";

  const starRendering = () => {
    const result = [];
    if (props.average === null || props.average === 0) {
      for (let i = 0; i < 5; i++) {
        result.push(
          <img
            key={i}
            src="../emptyStar.png"
            alt="emptyStar"
            className={classes.starImg}
          ></img>
        );
      }
    } else {
      for (let i = 0; i < Math.floor(props.average); i++) {
        result.push(
          <img
            key={i}
            src="../Star.png"
            alt="star"
            className={classes.starImg}
          ></img>
        );
      }
      for (let i = 0; i < 5 - Math.floor(props.average); i++) {
        result.push(
          <img
            key={i + 5}
            src="../emptyStar.png"
            alt="emptyStar"
            className={classes.starImg}
          ></img>
        );
      }
    }
    return result;
  };

  return (
    <Link
      to={`/counselprofile/${props.id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className={classes.back}>
        {!props.profileImage && (
          <img
            src="./sampleCounselor1.png"
            alt="counselor"
            className={classes.titleImage}
          ></img>
        )}
        {props.profileImage && (
          <img
            src={props.profileImage}
            alt="counselor"
            className={classes.titleImage}
          ></img>
        )}
        <div className={classes.name}>{props.name} 상담사</div>
        <div>
          <span className={classes.field}># {value}</span>
        </div>
        <div className={classes.score}>
          {starRendering()}
          {props.average !== null && (
            <span className={classes.number}>
              ({Math.floor(props.average)})
            </span>
          )}
          {props.average === null && (
            <span className={classes.number}>(0)</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default TimeCounselorItem;
