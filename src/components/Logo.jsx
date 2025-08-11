import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";

function Logo() {
  return (
    <Link className="navbar-brand d-flex align-items-center" to="/">
      <FaReact className="me-2" size={28} />
      <span>LearnChain</span>
    </Link>
  );
}

export default Logo;
