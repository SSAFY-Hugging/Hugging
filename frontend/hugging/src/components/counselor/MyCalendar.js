import React, { useState } from "react";
import Calendar, { MonthView } from "react-calendar";
import "react-calendar/dist/Calendar.css";

// import '.;
import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import moment from "moment";

function MyCalendar() {
  const [value, onChange] = useState(new Date());

  // const [mark, setMark] = useState([]);
  // const now = new Date();
  // const month = now.getMonth();

  let counselorprofile = localStorage.getItem("counselorprofile");
  counselorprofile = JSON.parse(counselorprofile);
  let counselList = counselorprofile.counselList;
  const [mark, setMark] = useState(
    counselList.map(function (a, i) {
      return counselList[i].reservationDate;
    })
  );

  // const { data } = useQuery(
  //   ["logDate", month],
  //   async () => {
  //     const result = await axios.get(
  //       `/api/healthLogs?health_log_type=DIET`
  //     );
  //     return result.data;
  //   },
  //   {
  //     onSuccess: (data: any) => {
  //       setMark(data);

  //     },
  //   }
  // );
  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-EN"
        formatDay={(locale, date) => moment(date).format("D")}
        className="mx-auto w-full text-sm border-b"
        tileContent={({ date, view }) => {
          let html = [];
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<div className="dot"></div>);
          }
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">
                {html}
              </div>
            </>
          );
        }}
      />
      <div className="reservation_date">
        {moment(value).format("YYYY-MM-DD")}일 일정
      </div>

      {counselList.map(function (a, i) {
        return (
          <>
            <div className="reservation_div">
              <div className="reservation_num">0{i + 1}</div>
              <div className="reservation_circle"></div>
              <div className="reservation_content">
                {counselList[i].reservationTime}
              </div>
              <div className="reservation_counselid">
                {counselList[i].memberNickname}
              </div>
            </div>
            <div className="reservation_tag">#{counselList[i].subject}</div>
          </>
        );
      })}
    </div>
  );
}
export default MyCalendar;
