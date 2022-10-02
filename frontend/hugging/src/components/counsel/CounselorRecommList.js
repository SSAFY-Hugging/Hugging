import classes from "./CounselorRecommList.module.css";
import { Fragment } from "react";
import CounselorRecommItem from "./CounselorRecommItem";
import { Link } from "react-router-dom";

const CounselRecommList = (props) => {
  return (
    <Fragment>
      <div>
        <span className={classes.title}>추천 상담사</span>
        <Link
          to="/counselorlist"
          state={props.counselors}
          className={classes.more}
        >
          더보기
        </Link>
      </div>
      <div>
        <div className={classes.counselor}>
          {props.counselors.map((counselor) => (
            <CounselorRecommItem
              key={counselor.id}
              id={counselor.id}
              name={counselor.name}
              field={counselor.field}
              score={counselor.score}
            ></CounselorRecommItem>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CounselRecommList;
