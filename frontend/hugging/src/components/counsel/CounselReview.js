import classes from "./CounselReview.module.css";

const CounselReview = (props) => {
  const reviews = props.reviews;
  console.log(reviews);
  return (
    <div className={classes.background}>
      <div className={classes.title}>리뷰 ({reviews.length})</div>
      <div>
        {reviews.map((review, index) => (
          <div key={index} className={classes.review}>
            <div>
              <span>{review.id}님</span>
              <span>{review.regDate}</span>
            </div>
            <div>
              <img src="../Star.png" alt="star"></img>
              <img src="../Star.png" alt="star"></img>
              <img src="../Star.png" alt="star"></img>
              <img src="../Star.png" alt="star"></img>
              <img src="../Star.png" alt="star"></img>
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
