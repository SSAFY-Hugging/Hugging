import { Fragment } from "react";
import MyReservationItem from "./MyReservationItem";
import classes from "./MyReservationList.module.css";

const MyReservationList = (props) => {
  return (
    <Fragment>
      <div className={classes.list}>
        {props.reservations.map((reservation) => (
          <MyReservationItem
            key={reservation.counselId}
            counselId={reservation.counselId}
            memberNickname={reservation.memberNickname}
            reservationDate={reservation.reservationDate}
            reservationTime={reservation.reservationTime}
            subject={reservation.subject}
            counselorName={reservation.counselorName}
            onCancle={props.onCancle}
          ></MyReservationItem>
        ))}
      </div>
    </Fragment>
  );
};

export default MyReservationList;
