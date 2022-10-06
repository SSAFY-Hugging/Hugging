import classes from "./MyReservationItem.module.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nowCounselActions } from "../../store";

const MyReservationItem = (props) => {
  const dispatch = useDispatch();
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

    let url =
      "http://j7b204.p.ssafy.io/unity/index.html?from=OneToOne&nickName=" +
      props.memberNickname;
    url += "&counselId=" + props.counselId + "&subject=" + props.subject;
    window.open(url);

    navigate("/counseldone");
  };

  return (
    <>
      <div className={classes.item}>
        <div className={classes.title}>나의 예약 정보</div>
        <div className={classes.time}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              width="17px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className={classes.date}>
            {props.reservationDate} {props.reservationTime}
          </span>
        </div>
        <div className={classes.counselorName}>
          {props.counselorName} 상담사
        </div>
        <div className={classes.Button}>
          <button className={classes.btnCancel} onClick={cancelClickHandler}>
            <span className={classes.fontCancel}>예약 취소</span>
          </button>
          <button className={classes.btnEnter} onClick={metaverseHandler}>
            <span className={classes.fontEnter}> 입장</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MyReservationItem;
