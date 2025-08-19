import { useState } from "react";
import "../App.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { callContractFunction } from "../config/conection";

export default function RegistrarUsuario({ contracts }) {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");

  // registrar usuario
  const registrar = async () => {
    if (!contracts?.ContratoRegistro) return;
    try {
        const data = await callContractFunction(contracts, "ContratoRegistro", "registrarUsuario", [1, nombre]);
        console.log(data);
      } catch (e) {
        console.error(e);
        
      } finally {
        
      }
  }

  return (
    <div className="App background-animated">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="shadow-lg p-4 card-dapp">
          <h3 className="text-center mb-4 tx-color-purple">Registrar usuario</h3>
          <div>
            <div className="mb-3 text-start">
              <label className="form-label tx-color-purple">Nombre</label>
              <input type="name" className="form-control" placeholder="" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>

            {/* Botón login */}
            <Button text={"Registrar"} classes={"btn-dapp btn-dapp-purple mb-4"} onClick={() => registrar()} />
          </div>
          <div className="text-start">
            <Button text={"Volver"} classes={"btn-dapp btn-dapp-aqua"} onClick={() => navigate("/")} />
          </div>
        </div>
      </div>
    </div>
  );
}
