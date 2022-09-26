import classes from './MyReservationItem.module.css';

const MyReservationItem = (props) => {
  return (
      <div className={classes.item}>
        <div className={classes.title}>나의 예약 정보</div>
        <div className={classes.time}>{props.time}</div>
        <div className={classes.counselorName}>{props.counselorName} 상담사</div>
        <div>
          <button className={classes.btnCancel}>예약 취소</button>
          <button className={classes.btnEnter}>입장</button>
        </div>
      </div>
  );
};

export default MyReservationItem;
