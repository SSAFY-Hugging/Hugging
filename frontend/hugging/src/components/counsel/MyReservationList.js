import { Fragment } from "react";
import MyReservationItem from "./MyReservationItem";
import classes from "./MyReservationList.module.css";

const MyReservationList = (props) => {
  return (
    <Fragment>
      <div className={classes.list}>
        {props.reservations.map((reservation) => (
          <MyReservationItem
            key={reservation.id}
            id={reservation.id}
            time={reservation.time}
            counselorName={reservation.counselorName}
          ></MyReservationItem>
        ))}
      </div>
    </Fragment>
  );
};

export default MyReservationList;
