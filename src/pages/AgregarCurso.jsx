import Title from "../components/Title";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function AgregarCurso() {
  const navigate = useNavigate();

  return (
    <div className="App bg-dark-gray">
      <div className="App-header container p-4 justify-content-start">
        <div className="row m-0 mb-4 w-100">
          <Title title="Crear curso" />
        </div>
        <div className="row m-0 mb-4 w-100">
          <div className="text-start card-dapp">
            <div className="container px-4 py-2">
              <div className="row mb-3">
                <div className="col-6">
                  <label for="nombre" className="tx-sm">Nombre del curso:</label>
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre" />
                </div>
                <div className="col-6">
                  <label for="precio" className="tx-sm">Precio:</label>
                  <input type="number" className="form-control" id="precio" placeholder="ETH" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <div class="mb-3">
                    <label for="descripcion" class="tx-sm">Descripción:</label>
                    <textarea className="form-control" id="descripcion" rows="3" placeholder="Una descripción breve"></textarea>
                  </div>
                </div>
              </div>
              <div className="text-center justify-content-center">
                <Button text={"Volver"} classes={"btn-dapp btn-dapp-outline-aqua tx-sm"} onClick={() => navigate("/admin/cursos")} />
                <br/>
                <Button text={"Guardar"} classes={"btn-dapp btn-dapp-aqua tx-sm"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
