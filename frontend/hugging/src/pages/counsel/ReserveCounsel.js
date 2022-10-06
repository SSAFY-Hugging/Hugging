import React, { useState, useEffect, useCallback, Fragment } from "react";
import MyReservationList from "../../components/counsel/MyReservationList";
import CounselSubjectList from "../../components/counsel/CounselSubjectList";
import CounselorRecommList from "../../components/counsel/CounselorRecommList";
import classes from "./ReserveCounsel.module.css";
import Header from "../../Layout/Header";
import CounselCalendar from "../../components/counsel/CounselCalendar";
import CounselTime from "../../components/counsel/CounselTime";
import { useSelector } from "react-redux";
import ErrorModal from "../../components/ui/ErrorModal";
import ConfirmModal from "../../components/ui/ConfirmModal";

const ReserveCounsel = () => {
  const [reservations, setReservation] = useState();
  const [counselors, setCounselors] = useState();
  const [error, setError] = useState();
  const [confirm, setConfirm] = useState();

  const counselorId = useSelector((state) => state.counsel.counselorId);
  const subject = useSelector((state) => state.counsel.subject);
  const date = useSelector((state) => state.counsel.date);
  const time = useSelector((state) => state.counsel.time);

  // 예약하기 클릭
  // 예약 체크 목록
  // 상담사, 날짜, 시간
  const reservationClickHandler = () => {
    if (counselorId === undefined) {
      setError({
        title: "상담 예약 불가",
        message: "상담사를 선택해 주세요.",
      });

      return;
    }

    if (date === undefined) {
      setError({
        title: "상담 예약 불가",
        message: "상담 예약 날짜를 선택해 주세요.",
      });

      return;
    }

    if (time === undefined) {
      setError({
        title: "상담 예약 불가",
        message: "상담 예약 시간을 선택해 주세요.",
      });

      return;
    }

    setConfirm(true);
  };

  // 나의 예약 정보를 가져옴
  const fetchMyreservationHandler = useCallback(async () => {
    console.log("fetchMyreservationHandler 실행됨");

    const loadedUserProfile = localStorage.getItem("userprofile");
    const memberId = 10;
    if (loadedUserProfile !== null) {
      const parsedUser = JSON.parse(loadedUserProfile);
      memberId = parsedUser.id;
    }
    try {
      const response = await fetch(
        "https://j7b204.p.ssafy.io/api/counsels/" + memberId
      ); // 프로미스 객체 반환
      if (!response.ok) {
        throw new Error("Something went wront!");
      }
      const data = await response.json(); // 프로미스 객체 반환
      // 나의 예약 정보 출력
      console.log("나의 예약 정보 출력");
      console.log(data.data);
      setReservation(data.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [setReservation]);

  // 나의 추천 상담사 가져옴
  const fetchRecommCounselorHandler = useCallback(async () => {
    console.log("fetchfetchRecommCounselorHandlerHandler 실행됨");

    const loadedUserProfile = localStorage.getItem("userProfile");
    if (loadedUserProfile !== null) {
      const parsedUser = JSON.parse(loadedUserProfile);
      try {
        const response = await fetch(
          "https://j7b204.p.ssafy.io/recom/counselor/" + parsedUser.id
        ); // 프로미스 객체 반환
        if (!response.ok) {
          throw new Error("Something went wront!");
        }
        const data = await response.json(); // 프로미스 객체 반환
        console.log("추천 상담사 출력");
        console.log(data);
        setCounselors(data);
        // setReservation(data.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [setCounselors]);

  // 처음 들어왔을 때 실행
  // useEffect(() => {
  //   fetchMyreservationHandler();
  // }, [fetchMyreservationHandler]);
  useEffect(() => {
    fetchMyreservationHandler();
    fetchRecommCounselorHandler();
  }, [fetchMyreservationHandler, fetchRecommCounselorHandler]);

  // 상담 주제 클릭할 때 마다 실행
  useEffect(() => {
    if (subject != undefined) {
      console.log("상담주제변경됨!!!");
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://j7b204.p.ssafy.io/api/counselors?subject=" + subject,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json", // 이 헤더를 통해 어떤 컨텐츠가 전달되는지 알 수 있음
              },
            }
          ); // 프로미스 객체 반환
          if (!response.ok) {
            throw new Error("Something went wront!");
          }
          const data = await response.json(); // 프로미스 객체 반환
          setCounselors(data.data);
          console.log(data.data);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchData();
    }
  }, [subject]);

  const counselCancelHandler = () => {
    console.log("상담 취소");
    // 1. db 에서 삭제
    // 2. reservation 다시 setting
    fetchMyreservationHandler();
  };

  // 예약 버튼 클릭
  const reservationDoneHandler = () => {
    fetchMyreservationHandler();
  };

  // 예약 확인 창 닫기
  const confirmHandler = () => {
    setConfirm(null);
  };

  // 에러 창 닫기
  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      {confirm && (
        <ConfirmModal
          onConfirm={confirmHandler}
          onReservation={reservationDoneHandler}
        />
      )}
      <Header />
      <MyReservationList
        reservations={reservations}
        onCancle={counselCancelHandler}
      />
      <CounselSubjectList title="상담 주제" />
      <CounselorRecommList counselors={counselors} />
      <CounselCalendar />
      <CounselTime />
      <div className={classes.btn} onClick={reservationClickHandler}>
        <button>예약</button>
      </div>
      {/* <FooterNavigation /> */}
    </Fragment>
  );
};

export default ReserveCounsel;
