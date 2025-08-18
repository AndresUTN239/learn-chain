import { Link } from "react-router-dom";
import "../App.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="App background-animated">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="shadow-lg p-4 card-dapp">
          <h3 className="text-center mb-4 tx-color-purple">Iniciar Sesión</h3>

          <form>
            {/* Direción */}
            <div className="mb-3 text-start">
              <label className="form-label tx-color-purple">Wallet/Dirección</label>
              <input type="email" className="form-control" placeholder="" value="" required />
            </div>

            {/* Botón login */}
            <Button text={"Ingresar"} classes={"btn-dapp btn-dapp-purple mb-4"} />
          </form>

          {/* Enlaces extras */}
          <div className="mb-3">
            <label className="form-label tx-color-purple d-block">Si no estás registrado</label>
            <Button text={"Registrate"} classes={"btn-dapp btn-dapp-outline-purple"} onClick={() => navigate("/registrarUsuario")} />
          </div>

          <div className="text-start">
            <Button text={"Volver"} classes={"btn-dapp btn-dapp-aqua"} onClick={() => navigate("/")} />
          </div>
        </div>
      </div>
    </div>
  );
}
