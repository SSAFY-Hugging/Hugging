import React, { Fragment, useState } from "react";
import classes from "./CounselCalendar.module.css";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // css import
import "./Calendar.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { counselActions } from "../../store";

const CounselCalendar = () => {
  const [date, setDate] = useState();
  const dispatch = useDispatch();

  const calendarClickHandler = (date) => {
    setDate(date);
    dispatch(counselActions.selectDate(getFormatDate(date)));
  };

  // yyyy-MM-dd format 변경
  const getFormatDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;

    return year + "-" + month + "-" + day;
  };

  return (
    <Fragment>
      <div>
        <span className={classes.title}>상담 예약하기</span>
        <img
          src="./calendar.png"
          alt="calendar"
          className={classes.calendarImage}
        ></img>
        <div className={classes.calendar}>
          <Calendar
            onChange={calendarClickHandler}
            // onChange={calendarClickHandler}
            formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
            value={date}
            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          >
            {/* <div className="text-gray-500 mt-4">
            {moment(value).format("YYYY년 MM월 DD일")}
          </div> */}
          </Calendar>
        </div>
        {date && (
          <p className="text-center">
            <span className="bold">Selected Date:</span> {getFormatDate(date)}
          </p>
        )}
      </div>
    </Fragment>
  );
};

export default CounselCalendar;
