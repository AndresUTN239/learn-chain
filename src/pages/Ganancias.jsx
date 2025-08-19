import Title from "../components/Title";
import Button from "../components/Button";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ethers } from "ethers";
import { callContractFunction } from "../config/conection";

export default function Ganancias({ contracts, account }) {
  const headers = ["#", "Curso", "Ingresos", "Suscriptores"];
  
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [ganancias, setGanancias] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // buscar los cursos
  useEffect(() => {
    const load = async () => {
      if (!contracts?.ContratoCurso) return;
      setLoading(true);
      setErr("");
      try {
        const data = await callContractFunction(contracts, "ContratoCurso", "obtenerCursosPorProfesor", [account]);

        // `lista` es un array de structs: { id, titulo, descripcion, precio, profesor, inscritosCount }
        const parsed = (data || [])
          // opcional: filtra huecos si existieran
          .filter(c => c && (c.id?._isBigNumber || c.id))
          .map(c => ({
            id: c.id._isBigNumber ? c.id.toNumber() : Number(c.id),
            Curso: c.titulo,
            Ingresos: `${(c.inscritosCount._isBigNumber ? c.inscritosCount.toNumber() : Number(c.inscritosCount)) * (Number(ethers.utils.formatEther(c.precio)).toFixed(2))} ETH`,
            Suscriptores: c.inscritosCount._isBigNumber ? c.inscritosCount.toNumber() : Number(c.inscritosCount),
          }));

        setCursos(parsed);
      } catch (error) {
        console.error(error);
        setErr(error?.message || "Error al cargar cursos");
        if (error?.data?.message) {
          setErr(error.data.message); 
        } else if (error?.error?.data?.message) {
          setErr(error.error.data.message);
        } else if (error?.reason) {
          setErr(error.reason); 
        } else {
          setErr(error.message || "Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [contracts, account, navigate]);

  // buscar la ganancia total
  useEffect(() => {
    const load = async () => {
      if (!contracts?.ContratoFinanzas) return;
      try {
        const data = await callContractFunction(contracts, "ContratoFinanzas", "obtenerGananciasProfesor");
        const ethValue = ethers.utils.formatEther(data);
        setGanancias(Number(ethValue).toFixed(2));
      } catch (error) {
        console.log(error);
      } finally {
        
      }
    };
    load();
  }, [contracts]);

  // retirar fondos
  const retirarFondos = async () => {
    if (!contracts?.ContratoFinanzas) return;
    try {
        const data = await callContractFunction(contracts, "ContratoFinanzas", "retirarGanancias");
      } catch (e) {
        console.error(e);
      } finally {
        
      }
  }

  // Filtrar cursos según la barra de filtro
  const filteredCursos = cursos.filter(curso =>
    curso.Curso.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App bg-dark-gray">
      <div className="App-header container p-4 justify-content-start">
        <div className="row m-0 mb-4 w-100">
          <Title title="Ganancias por cursos" />
          <div className="text-start card-dapp mt-4">
            <div className="container px-4 py-2">
              <p className='tx-md m-0'>Fondos sin retirar: {ganancias ? ganancias : "0.00"} ETH</p>
            </div>
          </div>
        </div>
        <div className="row m-0 mb-4 w-100">
          <div className="text-start card-dapp">
            <div className="container px-4 py-2">
              <Button text={"Retirar fondos"} classes={"btn-dapp btn-dapp-aqua tx-sm"} onClick={() => retirarFondos()} />
              {loading && <p className="tx-sm text-white">Buscando cursos…</p>}
              {err && <p className="tx-sm tx-purple">{err}</p>}
              {!loading && !err && cursos.length === 0 && (
                <p className="tx-sm tx-purple">No hay cursos con ganancias.</p>
              )}
              {cursos.length > 0 && (
                <>
                  <div className="mb-3">
                    <label for="curso" className="tx-sm">Buscar:</label>
                    <input type="text" className="form-control" id="curso" placeholder="Nombre del curso" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                  <Table headers={headers} rows={filteredCursos} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
