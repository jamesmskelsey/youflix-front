import { Form, Button } from "react-bootstrap";
import { updateReview } from "../api/api";

const ReviewForm = ({ review_id, rating, review_text, saveReview }) => {
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const { rating, review_text } = e.target;
    const reviewObj = {
      id: review_id,
      rating: rating.value,
      review_text: review_text.value,
    };
    const newReview = await updateReview(reviewObj);
    saveReview(newReview);
  };

  return (
    <Form onSubmit={handleSubmitReview}>
      <h2>Editing your Review {review_id}</h2>
      <Form.Select
        name="rating"
        defaultValue={rating}
        aria-label="rating select"
      >
        <option>Rating</option>
        <option value="1">&#9733;</option>
        <option value="2">&#9733; &#9733;</option>
        <option value="3">&#9733; &#9733; &#9733;</option>
        <option value="4">&#9733; &#9733; &#9733; &#9733;</option>
        <option value="5">&#9733; &#9733; &#9733; &#9733; &#9733;</option>
      </Form.Select>
      <Form.Group className="mb-3" controlId="review">
        <Form.Label>An Edited Succinct Review of this Playlist</Form.Label>
        <Form.Control
          as="textarea"
          defaultValue={review_text}
          name="review_text"
          rows={3}
        />
      </Form.Group>
      <Button type="submit">Save review</Button>
    </Form>
  );
};

export default ReviewForm;
