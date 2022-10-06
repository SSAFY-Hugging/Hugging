import classes from "./CounselSubjectListItem.module.css";
import { counselActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const CounselSubjectListItem = (props) => {
  console.log(props.imgNo);
  const dispatch = useDispatch();
  // 선택된 subject 정보
  const subjectKor = useSelector((state) => state.counsel.subjectKor);

  // 클릭되면 store 에 subject 저장하기, API 호출
  const subjectSelectHandler = () => {
    console.log("clicked!");
    dispatch(counselActions.setSubjectKor(props.title));

    // 우울, 불면, 가족, 학교, 직장/진로, 대인관계, 연애/결혼, 자기이해
    let value = "Depressed";
    if (props.title === "우울") value = "Depressed";
    if (props.title === "불면") value = "Insomnia";
    if (props.title === "가족") value = "Family";
    if (props.title === "학교") value = "School";
    if (props.title === "직장/진로") value = "Company";
    if (props.title === "대인관계") value = "Relationship";
    if (props.title === "연애/결혼") value = "Love";
    if (props.title === "자기이해") value = "SelfUnderstanding";

    dispatch(counselActions.selectSubject(value));
  };

  //  버튼의 제목이 counselor 랑 다르고 처음도 아니라면 회색 : 파란색

  return (
    <button
      className={classes.square}
      onClick={subjectSelectHandler}
      style={{
        background:
          props.title != subjectKor && subjectKor != undefined
            ? "hsl(0, 0%, 95%)"
            : "#e9eefe",
      }}
    >
      <img src={"./subject " + props.imgNo + ".png"}></img>
      <div className={classes.text}>{props.title}</div>
    </button>
  );
};

export default CounselSubjectListItem;
