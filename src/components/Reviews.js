import { useEffect, useState } from "react";
import { getPlayList, deleteReview } from "../api/api";
import { Row } from "react-bootstrap";
import ReviewForm from "../components/ReviewForm";
import Review from "../components/Review";

const renderReviews = (
  reviews,
  handleClickDeleteReview,
  handleUpdateReview
) => {
  return reviews.map(({ id, review_text, rating, user }) => {
    return (
      <Review
        key={id}
        id={id}
        review_text={review_text}
        rating={rating}
        user={user}
        handleClickDeleteReview={handleClickDeleteReview}
        handleUpdateReview={handleUpdateReview}
      />
    );
  });
};

const Reviews = ({ playlist_id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadPlaylist = async () => {
      const data = await getPlayList(playlist_id);
      setReviews(data.reviews || []);
    };

    loadPlaylist();
  }, [playlist_id]);

  const handleNewReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  const handleUpdateReview = (updatedReview) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === updatedReview.id) {
          return updatedReview;
        } else {
          return review;
        }
      })
    );
  };

  const handleClickDeleteReview = (id) => {
    deleteReview(id);
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const currentUserReviewedPlaylist = () => {
    return (
      reviews.filter(
        (review) => review.user.username === localStorage.getItem("currentUser")
      ).length > 0
    );
  };

  return (
    <Row className="mt-5">
      <h4>Reviews</h4>
      {reviews &&
        renderReviews(reviews, handleClickDeleteReview, handleUpdateReview)}
      {!currentUserReviewedPlaylist() && (
        <div>
          <h2>Add Your Own</h2>
          <ReviewForm playlist_id={playlist_id} saveReview={handleNewReview} />
        </div>
      )}
    </Row>
  );
};

export default Reviews;
