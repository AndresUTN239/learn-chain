import { Link } from "react-router-dom";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  return (
    <div className="navbar-nav ms-auto">
      <Link className="nav-link m-auto" to="/">
        Inicio
      </Link>
      <Link className="nav-link m-auto" to="/about">
        Sobre nosotros
      </Link>
      <div className="nav-link p-0 m-auto mx-1" to="/login">
        <Button text={"Iniciar sesión"} classes={"btn-dapp btn-dapp-outline-purple"} onClick={() => navigate("/login")} />
      </div>
      <div className="nav-link p-0 m-auto mx-1" to="/teach">
        <Button text={"Enseñar"} classes={"btn-dapp btn-dapp-outline-aqua"} onClick={() => navigate("/")} />
      </div>
    </div>
  );
}

export default Nav;
