import { Container, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { doSignup } from "../api/api";
import { useState } from "react";

const SignupPage = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    let userObject = {
      username,
      password,
    };
    let response = await doSignup(userObject);
    let data = await response.json();
    if (data.error) {
      console.log("there was an error signing up");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <Row>
        <h1 className="display-2">Create Account</h1>
         <Form onSubmit={handleSignup}>
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
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </Row>
    </Container>
  );
};

export default SignupPage;
