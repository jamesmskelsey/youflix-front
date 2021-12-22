import { useState } from "react";
import { Button } from "react-bootstrap";
import EditReviewForm from "./EditReviewForm";

const Review = ({ id, review_text, rating, user, handleClickDeleteReview, handleUpdateReview }) => {
  const [editing, setEdit] = useState(false);

  const handleSave = (updatedReview) => {
    setEdit(false)
    handleUpdateReview(updatedReview)
  }

  return (
    <div>
      {!editing ? (
        <div key={id}>
          <p className="lead">{review_text}</p>
          <p className="text-secondary">
            {getStars(rating)} by {user.username}
          </p>
          { user.username === localStorage.getItem("currentUser") &&
          <div>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => handleClickDeleteReview(id)}
            >
              Delete
            </Button>
            {" "}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          </div>
          }
        </div>
      ) : (
        <EditReviewForm
          review_id={id}
          rating={rating}
          review_text={review_text}
          saveReview={handleSave}
        />
      )}
    </div>
  );
};

const getStars = (num) => {
  let output = "";
  while (num-- > 0) {
    output += "\u2605";
  }
  return output;
};

export default Review;
