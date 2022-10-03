import classes from "./MyReservationItem.module.css";
import { useCallback } from "react";

const MyReservationItem = (props) => {
  const cancelClickHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://j7b204.p.ssafy.io/api/counsels/" + props.counselId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application.json",
          },
        }
      ); // 프로미스 객체 반환
      if (!response.ok) {
        throw new Error("Something went wront!");
      }

      alert("취소되었습니다.");
      // const data = await response.json(); // 프로미스 객체 반환
      // console.log(data.data);
      // setReservation(data.data);
    } catch (error) {
      alert("삭제 실패");
      // setError(error.message);
    }

    props.onCancle();
  }, []);

  return (
    <>
      <div className={classes.item}>
        <div className={classes.title}>나의 예약 정보</div>
        <div className={classes.time}>
          {props.reservationDate} {props.reservationTime}
        </div>
        <div className={classes.counselorName}>
          {props.counselorName} 상담사
        </div>
        <div className={classes.Button}>
          <button className={classes.btnCancel} onClick={cancelClickHandler}>
            예약 취소
          </button>
          <button className={classes.btnEnter}>입장</button>
        </div>
      </div>
    </>
  );
};

export default MyReservationItem;
