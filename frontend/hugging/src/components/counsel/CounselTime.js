import classes from "./CounselTime.module.css";
import { Fragment } from "react";
// import TextField from "@mui/material/TextField";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import React from "react";

const CounselTime = () => {
  const [value, setValue] = React.useState(new Date());
  return (
    <Fragment>
      <div>
        <span className={classes.title}>시간 선택</span>
        <img src="./clock.png" alt="clock"></img>
        <div className={classes.time}>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticTimePicker
              displayStaticWrapperAs="mobile"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}
        </div>
        <div className={classes.explain}>상담은 최대 한시간 진행됩니다.</div>
      </div>
    </Fragment>
  );
};

export default CounselTime;
