import React, { Fragment } from "react";
import MyReservationList from "../../components/counsel/MyReservationList";
import CounselSubjectList from "../../components/counsel/CounselSubjectList";
import CounselRecommList from "../../components/counsel/CounselorRecommList";
import classes from "./ReserveCounsel.module.css";

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

const ReserveCounsel = () => {
  return (
    <Fragment>
      <MyReservationList reservations={DUMMY_RESERVE} />
      <CounselSubjectList />
      <CounselRecommList />
      <div> Calendar</div>
      <div> Time </div>
      <div className={classes.btn}>
        <button>예약</button>
      </div>
    </Fragment>
  );
};

export default ReserveCounsel;
