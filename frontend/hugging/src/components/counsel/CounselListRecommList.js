import { Fragment } from "react";
import classes from "./CounselListRecommList.module.css";
import CounselListRecommItem from "./CounselListRecommItem";
import Card from "../ui/Card";

const CounselListRecommList = (props) => {
  console.log(props.recommCounselors);
  return (
    <Fragment>
      <div className={classes.title}>맞춤 추천</div>
      <Card>
        <div className={classes.back}>
          {props.recommCounselors.map((counselor) => (
            <CounselListRecommItem
              key={counselor.id}
              name={counselor.name}
              field={counselor.field}
              score={counselor.score}
            />
          ))}
        </div>
      </Card>
    </Fragment>
  );
};

export default CounselListRecommList;
