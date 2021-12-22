import { useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";

const PlayListItem = ({ item, idx, handleSetVideo }) => {
  const { title, thumbnails } = item.snippet;

  return (
    <Row className="mt-5 playlist-item" onClick={() => {handleSetVideo(idx)}}>
      <Col md={2}>
        <Image src={thumbnails.default.url} />
      </Col>
      <Col>
        <h4>{idx + 1}. {title}</h4>
      </Col>
    </Row>
  );
};

export default PlayListItem;
