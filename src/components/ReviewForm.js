import {Form, Button} from 'react-bootstrap';
import { postReview } from "../api/api";


const ReviewForm = ({playlist_id, saveReview}) => {
  
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const { rating, review_text } = e.target;
    const reviewObj = {
      playlist_id,
      rating: rating.value,
      review_text: review_text.value,
    };
    const newReview = await postReview(reviewObj);
    saveReview(newReview)
  };

  return (
    <Form onSubmit={handleSubmitReview}>
      <Form.Select name="rating" aria-label="rating select">
        <option>Rating</option>
        <option value="1">&#9733;</option>
        <option value="2">&#9733; &#9733;</option>
        <option value="3">&#9733; &#9733; &#9733;</option>
        <option value="4">&#9733; &#9733; &#9733; &#9733;</option>
        <option value="5">&#9733; &#9733; &#9733; &#9733; &#9733;</option>
      </Form.Select>
      <Form.Group className="mb-3" controlId="review">
        <Form.Label>A Succinct Review of this Playlist</Form.Label>
        <Form.Control as="textarea" name="review_text" rows={3} />
      </Form.Group>
      <Button type="submit">Save review</Button>
    </Form>
  );
}

export default ReviewForm;