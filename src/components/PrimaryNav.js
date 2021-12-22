import { Navbar, Container, Nav } from "react-bootstrap";
import RouterNavLink from "./RouterNavLink";

const PrimaryNav = ({ currentUser, token }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">YouFlix</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <RouterNavLink to="/">Home</RouterNavLink>
            {token && <RouterNavLink to="/watchlist">My List</RouterNavLink>}
          </Nav>
          <Nav>
            {token ? (
              <RouterNavLink to="/logout">Logout</RouterNavLink>
            ) : (
              <>
                <RouterNavLink to="/login">Login</RouterNavLink>
                <RouterNavLink to="/signup">Create Account</RouterNavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PrimaryNav;
