import classes from "./CounselReview.module.css";

const CounselReview = (props) => {
  const reviews = props.reviews;
  console.log(reviews);
  const starRendering = (review) => {
    const result = [];
    if (review.score === null) {
      for (let i = 0; i < 5; i++) {
        result.push(<img src="../emptyStar.png" alt="emptyStar"></img>);
      }
    } else {
      for (let i = 0; i < review.score; i++) {
        result.push(<img key={i} src="../Star.png" alt="star"></img>);
      }
      for (let i = 5 - review.score; i > 0; i--) {
        result.push(<img key={i} src="../emptyStar.png" alt="emptyStar"></img>);
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
              <span>{review.nickname}님</span>
              <span>{review.regDate}</span>
            </div>
            <div>
              {starRendering(review)}
              <span>({review.score})</span>
              <div>{review.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselReview;
