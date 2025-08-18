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
          <h3 className="text-center mb-4 tx-color-purple">Registrar usuario</h3>

          <form>
            {/* Direción */}
            <div className="mb-3 text-start">
              <label className="form-label tx-color-purple">Wallet/Dirección</label>
              <input type="email" className="form-control" placeholder="" value="" required />
            </div>

            {/* Nombre */}
            <div className="mb-3 text-start">
              <label className="form-label tx-color-purple">Nombre</label>
              <input type="name" className="form-control" placeholder="" value="" required />
            </div>

            {/* Botón login */}
            <Button text={"Registrar"} classes={"btn-dapp btn-dapp-purple mb-4"} />
          </form>

          <div className="text-start">
            <Button text={"Volver"} classes={"btn-dapp btn-dapp-aqua"} onClick={() => navigate("/login")} />
          </div>
        </div>
      </div>
    </div>
  );
}
