import Title from "../components/Title";
import Button from "../components/Button";
import Table from "../components/Table";

export default function Ganancias() {
  const headers = ["#", "Curso", "Ingresos", "Suscriptores"];
  const items = [
    { Curso: "React", Ingresos: `${4 * 120} ETH`, Suscriptores: 120 },
    { Curso: "NodeJS", Ingresos: `${2 * 75} ETH`, Suscriptores: 75 },
    { Curso: "Solidity", Ingresos: `${7 * 50} ETH`, Suscriptores: 50 },
  ];

  return (
    <div className="App bg-dark-gray">
      <div className="App-header container p-4 justify-content-start">
        <div className="row m-0 mb-4 w-100">
          <Title title="Ganancias por cursos" />
          <div className="text-start card-dapp mt-4">
            <div className="container px-4 py-2">
              <p className='tx-md m-0'>Fondos sin retirar: {(4*120)+(2*75)+(7*50)} ETH</p>
            </div>
          </div>
        </div>
        <div className="row m-0 mb-4 w-100">
          <div className="text-start card-dapp">
            <div className="container px-4 py-2">
              <Button text={"Retirar fondos"} classes={"btn-dapp btn-dapp-aqua tx-sm"} />
              <div className="mb-3">
                <label for="curso" className="tx-sm">Buscar:</label>
                <input type="text" className="form-control" id="curso" placeholder="Nombre del curso" />
              </div>
              <Table headers={headers} rows={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
