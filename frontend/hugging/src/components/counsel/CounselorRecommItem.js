import classes from "./CounselorRecommItem.module.css";
import Card from "../ui/Card";
import { Link } from "react-router-dom";

const CounselorRecommItem = (props) => {
  return (
    <Card>
      <Link
        to={`/counselprofile/${props.id}`}
        style={{ textDecoration: "none" }}
      >
        <img
          src="./sampleCounselor1.png"
          alt="counselor"
          className={classes.titleImage}
        ></img>
        <div className={classes.name}>{props.name} 상담사</div>
        <div className={classes.detail}>
          <span className={classes.field}>#{props.field}</span>
          <img src="./Star.png" alt="star" className={classes.starImage}></img>
          <span className={classes.score}>({props.score})</span>
        </div>
      </Link>
    </Card>
  );
};

export default CounselorRecommItem;
