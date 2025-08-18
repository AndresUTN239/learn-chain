import Title from "../components/Title";
import Button from "../components/Button";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";

export default function ListaCursos() {
  const headers = ["ID", "Curso", "Precio", "Suscriptores", "Opciones"];
  const items = [
    { Curso: "React", Precio: "4 ETH", Suscriptores: 120 },
    { Curso: "NodeJS", Precio: "2 ETH", Suscriptores: 75 },
    { Curso: "Solidity", Precio: "5 ETH", Suscriptores: 50 },
  ];

  const navigate = useNavigate();

  return (
    <div className="App bg-dark-gray">
      <div className="App-header container p-4 justify-content-start">
        <div className="row m-0 mb-4 w-100">
          <Title title="Lista de cursos" />
        </div>
        <div className="row m-0 mb-4 w-100">
          <div className="text-start card-dapp">
            <div className="container px-4 py-2">
              <Button text={"Agregar curso"} classes={"btn-dapp btn-dapp-aqua tx-sm"} onClick={() => navigate("/admin/agregarCurso")} />
              <div className="mb-3">
                <label for="curso" className="tx-sm">Buscar:</label>
                <input type="text" className="form-control" id="curso" placeholder="Nombre del curso"/>
              </div>
              <Table headers={headers} rows={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
