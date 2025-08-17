import { Link } from "react-router-dom";
import Button from "./Buttom";

function Nav() {
  return (
    <div className="navbar-nav ms-auto">
      <Link className="nav-link m-auto" to="/">
        Inicio
      </Link>
      <Link className="nav-link m-auto" to="/about">
        Sobre nosotros
      </Link>
      <Link className="nav-link p-0 m-auto mx-1" to="/login">
        <Button text={"Iniciar sesión"} classes={"btn-dapp btn-dapp-outline-purple"} />
      </Link>
      <Link className="nav-link p-0 m-auto mx-1" to="/teach">
        <Button text={"Enseñar"} classes={"btn-dapp btn-dapp-outline-aqua"} />
      </Link>
    </div>
  );
}

export default Nav;
