import classes from "./CounselSubjectList.module.css";
import CounselSubjectListItem from "./CounselSubjectListItem";
import { Fragment } from "react";

const DUMMY_SUBJECT1 = [
  {
    id: "s1",
    title: "우울",
  },
  {
    id: "s2",
    title: "불면",
  },
  {
    id: "s3",
    title: "가족",
  },
  {
    id: "s4",
    title: "학교",
  },
];

const DUMMY_SUBJECT2 = [
  {
    id: "s5",
    title: "직장/진로",
  },
  {
    id: "s6",
    title: "대인관계",
  },
  {
    id: "s7",
    title: "연애/결혼",
  },
  {
    id: "s8",
    title: "자기이해",
  },
];

const CounselSubjectList = () => {
  return (
    <Fragment>
      <div className={classes.title}>상담 주제</div>
      <div>
        <div>
          {DUMMY_SUBJECT1.map((subject) => (
            <CounselSubjectListItem
              key={subject.id}
              id={subject.id}
              title={subject.title}
            ></CounselSubjectListItem>
          ))}
        </div>
        <div>
          {DUMMY_SUBJECT2.map((subject) => (
            <CounselSubjectListItem
              key={subject.id}
              id={subject.id}
              title={subject.title}
            ></CounselSubjectListItem>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CounselSubjectList;
