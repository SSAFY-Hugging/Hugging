import { createBrowserHistory } from "@remix-run/router";
import { Fragment } from "react";
import classes from "./CounselDetail.module.css";

const CounselDetail = (props) => {
  console.log(props.profile);
  const reviewLength = props.profile.counselorReviewList.length;

  const inputCareer = props.profile.career;
  const inputExplanation = props.profile.explanation;
  const inputCertificate = props.profile.certificate;

  const careers = inputCareer.split("#");
  const explains = inputExplanation.split("\\n");
  const certificates = inputCertificate.split("#");

  //   console.log(inputCareer);
  //   console.log(careers);

  let value = "Depressed";
  if (props.profile.subject === "Depressed") value = "우울";
  if (props.profile.subject === "Insomnia") value = "불면";
  if (props.profile.subject === "Family") value = "가족";
  if (props.profile.subject === "School") value = "학교";
  if (props.profile.subject === "Company") value = "직장/진로";
  if (props.profile.subject === "Relationship") value = "대인관계";
  if (props.profile.subject === "Love") value = "연애/결혼";
  if (props.profile.subject === "SelfUnderstanding") value = "자기이해";

  const starRendering = () => {
    const result = [];
    if (props.profile.average === null) {
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
      for (let i = 0; i < Math.floor(props.profile.average); i++) {
        result.push(
          <img
            key={i}
            src="../Star.png"
            alt="star"
            className={classes.starImg}
          ></img>
        );
      }
      for (let i = 0; i < 5 - Math.floor(props.profile.average); i++) {
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
    <Fragment>
      <div className={classes.profile}>
        <div>
          {/* <img
            className={classes.profileImg}
            src="../sampleCounselorCircle.png"
            alt="counselorProfile"
          ></img> */}
          <img
            className={classes.profileImg}
            src={props.profile.profileImage}
            alt="counselorProfile"
          ></img>
        </div>
        <div className={classes.detailBox}>
          <div>
            <span className={classes.name}>{props.profile.name} 상담사</span>
            {props.profile.gender === "MALE" && (
              <img
                src="../genderM.png"
                alt="male"
                className={classes.genderImg}
              ></img>
            )}
            {props.profile.gender === "FEMALE" && (
              <img
                src="../female.png"
                alt="female"
                className={classes.genderImg}
              ></img>
            )}
          </div>
          <div>
            <span className={classes.blue}>가능시간</span>
            <span className={classes.context}>
              {props.profile.availableTime}
            </span>
          </div>
          <div>
            <div className={classes.blue}>자격증</div>
            <ul>
              {certificates.map((certificate, index) => (
                <li key={index} className={classes.context}>
                  {certificate}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className={classes.blue}>전문분야</span>
            <span className={classes.context}>{value}</span>
          </div>
          <div>
            {starRendering()}
            <span className={classes.scoreOuter}>
              {props.profile.average != null && (
                <span className={classes.score}>({props.profile.average})</span>
              )}
              {props.profile.average === null && (
                <span className={classes.score}>({0})</span>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className={classes.detailBox}>
        <div className={classes.title}>주요 자격 및 경력</div>
        <ul>
          {careers.map((career, index) => (
            <li key={index} className={classes.context}>
              {career}
            </li>
          ))}
        </ul>
        <div className={classes.title}>상담사 이야기</div>
        <div className={classes.context}>
          {explains.map((explain, index) => (
            <div key={index}>{explain}</div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CounselDetail;
