import { Fragment } from "react";
import ReactDom from "react-dom";
import classes from "./ConfirmModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { counselActions } from "../../store";
import Card from "../ui/Card";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
};

const ModalOverlay = (props) => {
  const dispatch = useDispatch();

  let value = "우울";
  if (props.subject === "Depressed") value = "우울";
  if (props.subject === "Insomnia") value = "불면";
  if (props.subject === "Family") value = "가족";
  if (props.subject === "School") value = "학교";
  if (props.subject === "Company") value = "직장/진로";
  if (props.subject === "Relationship") value = "대인관계";
  if (props.subject === "Love") value = "연애/결혼";
  if (props.subject === "SelfUnderstanding") value = "자기이해";

  const reserveHandler = () => {
    console.log("예약하기");

    // counselorId, memberId, reservationDate, subject

    // memberId 가져옴
    const loadedUserProfile = localStorage.getItem("userprofile");
    let memberId = 10;
    if (loadedUserProfile !== null) {
      const parsedUser = JSON.parse(loadedUserProfile);
      memberId = parsedUser.id;
    }
    // console.log(parsedUser.id);
    const reservation = {
      counselorId: props.counselorId,
      memberId,
      reservationDate: props.date + " " + props.time,
      subject: props.subject,
    };

    fetchReserveHandler(reservation);
  };

  const fetchReserveHandler = async (reservation) => {
    try {
      const response = await fetch("https://j7b204.p.ssafy.io/api/counsels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 이 헤더를 통해 어떤 컨텐츠가 전달되는지 알 수 있음
        },
        body: JSON.stringify(reservation),
      }); // 프로미스 객체 반환
      if (!response.ok) {
        throw new Error("Something went wront!");
      }
      const data = await response.json(); // 프로미스 객체 반환
      console.log(data.data);
      if (data.data == "OK") {
        alert("예약되었습니다.");
        props.onConfirm();
        props.onReservation();
        // store 초기화 (counselId, counselName, date, time)
        dispatch(counselActions.selectCounselorName(undefined));
        dispatch(counselActions.selectCounselorId(undefined));
        dispatch(counselActions.selectDate(undefined));
        dispatch(counselActions.selectTime(undefined));
      }
      // setReservation(data.data);
    } catch (error) {
      console.log(error.message);
      // setError(error.message);
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modal_bar}></div>
      <div>
        <Card className={classes.card}>
          <div className={classes.column}>
            <div>
              <img
                src={props.profileImage}
                alt="counselor"
                className={classes.profileImage}
              />
              <div className={classes.name}>{props.counselorName} 상담사</div>
            </div>
            <div className={classes.detail}>
              <div className={classes.title}>일시</div>
              <div className={classes.text}>{props.date}</div>
              <div className={classes.text}>{props.time}</div>
              <div>
                <span className={classes.title}>상담사</span>
                <span className={classes.text}>{props.counselorName}</span>
              </div>
              <div>
                <span className={classes.title}>주제</span>
                <span className={classes.text}>{value}</span>
              </div>
            </div>
          </div>
        </Card>
        <div className={classes.confirm}>
          <div className={classes.confirmText}>예약 완료하시겠습니까?</div>
        </div>
        <div className={classes.btns}>
          <button className={classes.cancel} onClick={props.onConfirm}>
            취소
          </button>
          <button className={classes.reservation} onClick={reserveHandler}>
            예약
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = (props) => {
  const counselorName = useSelector((state) => state.counsel.counselorName);
  const counselorId = useSelector((state) => state.counsel.counselorId);
  const date = useSelector((state) => state.counsel.date);
  const time = useSelector((state) => state.counsel.time);
  const subject = useSelector((state) => state.counsel.subject);
  const profileImage = useSelector((state) => state.counsel.profileImage);

  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          counselorName={counselorName}
          counselorId={counselorId}
          date={date}
          time={time}
          subject={subject}
          profileImage={profileImage}
          onConfirm={props.onConfirm}
          onReservation={props.onReservation}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ConfirmModal;
