import { Fragment } from "react";
import React from "react";
import classes from "./CounselTime.module.css";
import TimePicker from "../TimePicker";
const CounselTime = () => {
  // const [value, setValue] = React.useState(new Date());
  return (
    <Fragment>
      <div>
        <span className={classes.title}>시간 선택</span>
        <img src="./clock.png" alt="clock"></img>
      </div>
      <div className={classes.time}>
        <TimePicker />
      </div>
      <div className={classes.explain}>상담은 최대 한시간 진행됩니다.</div>
    </Fragment>
  );
};

export default CounselTime;
