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
        {props.counselors.length != 0 && (
          <div className={classes.counselor}>
            {props.counselors.map((counselor) => (
              <CounselorRecommItem
                key={counselor.counselorId}
                counselorId={counselor.counselorId}
                name={counselor.name}
                subject={counselor.subject}
                average={counselor.average}
              ></CounselorRecommItem>
            ))}
          </div>
        )}
        {props.counselors.length == 0 && <div> 상담사가 없습니다. </div>}
      </div>
    </Fragment>
  );
};

export default CounselRecommList;
