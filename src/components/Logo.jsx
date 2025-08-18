import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { LiaBookReaderSolid } from "react-icons/lia";

function Logo() {
  return (
    <Link className="navbar-brand d-flex align-items-center" to="/">
      <LiaBookReaderSolid className="me-2" size={28} />
      <span>LearnChain</span>
    </Link>
  );
}

export default Logo;
