import { Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { doLogout } from '../api/api';

const LogoutPage = ({handleLogout}) => {
  useEffect(() => {
    doLogout();
    handleLogout();
  });

  return (
    <Container>
      <Row>
        <h1 className="display-1">See you next time!</h1>
        <Link to="/">Home</Link>
      </Row>
    </Container>
  );
};

export default LogoutPage;
