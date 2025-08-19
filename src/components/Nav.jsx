import { Link } from "react-router-dom";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { callContractFunction } from "../config/conection";

function Nav({ contracts, account, rol }) {
  const navigate = useNavigate();

  // pasar a ser profesor
  const cambiarRol = async () => {
    if (!contracts?.ContratoRegistro) return;
    try {
        const data = await callContractFunction(contracts, "ContratoRegistro", "actualizarUsuario", [2, account]);
      } catch (e) {
        console.error(e);
        
      } finally {
        
      }
  }

  return (
    <div className="navbar-nav ms-auto">
      <Link className="nav-link m-auto" to="/">
        Inicio
      </Link>
      <Link className="nav-link m-auto" to="/about">
        Sobre nosotros
      </Link>
      {rol === 1 && (
        <>
          <Link className="nav-link m-auto" to="/cursos">
            Tus cursos
          </Link>
          <Link className="nav-link m-auto" to="/cursos">
            Usuario
          </Link>
        </>
      )}
      {rol === 0 && (
        <div className="nav-link p-0 m-auto mx-1" to="/login">
          <Button text={"Registrate"} classes={"btn-dapp btn-dapp-outline-purple"} onClick={() => navigate("/registrarUsuario")} />
        </div>
      )}
      {rol === 1 && (
        <div className="nav-link p-0 m-auto mx-1" to="/teach">
          <Button text={"Enseñar"} classes={"btn-dapp btn-dapp-outline-aqua"} onClick={() => cambiarRol()} />
        </div>
      )}
      {rol === 2 && (
        <div className="nav-link p-0 m-auto mx-1" to="/teach">
          <Button text={"Crear cursos"} classes={"btn-dapp btn-dapp-outline-aqua"} onClick={() => navigate("/admin/dashboard")} />
        </div>
      )}
    </div>
  );
}

export default Nav;
