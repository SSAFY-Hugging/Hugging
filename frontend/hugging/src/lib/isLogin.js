const isLogin = () => {
  return !!localStorage.getItem("token"); // 토큰이 있다면 로그인한 회원
};

export default isLogin;
