import classes from "./CounselSubjectListItem.module.css";
import { counselActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const CounselSubjectListItem = (props) => {
  const dispatch = useDispatch();
  // 선택된 subject 정보
  const counselor = useSelector((state) => state.counsel.subject);

  // 클릭되면 store 에 subject 저장하기, API 호출
  const subjectSelectHandler = () => {
    console.log(props.title);
    console.log("clicked!!");
    dispatch(counselActions.selectSubject(props.title));
  };

  return (
    <button
      className={classes.square}
      onClick={subjectSelectHandler}
      style={{
        background:
          props.title != counselor && counselor != undefined
            ? "hsl(0, 0%, 95%)"
            : "#e9eefe",
      }}
    >
      <div className={classes.text}>{props.title}</div>
    </button>
  );
};

export default CounselSubjectListItem;
