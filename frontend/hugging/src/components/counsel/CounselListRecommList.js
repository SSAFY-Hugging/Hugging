import { Fragment } from "react";
import classes from "./CounselListRecommList.module.css";
import CounselListRecommItem from "./CounselListRecommItem";
import Card from "../ui/Card";

const CounselListRecommList = (props) => {
  const getUserNickname = () => {
    let nickName = "주히";

    const loadedUserProfile = localStorage.getItem("userprofile");
    if (loadedUserProfile !== null) {
      const parsedUser = JSON.parse(loadedUserProfile);
      nickName = parsedUser.nickname;
    }
    return nickName;
  };

  return (
    <Fragment>
      <div className={classes.title}> {getUserNickname()}님 맞춤 추천</div>
      <Card>
        <div className={classes.back}>
          {props.recommCounselors &&
            props.recommCounselors.map((counselor) => (
              <CounselListRecommItem
                key={counselor.id}
                id={counselor.id}
                name={counselor.name}
                subject={counselor.subject}
                average={counselor.average}
                profileImage={counselor.profileImage}
              />
            ))}
          {!props.recommCounselors && (
            <div className={classes.noCounselors}>추천 상담사가 없습니다. </div>
          )}
        </div>
      </Card>
    </Fragment>
  );
};

export default CounselListRecommList;
