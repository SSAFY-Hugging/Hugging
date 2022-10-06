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
    // 현재 입장한 상담 정보 store 에 저장 (상담 후 리뷰 작성해야 함)
    // store: 상담사 이름, 아이디, 주제, 날짜, 시간
    dispatch(nowCounselActions.setNowCounselorName(props.counselorName));
    dispatch(nowCounselActions.setNowCounselorId(props.counselorId));
    dispatch(nowCounselActions.setNowSubject(props.subject));
    dispatch(nowCounselActions.setNowDate(props.reservationDate));
    dispatch(nowCounselActions.setNowTime(props.reservationTime));
    dispatch(nowCounselActions.setProfileImage(props.profileImage));
    dispatch(nowCounselActions.setGender(props.gender));

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
