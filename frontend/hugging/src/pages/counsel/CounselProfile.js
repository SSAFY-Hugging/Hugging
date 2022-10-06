import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./CounselProfile.module.css";
import { counselActions } from "../../store";

import { useDispatch } from "react-redux";
import CounselDetail from "../../components/counsel/CounselDetail";
import CounselReview from "../../components/counsel/CounselReview";

import Header from "../../Layout/Header";

const CounselProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  console.log(params.counselorId); // 상담사 Id

  const [profile, setProfile] = useState();

  //counselorId 에 해당하는 상세정보 불러오기
  const fetchProfileHandler = useCallback(async () => {
    console.log("fetchProfileHandler 실행됨");

    try {
      const response = await fetch(
        "https://j7b204.p.ssafy.io/api/counselors/" + params.counselorId
      ); // 프로미스 객체 반환
      if (!response.ok) {
        throw new Error("Something went wront!");
      }
      const data = await response.json(); // 프로미스 객체 반환
      console.log("상담사 상세 프로필");
      console.log(data.data);

      setProfile(data.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [setProfile]);

  // 이 페이지에 들어오면 fetch API 실행
  useEffect(() => {
    fetchProfileHandler();
  }, [fetchProfileHandler]);

  //redux 에 counselor 에 counselor id 저장
  const selectCounselorHandler = () => {
    dispatch(counselActions.selectCounselorName(profile.name));
    dispatch(counselActions.selectCounselorId(profile.counselorId));
    dispatch(counselActions.selectSubject(profile.subject));
    dispatch(counselActions.selectProfileImage(profile.profileImage));

    navigate("/counselreserve");
  };

  return (
    <Fragment>
      <Header />
      {profile && <CounselDetail profile={profile} />}
      {!profile && <div>잘못된 접근입니다.</div>}
      {profile && <CounselReview reviews={profile.counselorReviewList} />}
      {!profile && <div>잘못된 접근입니다.</div>}
      <div className={classes.btn}>
        <button onClick={selectCounselorHandler}>상담사 선택</button>
      </div>
    </Fragment>
  );
};

export default CounselProfile;
