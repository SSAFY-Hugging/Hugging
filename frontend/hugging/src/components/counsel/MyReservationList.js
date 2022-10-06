import { Fragment } from "react";
import MyReservationItem from "./MyReservationItem";
import classes from "./MyReservationList.module.css";

const MyReservationList = (props) => {
  return (
    <Fragment>
      <div className={classes.list}>
        {props.reservations &&
          props.reservations.map((reservation) => (
            <MyReservationItem
              key={reservation.counselId}
              counselorId={reservation.counselorId}
              counselId={reservation.counselId}
              memberNickname={reservation.memberNickname}
              reservationDate={reservation.reservationDate}
              reservationTime={reservation.reservationTime}
              subject={reservation.subject}
              counselorName={reservation.counselorName}
              onCancle={props.onCancle}
            ></MyReservationItem>
          ))}
        {!props.reservations && <div>예약 내역이 없습니다.</div>}
      </div>
    </Fragment>
  );
};

export default MyReservationList;
