import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import CounselListRecommList from "../../components/counsel/CounselListRecommList";
import CounselSubjectList from "../../components/counsel/CounselSubjectList";
import classes from "./ListCounselor.module.css";
import TimeCounselorItem from "../../components/counsel/TimeCounselorItem";

const DUMMY_COUNSELOR = [
  {
    id: "c1",
    img: "",
    name: "이주희",
    field: "번아웃",
    score: 3.5,
    availableTime: "평일",
  },
  {
    id: "c2",
    img: "",
    name: "김호진",
    field: "가족관계",
    score: 3.5,
    availableTime: "주말",
  },
  {
    id: "c3",
    img: "",
    name: "김성규",
    field: "불안",
    score: 3.5,
    availableTime: "주말",
  },
];

const weekdayCounselors = DUMMY_COUNSELOR.filter((counselor) => {
  return counselor.availableTime === "평일";
});
console.log("평일");
console.log(weekdayCounselors);

const weekendCounselors = DUMMY_COUNSELOR.filter((counselor) => {
  return counselor.availableTime === "주말";
});
console.log("주말");
console.log(weekendCounselors);

const ListCounselor = () => {
  const location = useLocation();
  const state = location.state;
  //   console.log(state);
  return (
    <Fragment>
      <CounselListRecommList recommCounselors={state} />
      <CounselSubjectList title="전문 분야별" />
      <div>
        <div className={classes.title}>평일</div>
        <div className={classes.back}>
          {weekdayCounselors &&
            weekdayCounselors.map((counselor) => (
              <TimeCounselorItem
                key={counselor.id}
                img={counselor.img}
                name={counselor.name}
                field={counselor.field}
                score={counselor.score}
              />
            ))}
          {!weekdayCounselors && <div>평일에 가능한 상담사가 없습니다. </div>}
        </div>
      </div>
      <div>
        <div className={classes.title}>주말</div>
        <div className={classes.back}>
          {weekendCounselors &&
            weekendCounselors.map((counselor) => (
              <TimeCounselorItem
                key={counselor.id}
                name={counselor.name}
                field={counselor.field}
                score={counselor.score}
              />
            ))}
          {!weekendCounselors && <div>주말에 가능한 상담사가 없습니다. </div>}
        </div>
      </div>
    </Fragment>
  );
};
export default ListCounselor;
//
