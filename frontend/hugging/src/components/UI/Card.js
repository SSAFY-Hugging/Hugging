import classes from './GrayCard.module.css';

const Card = (props) => {
  return <div className={classes.GrayCard}>{props.children}</div>;
};

export default Card;
