import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { doLogin } from "../api/api";

const LoginPage = ({ handleLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = await doLogin(username, password);
    setPassword("");
    if (loginData.token) {
      handleLogin();
      navigate("/");
    } else {
      setError(loginData.non_field_errors[0]);
    }
  };

  return (
    <Container>
      {error && <Alert variant="warning">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            Just the username, thanks.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Link className="App-link" to="/">
        back home
      </Link>
    </Container>
  );
};

export default LoginPage;
