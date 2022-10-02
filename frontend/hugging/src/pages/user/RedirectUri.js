import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_HOST_URL } from "../../config";
import jwt_decode from "jwt-decode";

const RedirectUri = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    localStorage.setItem("code", code);
    axios({
      url: API_HOST_URL + "members/",
      method: "POST",
      data: {
        code: code,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (!res.data.newMember) {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("isSocialLogin", true);
          let userId = jwt_decode(res.data.token);
          axios({
            url: "https://j7b204.p.ssafy.io/api/members/" + userId.sub,
            method: "GET",
          })
            .then((res) => {
              console.log("성공");
              console.log(res.data);
              localStorage.setItem("userprofile", JSON.stringify(res.data));
              navigate("/");
            })
            .catch((err) => {
              console.log("실패");
              console.log(err);
            });
        } else {
          const email = res.data.email;
          localStorage.setItem("email", email);
          navigate("/category");
        }
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        navigate("/login");
      });
  }, []);

  return (
    <div class="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader
          color="#C63DEE"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
    </div>
  );
};

export default RedirectUri;
