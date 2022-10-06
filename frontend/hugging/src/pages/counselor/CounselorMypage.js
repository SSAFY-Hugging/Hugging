import React from "react";
import styles from "./CounselorMypage.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginCounselor } from "../../store";
import Calendar from "../../components/counselor/MyCalendar";
import Star from "../../components/counselor/Star";
import Nav from "../../components/ui/Nav";
import CounselDetail from "../../components/counsel/CounselDetail";

function CounselorMypage() {
  let profile = localStorage.getItem("counselorprofile");
  let counselorprofile = JSON.parse(profile);
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  //프주 수정
  const starClickHandler = (starScore) => {
    console.log(starScore);
  };
  //

  return (
    <>
      <CounselDetail />

      {/* <div className={styles.Nav}>
        <h6 className={styles.counselor_title}>상담사 페이지</h6>
      </div>
      <div className={styles.counselor_card}>
        <div className={styles.counselor_img}></div>
        <div className="">
          <span className={styles.counselor_name}>
            {counselorprofile.name} 상담사
          </span>
        </div>
        <div className={styles.counselor_card_item}>
          <span className={styles.counselor_card_item_text}>가능 시간</span>
          <span className={styles.counselor_text}>
            {counselorprofile.availableTime}
          </span>
        </div>
        <div>
          <span className={styles.counselor_card_item_text}>자격증</span>
          <span className={styles.counselor_text}>
            {counselorprofile.certificate}
          </span>
        </div>
        <div>
          <span className={styles.counselor_card_item_text}>전문분야</span>
          <span className={styles.counselor_text}>
            {counselorprofile.subject}
          </span>
        </div>
        <div>
          <Star onClick={starClickHandler} />
        </div>
        <div>
          <span className={styles.counselor_card_item_text}>
            주요 자격 및 경력
          </span>
        </div>
        <span className={styles.counselor_text2}>
          {counselorprofile.career}
        </span>
        <div>
          <span className={styles.counselor_card_item_text}>상담사 이야기</span>
        </div>
        <span className={styles.counselor_text2}>
          {counselorprofile.explanation}
        </span>
      </div> */}

      <Calendar />
    </>
  );
}

export default CounselorMypage;
// export default CounselDetail;
// import { createBrowserHistory } from "@remix-run/router";
// import { Fragment } from "react";
// import classes from "./CounselDetail.module.css";

// const CounselDetail = (props) => {
//   console.log(props.profile);
//   const reviewLength = props.profile.counselorReviewList.length;

//   const inputCareer = props.profile.career;
//   const inputExplanation = props.profile.explanation;
//   const inputCertificate = props.profile.certificate;

//   const careers = inputCareer.split("#");
//   const explains = inputExplanation.split("\\n");
//   const certificates = inputCertificate.split("#");

//   //   console.log(inputCareer);
//   //   console.log(careers);

//   let value = "Depressed";
//   if (props.profile.subject === "Depressed") value = "우울";
//   if (props.profile.subject === "Insomnia") value = "불면";
//   if (props.profile.subject === "Family") value = "가족";
//   if (props.profile.subject === "School") value = "학교";
//   if (props.profile.subject === "Company") value = "직장/진로";
//   if (props.profile.subject === "Relationship") value = "대인관계";
//   if (props.profile.subject === "Love") value = "연애/결혼";
//   if (props.profile.subject === "SelfUnderstanding") value = "자기이해";

//   const starRendering = () => {
//     const result = [];
//     if (props.profile.average === null) {
//       for (let i = 0; i < 5; i++) {
//         result.push(
//           <img
//             key={i}
//             src="../emptyStar.png"
//             alt="emptyStar"
//             className={classes.starImg}
//           ></img>
//         );
//       }
//     } else {
//       for (let i = 0; i < Math.floor(props.profile.average); i++) {
//         result.push(
//           <img
//             key={i}
//             src="../Star.png"
//             alt="star"
//             className={classes.starImg}
//           ></img>
//         );
//       }
//       for (let i = 0; i < 5 - Math.floor(props.profile.average); i++) {
//         result.push(
//           <img
//             key={i + 5}
//             src="../emptyStar.png"
//             alt="emptyStar"
//             className={classes.starImg}
//           ></img>
//         );
//       }
//     }
//     return result;
//   };

//   return (
//     <Fragment>
//       <div className={classes.profile}>
//         <div>
//           <img
//             className={classes.profileImg}
//             src="../sampleCounselorCircle.png"
//             alt="counselorProfile"
//           ></img>
//         </div>
//         <div className={classes.detailBox}>
//           <div>
//             <span className={classes.name}>{props.profile.name} 상담사</span>
//             {props.profile.gender === "MALE" && (
//               <img
//                 src="../genderM.png"
//                 alt="male"
//                 className={classes.genderImg}
//               ></img>
//             )}
//             {props.profile.gender === "FEMALE" && (
//               <img
//                 src="../female.png"
//                 alt="female"
//                 className={classes.genderImg}
//               ></img>
//             )}
//           </div>
//           <div>
//             <span className={classes.blue}>가능시간</span>
//             <span className={classes.context}>
//               {props.profile.availableTime}
//             </span>
//           </div>
//           <div>
//             <div className={classes.blue}>자격증</div>
//             <ul>
//               {certificates.map((certificate, index) => (
//                 <li key={index} className={classes.context}>
//                   {certificate}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <span className={classes.blue}>전문분야</span>
//             <span className={classes.context}>{value}</span>
//           </div>
//           <div>
//             {starRendering()}
//             <span className={classes.scoreOuter}>
//               {props.profile.average != null && (
//                 <span className={classes.score}>({props.profile.average})</span>
//               )}
//               {props.profile.average === null && (
//                 <span className={classes.score}>({0})</span>
//               )}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className={classes.detailBox}>
//         <div className={classes.title}>주요 자격 및 경력</div>
//         <ul>
//           {careers.map((career, index) => (
//             <li key={index} className={classes.context}>
//               {career}
//             </li>
//           ))}
//         </ul>
//         <div className={classes.title}>상담사 이야기</div>
//         <div className={classes.context}>
//           {explains.map((explain, index) => (
//             <div key={index}>{explain}</div>
//           ))}
//         </div>
//       </div>
//     </Fragment>
//   );
// };
