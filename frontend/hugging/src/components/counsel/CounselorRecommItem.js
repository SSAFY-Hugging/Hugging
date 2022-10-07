import classes from "./CounselorRecommItem.module.css";
import Card from "../ui/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CounselorRecommItem = (props) => {
  // const subjectKor = useSelector((state) => state.counsel.subjectKor);
  console.log("이미지 불러오기");
  console.log(props.img);

  let value = "우울";
  if (props.subject === "Depressed") value = "우울";
  if (props.subject === "Insomnia") value = "불면";
  if (props.subject === "Family") value = "가족";
  if (props.subject === "School") value = "학교";
  if (props.subject === "Company") value = "직장/진로";
  if (props.subject === "Relationship") value = "대인관계";
  if (props.subject === "Love") value = "연애/결혼";
  if (props.subject === "SelfUnderstanding") value = "자기이해";

  return (
    <Card>
      <Link
        to={`/counselprofile/${props.counselorId}`}
        style={{ textDecoration: "none" }}
      >
        {/* <img
          src="./sampleCounselor1.png"
          alt="counselor"
          className={classes.titleImage}
        ></img> */}
        <img
          src={props.profileImage}
          alt="coun"
          className={classes.titleImage}
        ></img>
        <div className={classes.name}>{props.name} 상담사</div>
        <div className={classes.detail}>
          {/* {subjectKor && <span className={classes.field}>#{subjectKor}</span>}
          {!subjectKor && (
            <span className={classes.field}>#{props.subject}</span>
          )} */}
          <span className={classes.field}>#{value}</span>
          <img src="./Star.png" alt="star" className={classes.starImage}></img>
          <span className={classes.score}>({props.average})</span>
        </div>
      </Link>
    </Card>
  );
};

export default CounselorRecommItem;
