import { Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./CounselProfile.module.css";
import { counselActions } from "../../store";

import { useDispatch } from "react-redux";
import CounselDetail from "../../components/counsel/CounselDetail";
import CounselReview from "../../components/counsel/CounselReview";

const DUMMY_PROFILE = {
  name: "조성규",
  availableTime: "평일",
  certificate: "심리상담사 2급",
  subject: "우울",
  career: "상담 경력 5년 이상, 싸피대학교 상담 석사 졸업",
  explanation:
    "망설이지말고 편하게 상담해보세요. 나 자신을 위해 용기를 내보세요. 아픔, 상처, 고통, 슬픔을 상담을 통해 같이 나누고 풀어보시기 바랍니다.",
  gender: "MALE",
  score: 4.2,
  reviews: [
    {
      id: "61231",
      score: 4.2,
      content:
        "가슴이 먹먹하고 울화통이 터지기 직전, 상담사님의 메세지를 보고 바로 상담을 진행했습니다. 제가 겪고 있는 문제에 대해 공감해주시고 방향을 제시해주셔서 위로가 되었습니다. 정말 감사합니다.",
      regDate: "22.09.05",
    },
    {
      id: "최주희",
      score: 4.2,
      content: "너무 즐거운 시간이었습니다.",
      regDate: "22.09.28",
    },
  ],
};

const CounselProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  // console.log(params.counselorId); // 상담사 Id

  //redux 에 counselor 에 counselor id 저장
  // const counselor = useSelector((state) => state.counsel.counselor);

  const selectCounselorHandler = () => {
    dispatch(counselActions.selectCounselor(params.counselorId));
    dispatch(counselActions.selectSubject(DUMMY_PROFILE.subject));
    navigate(-1);
  };

  return (
    <Fragment>
      <CounselDetail profile={DUMMY_PROFILE} />
      <CounselReview reviews={DUMMY_PROFILE.reviews} />
      <div className={classes.btn}>
        <button onClick={selectCounselorHandler}>상담사 선택</button>
      </div>
    </Fragment>
  );
};

export default CounselProfile;
