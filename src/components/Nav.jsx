import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navbar-nav ms-auto">
      <Link className="nav-link" to="/">
        Inicio
      </Link>
      <Link className="nav-link" to="/about">
        Acerca
      </Link>
    </div>
  );
}

export default Nav;
