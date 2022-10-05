import classes from "./MyReservationItem.module.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MyReservationItem = (props) => {
  const navigate = useNavigate();

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

  const metaverseHandler = (e) => {
    console.log("입장 클릭 ");
    // navigate("/edit", { state: e.target.value });
    //1:1 상담방이면 OneToOne|주희|001|Company

    let url = "http://j7b204.p.ssafy.io:3030/unity?from=OneToOne&nickName=" + props.memberNickname;
    url += "&counselId=" + props.counselId + "&subject=" + props.subject;
    window.open(url);

    navigate("/counseldone");
  };

  console.log("hre");
  console.log(props);
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
          <button className={classes.btnEnter} onClick={metaverseHandler}>
            입장
          </button>
        </div>
      </div>
    </>
  );
};

export default MyReservationItem;
