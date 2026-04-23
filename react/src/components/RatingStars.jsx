function RatingStars({ rating, reviews }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    let starClass = 'empty';

    if (rating >= starValue) {
      starClass = 'full';
    } else if (rating >= starValue - 0.5) {
      starClass = 'half';
    }

    return (
      <span key={i} className={`star ${starClass}`}>
        ★
      </span>
    );
  });

  return (
    <div className="rating-container">
      <div className="stars-row">{stars}</div>
      <div className="rating-meta">
        <span className="rating-number">{rating.toFixed(1)}</span>
        <span className="divider">·</span>
        <span className="review-count">{reviews} reviews</span>
      </div>
    </div>
  );
}

export default RatingStars;
