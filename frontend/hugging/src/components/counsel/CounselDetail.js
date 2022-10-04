import { Fragment } from "react";
import classes from "./CounselDetail.module.css";

const CounselDetail = (props) => {
  console.log(props.profile);
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
        result.push(<img key={i} src="../emptyStar.png" alt="emptyStar"></img>);
      }
    } else {
      for (let i = 0; i < props.profile.average; i++) {
        result.push(<img key={i} src="../Star.png" alt="star"></img>);
      }
      for (let i = 5 - props.profile.average; i > 0; i--) {
        result.push(<img key={i} src="../emptyStar.png" alt="emptyStar"></img>);
      }
    }
    return result;
  };

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
            <div className={classes.blue}>자격증</div>
            <ul>
              {certificates.map((certificate, index) => (
                <li key={index}>{certificate}</li>
              ))}
            </ul>
            <span>{props.profile.certificate}</span>
          </div>
          <div>
            <span className={classes.blue}>전문분야</span>
            <span>{value}</span>
          </div>
          <div>
            {starRendering()}
            {props.profile.average != null && (
              <span>({props.profile.average})</span>
            )}
            {props.profile.average === null && <span>({0})</span>}
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
        <div className={classes.explanation}>
          {explains.map((explain, index) => (
            <div key={index}>{explain}</div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CounselDetail;
