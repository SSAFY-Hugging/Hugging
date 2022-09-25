import {React,  useEffect }from 'react';
import { useDispatch } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RedirectUri = (props) => {
  
  const navigate = useNavigate()  ;
  const dispatch = useDispatch();

  
  useEffect(()=>{
    let code = new URL(window.location.href).searchParams.get("code");
    localStorage.setItem("code", code)

    axios({
        url: 'https://j7b204.p.ssafy.io/api/members/',
        method: "POST",
        data: {"code": code}
        })
      .then((res) => {
        console.log(res);     
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem("token", ACCESS_TOKEN);   
        navigate('/category')

        }).catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        navigate('/login')
        })
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