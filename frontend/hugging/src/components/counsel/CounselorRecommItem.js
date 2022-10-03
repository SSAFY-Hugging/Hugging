import classes from "./CounselorRecommItem.module.css";
import Card from "../ui/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CounselorRecommItem = (props) => {
  const subjectKor = useSelector((state) => state.counsel.subjectKor);

  return (
    <Card>
      <Link
        to={`/counselprofile/${props.counselorId}`}
        style={{ textDecoration: "none" }}
      >
        <img
          src="./sampleCounselor1.png"
          alt="counselor"
          className={classes.titleImage}
        ></img>
        <div className={classes.name}>{props.name} 상담사</div>
        <div className={classes.detail}>
          {subjectKor && <span className={classes.field}>#{subjectKor}</span>}
          {!subjectKor && (
            <span className={classes.field}>#{props.subject}</span>
          )}
          <img src="./Star.png" alt="star" className={classes.starImage}></img>
          <span className={classes.score}>({props.average})</span>
        </div>
      </Link>
    </Card>
  );
};

export default CounselorRecommItem;
