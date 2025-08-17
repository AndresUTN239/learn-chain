import { Link } from "react-router-dom";
import "../App.css";
import Button from "../components/Buttom";

export default function Login({setShowLayout}) {
  setShowLayout(false);

  return (
    <div className="App background-animated">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="shadow-lg p-4 bg-gray rounded rounded-2">
          <h3 className="text-center mb-4 tx-color-purple">Iniciar Sesión</h3>

          <form>
            {/* Email */}
            <div className="mb-3 text-start">
              <label className="form-label tx-color-purple">Correo electrónico</label>
              <input type="email" className="form-control" placeholder="tuemail@ejemplo.com" value="" required />
            </div>

            {/* Password */}
            <div className="mb-3 text-start">
              <label className="form-label tx-color-purple">Contraseña</label>
              <input type="password" className="form-control" placeholder="********" value="" required />
            </div>

            {/* Botón login */}
            <Button text={"Ingresar"} classes={"btn-dapp btn-dapp-purple mb-4"} />
          </form>

          {/* Enlaces extras */}
          <div className="mb-3">
            <label className="form-label tx-color-purple d-block">Si no estás registrado</label>
            <Button text={"Registrate"} classes={"btn-dapp btn-dapp-outline-purple"} />
          </div>

          <div className="text-start">
            <Link className="p-0" to="/">
              <Button text={"Volver"} classes={"btn-dapp btn-dapp-aqua"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
