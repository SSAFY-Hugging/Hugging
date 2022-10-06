import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CounselListRecommList from "../../components/counsel/CounselListRecommList";
import CounselSubjectList from "../../components/counsel/CounselSubjectList";
import classes from "./ListCounselor.module.css";
import TimeCounselorItem from "../../components/counsel/TimeCounselorItem";
import { useSelector } from "react-redux";

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

// const weekdayCounselors = DUMMY_COUNSELOR.filter((counselor) => {
//   return counselor.availableTime === "평일";
// });
// console.log("평일");
// console.log(weekdayCounselors);

// const weekendCounselors = DUMMY_COUNSELOR.filter((counselor) => {
//   return counselor.availableTime === "주말";
// });
// console.log("주말");
// console.log(weekendCounselors);

const ListCounselor = () => {
  const location = useLocation();
  const state = location.state;
  //   console.log(state);

  const [weekdayCounselors, setWeekdayCounselors] = useState();
  const [weekendCounselors, setWeekendCounselors] = useState();

  const subject = useSelector((state) => state.counsel.subject);

  useEffect(() => {
    console.log("상담주제변경됨!");
    if (subject != undefined) {
      const fetchData = async () => {
        console.log("here");
        try {
          const response = await fetch(
            "https://j7b204.p.ssafy.io/api/counselors?subject=" + subject,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json", // 이 헤더를 통해 어떤 컨텐츠가 전달되는지 알 수 있음
              },
            }
          ); // 프로미스 객체 반환
          if (!response.ok) {
            throw new Error("Something went wront!");
          }
          const data = await response.json(); // 프로미스 객체 반환
          // data.data
          console.log(data.data);
          setWeekdayCounselors(filterWeekday(data.data));
          setWeekendCounselors(filterWeekend(data.data));
        } catch (error) {
          console.log(error.message);
          // setError(error.message);
        }
      };
      fetchData();
    }
  }, [subject, setWeekdayCounselors, setWeekendCounselors]);

  const filterWeekday = (counselors) => {
    return counselors.filter((counselor) => {
      return counselor.availableTime === "평일";
    });
  };

  const filterWeekend = (counselors) => {
    return counselors.filter((counselor) => {
      return counselor.availableTime === "주말";
    });
  };

  return (
    <Fragment>
      <CounselListRecommList recommCounselors={state} />
      <CounselSubjectList title="전문 분야별" />
      <div>
        <div className={classes.title}>평일</div>
        <div className={classes.back}>
          {weekdayCounselors &&
            weekdayCounselors.map((counselor, index) => (
              <TimeCounselorItem
                key={index}
                img={counselor.img}
                name={counselor.name}
                subject={counselor.subject}
                average={counselor.average}
              />
            ))}
          {subject != undefined && !weekdayCounselors && (
            <div>평일에 가능한 상담사가 없습니다. </div>
          )}
          {subject == undefined && <div>전문 분야를 선택해 주세요. </div>}
        </div>
      </div>
      <div>
        <div className={classes.title}>주말</div>
        <div className={classes.back}>
          {weekendCounselors &&
            weekendCounselors.map((counselor, index) => (
              <TimeCounselorItem
                key={index}
                name={counselor.name}
                subject={counselor.subject}
                average={counselor.average}
              />
            ))}
          {subject != undefined && !weekendCounselors && (
            <div>주말에 가능한 상담사가 없습니다. </div>
          )}
          {subject == undefined && <div>전문 분야를 선택해 주세요. </div>}
        </div>
      </div>
    </Fragment>
  );
};
export default ListCounselor;
//
