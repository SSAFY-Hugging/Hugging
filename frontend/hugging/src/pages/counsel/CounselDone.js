import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./CounselDone.module.css";
import Star from "../../components/counselor/Star";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import Header from "../../Layout/Header";

const CounselDone = () => {
  // Editor DOM 선택용
  const editorRef = useRef();
  const navigate = useNavigate();

  let counselorId = useSelector((state) => state.nowCounsel.counselorId);
  let counselorName = useSelector((state) => state.nowCounsel.counselorName);
  // let subject = useSelector((state) => state.nowCounsel.subject);
  let date = useSelector((state) => state.nowCounsel.date);
  let time = useSelector((state) => state.nowCounsel.time);
  let profileImage = useSelector((state) => state.nowCounsel.profileImage);
  let gender = useSelector((state) => state.nowCounsel.gender);

  let score = 0;
  const [nickname, setNickname] = useState();

  // 작성완료 버튼 클릭
  const registerClilckHandler = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    // console.log(editorRef.current?.getInstance().getHTML());
    // 입력창에 입력한 내용을 MarkDown 형태로 취득
    // console.log(editorRef.current?.getInstance().getMarkdown());

    const content = editorRef.current?.getInstance().getMarkdown();
    if (content.trim() === "") {
      alert("댓글을 입력해 주세요.");
      return;
    }

    const loadedUserProfile = localStorage.getItem("userprofile");
    let memberId = undefined;
    if (loadedUserProfile !== null) {
      const parsedUser = JSON.parse(loadedUserProfile);
      // console.log(parsedUser.id);
      memberId = parsedUser.id;
    }

    if (counselorId == undefined) {
      counselorId = 1;
    }
    if (memberId == undefined) {
      memberId = 10;
    }

    const review = {
      content,
      counselorId,
      memberId,
      score,
    };

    fetchReview(review);
  };

  // 취소 버튼
  const cancleClickHandler = () => {
    navigate("/counselreserve");
  };

  // 댓글 작성
  const fetchReview = async (review) => {
    try {
      const response = await fetch(
        "https://j7b204.p.ssafy.io/api/counselors/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // 이 헤더를 통해 어떤 컨텐츠가 전달되는지 알 수 있음
          },
          body: JSON.stringify(review),
        }
      ); // 프로미스 객체 반환
      if (!response.ok) {
        throw new Error("Something went wront!");
      }
      const data = await response.json(); // 프로미스 객체 반환
      console.log(data.data);
      if (data.data === "OK") {
        alert("댓글을 작성했습니다.");
      } else {
        alert("작성 중 오류가 발생했습니다.");
      }

      navigate("/counselprofile/" + review.counselorId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const starClickHandler = (starScore) => {
    score = starScore;
  };

  // 화면 들어왔을 때 실행
  useEffect(() => {
    const loadedUserProfile = localStorage.getItem("userProfile");
    if (loadedUserProfile !== null) {
      const parsedUser = JSON.parse(loadedUserProfile);
      setNickname(parsedUser.nickname);
    }
  }, []);

  const getFormatDate = () => {
    const date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;

    return year + "-" + month + "-" + day;
  };

  return (
    <div>
      <Header />
      <div className={classes.pink}>
        <div className={classes.title}>상담완료!</div>
        <div className={classes.extra}>
          <div className={classes.text}>좋은 상담 시간이었나요?</div>
          <div className={classes.text}>상담에 대한 리뷰를 남겨주세요.</div>
        </div>
      </div>
      <div className={classes.card}>
        {!profileImage && (
          <img
            src="./sampleCounselorSquare.png"
            alt="counselorImg"
            className={classes.profileImage}
          ></img>
        )}
        {profileImage && (
          <img
            src={profileImage}
            alt="counselorImg"
            className={classes.realProfileImage}
          ></img>
        )}
        <div className={classes.profileDetail}>
          <div>
            {counselorName && (
              <span className={classes.counselorName}>
                {counselorName} 상담사
              </span>
            )}
            {!counselorName && (
              <span className={classes.counselorName}>
                {counselorName} 이미소 상담사
              </span>
            )}
            {!gender && (
              <img
                src="../genderM.png"
                alt="male"
                className={classes.genderImg}
              ></img>
            )}
            {gender && gender === "MALE" && (
              <img
                src="../genderM.png"
                alt="male"
                className={classes.genderImg}
              ></img>
            )}
            {gender && gender === "FEMALE" && (
              <img
                src="../female.png"
                alt="female"
                className={classes.genderImg}
              ></img>
            )}
          </div>
          <div className={classes.dateTitle}>일시</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              width="17px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {(!date || !time) && (
              <span className={classes.date}>2022/10/05 11:00 ~ 12:00</span>
            )}
            {date && time && (
              <span className={classes.date}>
                {date} {time}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={classes.back}>
        <div className={classes.title2}>리뷰 작성</div>
        <div>
          <span className={classes.nickname}>{nickname}님(익명)</span>
          <span className={classes.regDate}>{getFormatDate()}</span>
        </div>
        <div className={classes.star}>
          <Star onClick={starClickHandler} />
        </div>
        <div>
          <Editor
            // placeholder="내용을 입력해주세요."
            ref={editorRef} // DOM 선택용 useRef
            previewStyle="vertical" // 미리보기 스타일 지정
            height="300px" // 에디터 창 높이
            initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
            toolbarItems={[
              // 툴바 옵션 설정
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "image", "link"],
              ["code", "codeblock"],
            ]}
          ></Editor>
        </div>
      </div>
      <div className={classes.btns}>
        <button className={classes.cancel} onClick={cancleClickHandler}>
          취소
        </button>
        <button className={classes.done} onClick={registerClilckHandler}>
          작성 완료
        </button>
      </div>
    </div>
  );
};

export default CounselDone;
