import Title from "../components/Title";
import Button from "../components/Button";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { callContractFunction } from "../config/conection";
import Modal from "../components/Modal";

export default function CursoEstudiante({ contracts }) {
  const headers = ["ID", "Curso", "Precio", "Suscriptos", "Profesor"];

  const [dataTable, setDataTable] = useState([]); // toda la información a mostrar en la tabla
  const [idCursos, setIdCursos] = useState([]); // el id de los cursos
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!contracts?.ContratoFinanzas || !contracts?.ContratoCurso || !contracts?.ContratoRegistro) return;
      setLoading(true);
      setErr("");
      try {
        // Obtener IDs de cursos comprados
        const ids = await callContractFunction(contracts, "ContratoFinanzas", "obtenerCursosDeEstudiante");

        const parsedIds = (ids || []).map((c) =>
          c._isBigNumber ? c.toNumber() : Number(c)
        );
        setIdCursos(parsedIds);

        // Obtener info completa de cada curso desde ContratoCurso
        const cursosData = await Promise.all(
          parsedIds.map(async (id) => {
            const dataCurso = await callContractFunction(contracts, "ContratoCurso", "obtenerCurso", [id]);
            const dataUsuario = await callContractFunction(contracts, "ContratoRegistro", "obtenerPerfil", [dataCurso[4]]);

            return {
              ID: dataCurso[0].toNumber(),
              Curso: dataCurso[1],
              Descripcion: dataCurso[2],
              Precio: ethers.utils.formatEther(dataCurso[3].toString()), // precio en ETH
              Profesor: dataUsuario[3], // [0] = id, [1] = rol, [2] = si existe o no, [3] = nombre
              Suscriptos: dataCurso[5].toNumber(),
            };
          })
        );

        setDataTable(cursosData);
      } catch (error) {
        console.error(error);
        setErr(error?.reason || error?.message || "Error al cargar cursos");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [contracts]);

  // Filtrar cursos según la barra de filtro
  const filteredData = dataTable.filter(item =>
    item.Curso.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App bg-dark-gray">
      <div className="App-header container justify-content-start">
         <div className="row m-0 my-4 w-100">
            <Title title="Cursos comprados" />
          </div>
          <div className="row m-0 mb-4 w-100">
            <div className="text-start card-dapp">
              <div className="container px-4 pt-2 pb-4">
                {loading && <p className="tx-sm text-white">Buscando cursos…</p>}
                {err && <p className="tx-sm tx-purple">{err}</p>}
                {!loading && !err && dataTable.length === 0 && (
                  <p className="tx-sm tx-purple">No hay cursos comprados.</p>
                )}
                {dataTable.length > 0 && (
                  <>
                    <div className="mb-3">
                      <label for="curso" className="tx-sm">Buscar:</label>
                      <input type="text" className="form-control" id="curso" placeholder="Nombre del curso" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <Table headers={headers} rows={filteredData} />
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
