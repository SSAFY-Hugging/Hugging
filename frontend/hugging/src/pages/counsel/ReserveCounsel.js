import React, { useState, Fragment } from "react";
import MyReservationList from "../../components/counsel/MyReservationList";
import CounselSubjectList from "../../components/counsel/CounselSubjectList";
import CounselorRecommList from "../../components/counsel/CounselorRecommList";
import classes from "./ReserveCounsel.module.css";
import Header from "../../Layout/Header";
import CounselCalendar from "../../components/counsel/CounselCalendar";
import CounselTime from "../../components/counsel/CounselTime";
import { useSelector } from "react-redux";
import ErrorModal from "../../components/ui/ErrorModal";

const DUMMY_RESERVE = [
  {
    id: "r1",
    time: "22/10/01 11:00~12:00",
    counselorName: "조성규",
  },
  {
    id: "r2",
    time: "22/10/03 11:00~12:00",
    counselorName: "이주희",
  },
  {
    id: "r3",
    time: "22/10/05 11:00~12:00",
    counselorName: "김호진",
  },
];

const DUMMY_COUNSELOR = [
  {
    id: "c1",
    name: "이주희",
    field: "번아웃",
    score: 3.5,
  },
  {
    id: "c2",
    name: "김호진",
    field: "가족관계",
    score: 3.5,
  },
  {
    id: "c3",
    name: "김성규",
    field: "불안",
    score: 3.5,
  },
];

const ReserveCounsel = () => {
  // 예약 체크
  // 상담사, 날짜, 시간
  const [error, setError] = useState();

  const counselor = useSelector((state) => state.counsel.counselor);
  console.log({ counselor });

  const reservationClickHandler = () => {
    if (counselor === undefined) {
      setError({
        title: "상담 예약 불가",
        message: "상담사를 선택해 주세요.",
      });
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Header />
      <MyReservationList reservations={DUMMY_RESERVE} />
      <CounselSubjectList title="상담 주제" />
      <CounselorRecommList counselors={DUMMY_COUNSELOR} />
      <CounselCalendar />
      <CounselTime />
      <div className={classes.btn} onClick={reservationClickHandler}>
        <button>예약</button>
      </div>
      {/* <FooterNavigation /> */}
    </Fragment>
  );
};

export default ReserveCounsel;
