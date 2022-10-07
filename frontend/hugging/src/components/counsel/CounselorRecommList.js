import classes from "./CounselorRecommList.module.css";
import { Fragment } from "react";
import CounselorRecommItem from "./CounselorRecommItem";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
const CounselRecommList = (props) => {
  return (
    <div className={classes.back}>
      <div>
        <span className={classes.title}>추천 상담사</span>
        <Link
          to="/counselorlist"
          state={props.counselors}
          className={classes.more}
          style={{
            textDecoration: "none",
            color: "black",
            marginLeft: "170px",
            fontSize: "13px",
          }}
        >
          더보기
          <span style={{ justifyContent: "center", alignItems: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
              width="15px"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </Link>
      </div>
      <div className={classes.cards}>
        {props.counselors && (
          <div className={classes.counselor}>
            {props.counselors.map((counselor) => (
              <CounselorRecommItem
                key={counselor.id}
                profileImage={counselor.profileImage}
                counselorId={counselor.id}
                name={counselor.name}
                subject={counselor.subject}
                average={counselor.average}
              ></CounselorRecommItem>
            ))}
          </div>
        )}
        {!props.counselors && (
          <Card className={classes.noCounselor}>상담사가 없습니다.</Card>
        )}
      </div>
    </div>
  );
};

export default CounselRecommList;
