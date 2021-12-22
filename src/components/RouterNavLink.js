import { Link } from "react-router-dom";

const RouterNavLink = ({ to, children }) => {
  return (
    <Link to={to} className="nav-link">
      {children}
    </Link>
  );
};

export default RouterNavLink;
