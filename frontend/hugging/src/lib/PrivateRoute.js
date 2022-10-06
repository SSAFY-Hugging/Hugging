import React from "react";
import { Route, Navigate } from "react-router-dom";
import isLogin from "./isLogin";

const PrivateRoute = ({ children }) => {
  !isLogin() && alert("접근 권한이 없습니다. 로그인 후 다시 시도하십시오.");
  return isLogin() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
