import classes from "./CounselSubjectListItem.module.css";

const CounselSubjectListItem = (props) => {
  return (
    <span className={classes.square}>
      <div className={classes.text}>{props.title}</div>
    </span>
  );
};

export default CounselSubjectListItem;
