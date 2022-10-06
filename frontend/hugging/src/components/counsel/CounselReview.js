import classes from "./CounselReview.module.css";

const CounselReview = (props) => {
  const reviews = props.reviews;
  console.log(reviews);

  const starRendering = (review) => {
    const result = [];
    if (review.score === null) {
      for (let i = 0; i < 5; i++) {
        result.push(
          <img
            key={i}
            src="../emptyStar.png"
            alt="emptyStar"
            className={classes.starImg}
          ></img>
        );
      }
    } else {
      for (let i = 0; i < Math.floor(review.score); i++) {
        result.push(
          <img
            key={i}
            src="../Star.png"
            alt="star"
            className={classes.starImg}
          ></img>
        );
      }
      for (let i = 0; i < 5 - Math.floor(review.score); i++) {
        result.push(
          <img
            key={i + 5}
            src="../emptyStar.png"
            alt="emptyStar"
            className={classes.starImg}
          ></img>
        );
      }
    }
    return result;
  };
  return (
    <div className={classes.background}>
      <div className={classes.title}>리뷰 ({reviews.length})</div>
      <div>
        {reviews.map((review, index) => (
          <div key={index} className={classes.review}>
            <div>
              <div className={classes.text}>{review.nickname}님</div>
              <div className={classes.date}>{review.regDate}</div>
            </div>
            <div>
              {starRendering(review)}
              <span className={classes.score}>({review.score})</span>
              <div className={classes.content}>{review.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselReview;
