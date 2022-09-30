import { Fragment } from "react";
import classes from "./CounselDetail.module.css";

const CounselDetail = (props) => {
  console.log(props.profile);
  const inputCareer = props.profile.career;
  const careers = inputCareer.split(",");
  //   console.log(inputCareer);
  //   console.log(careers);

  return (
    <Fragment>
      <div className={classes.profile}>
        <div>
          <img src="../sampleCounselorCircle.png" alt="counselorProfile"></img>
        </div>
        <div>
          <div>
            <span className={classes.name}>{props.profile.name} 상담사</span>
            <img src="../genderM.png" alt="gender"></img>
          </div>
          <div>
            <span className={classes.blue}>가능시간</span>
            <span>{props.profile.availableTime}</span>
          </div>
          <div>
            <span className={classes.blue}>자격증</span>
            <span>{props.profile.certificate}</span>
          </div>
          <div>
            <span className={classes.blue}>전문분야</span>
            <span>{props.profile.subject}</span>
          </div>
          <div>
            <img src="../Star.png" alt="star"></img>
            <img src="../Star.png" alt="star"></img>
            <img src="../Star.png" alt="star"></img>
            <img src="../Star.png" alt="star"></img>
            <img src="../Star.png" alt="star"></img>
            <span>({props.profile.score})</span>
          </div>
        </div>
      </div>
      <div>
        <div className={classes.title}>주요 자격 및 경력</div>
        <ul>
          {careers.map((career, index) => (
            <li key={index}>{career}</li>
          ))}
        </ul>
        <div className={classes.title}>상담사 이야기</div>
        <div className={classes.explanation}>{props.profile.explanation}</div>
      </div>
    </Fragment>
  );
};

export default CounselDetail;
