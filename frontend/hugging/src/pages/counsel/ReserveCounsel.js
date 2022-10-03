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

const DUMMY_RESERVE = [
  {
    id: "r1",
    counselId: "1",
    memberNickname: "주희",
    reservationDate: "22/10/01",
    reservationTime: "18:00",
    subject: "Depressed",
    counselorName: "조성규",
  },
  {
    id: "r2",
    counselId: "2",
    memberNickname: "주희",
    reservationDate: "22/10/03",
    reservationTime: "11:00",
    subject: "Depressed",
    counselorName: "이주희",
  },
  {
    id: "r3",
    counselId: "3",
    memberNickname: "주희",
    reservationDate: "22/10/05",
    reservationTime: "11:00",
    subject: "Depressed",
    counselorName: "김호진",
  },
];

const DUMMY_COUNSELOR = [
  {
    counselorId: "1",
    name: "이주희",
    subject: "우울",
    average: 3.5,
  },
  {
    counselorId: "2",
    name: "김호진",
    subject: "가족",
    average: 3.5,
  },
  {
    counselorId: "3",
    name: "김성규",
    subject: "학교",
    average: 3.5,
  },
];

const ReserveCounsel = () => {
  // 예약 체크
  // 상담사, 날짜, 시간
  const [reservations, setReservation] = useState(DUMMY_RESERVE);
  const [counselors, setCounselors] = useState(DUMMY_COUNSELOR);
  const [error, setError] = useState();
  const [confirm, setConfirm] = useState();

  const counselorName = useSelector((state) => state.counsel.counselorName);
  const counselorId = useSelector((state) => state.counsel.counselorId);
  const subject = useSelector((state) => state.counsel.subject);
  const date = useSelector((state) => state.counsel.date);
  const time = useSelector((state) => state.counsel.time);

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

  const errorHandler = () => {
    setError(null);
  };
  const confirmHandler = () => {
    setConfirm(null);
  };

  const reservationDoneHandler = () => {
    fetchMyreservationHandler();
  };

  const fetchMyreservationHandler = useCallback(async () => {
    console.log("fetchMyreservationHandler 실행됨");

    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        id: 10,
        age: 20,
        counselList: [],
        email: "doohui96@naver.com",
        favoriteCounselorList: [],
        favoriteMusicList: [],
        gender: "FEMALE",
        nickname: "주히",
        profileImage: 1,
      })
    );

    const loadedUserProfile = localStorage.getItem("userProfile");
    if (loadedUserProfile !== null) {
      const parsedUser = JSON.parse(loadedUserProfile);
      try {
        const response = await fetch(
          "https://j7b204.p.ssafy.io/api/counsels/" + parsedUser.id
        ); // 프로미스 객체 반환
        if (!response.ok) {
          throw new Error("Something went wront!");
        }
        const data = await response.json(); // 프로미스 객체 반환
        console.log(data.data);
        setReservation(data.data);
      } catch (error) {
        setError(error.message);
      }
    }
  }, [setReservation]);

  const counselCancelHandler = () => {
    console.log("상담 취소");

    // 1. db 에서 삭제
    // MyReservationItem.js 에서 삭제

    // 2. reservation 다시 setting
    fetchMyreservationHandler();
  };

  useEffect(() => {
    fetchMyreservationHandler(); // 처음 랜더링 됐을 때 호출되도록
  }, [fetchMyreservationHandler]); // 의존성을 추가하지 않으면 무한루프에 빠질 수 있음

  useEffect(() => {
    if (subject != undefined) {
      console.log("상담주제변경됨!");
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
          // setReservation(data.data);
        } catch (error) {
          console.log(error.message);
          // setError(error.message);
        }
      };

      fetchData();
    }
  }, [subject]);

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
