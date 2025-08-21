import Title from "../components/Title";
import Button from "../components/Button";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { callContractFunction } from "../config/conection";
import Modal from "../components/Modal";

export default function ListaCursos({ contracts, account, rol }) {
  const headers = ["ID", "Curso", "Precio", "Suscriptores", "Opciones"];

  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: null });
  const openModal = (title, body) => {
    setModalContent({ title, body });
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const obtenerEstudiantes = async (c) => {
    try {
      const estudiantes = await callContractFunction(contracts, "ContratoFinanzas", "obtenerEstudiantesInscritos", [c.id._isBigNumber ? c.id.toNumber() : Number(c.id)]);
      openModal(
        "Estudiantes inscritos",
        estudiantes.length > 0 ? (
          <ul className="list-group table-dapp">
            {estudiantes.map((address, index) => (
              <li key={index} className="list-group-item tx-sm bg-gray border-0 text-white tx-sm text-start">
                {address}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay estudiantes inscritos.</p>
        )
      );
    } catch (e) {
      openModal("Error", <p>{e.message}</p>);
    }
  }

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
            ID: c.id._isBigNumber ? c.id.toNumber() : Number(c.id),
            Curso: c.titulo,
            Descripcion: c.description,
            Precio: `${Number(ethers.utils.formatEther(c.precio)).toFixed(2)} ETH`,
            Suscriptores: c.inscritosCount._isBigNumber
              ? c.inscritosCount.toNumber()
              : Number(c.inscritosCount),
            Opciones: 
            <div className="d-flex gap-2">
              <Button text={"Editar"} classes={"btn-dapp btn-dapp-purple tx-sm"} onClick={() => navigate(`/admin/agregarCurso?id=${c.id._isBigNumber ? c.id.toNumber() : Number(c.id)}`)} />
              <Button text={"Detalles"} classes={"btn-dapp btn-dapp-aqua tx-sm"} onClick={() => openModal("Detalles del curso", 
                <div className="tx-sm">
                  <p><strong>Curso:</strong> {c.titulo}</p>
                  <p><strong>Descripción:</strong> {c.descripcion}</p>
                  <p><strong>Precio:</strong> {Number(ethers.utils.formatEther(c.precio)).toFixed(2)} ETH</p>
                  <p><strong>Suscriptores:</strong> {c.inscritosCount.toNumber()}</p>
                </div>
              )} />
              <Button text={"Estudiantes"} classes={"btn-dapp btn-dapp-aqua tx-sm"} onClick={() => obtenerEstudiantes(c)} />
            </div>
              
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

  // Filtrar cursos según la barra de filtro
  const filteredCursos = cursos.filter(curso =>
    curso.Curso.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App bg-dark-gray">
      <div className="App-header container p-4 justify-content-start">
        <div className="row m-0 mb-4 w-100">
          <Title title="Lista de cursos" />
        </div>
        <div className="row m-0 mb-4 w-100">
          <div className="text-start card-dapp">
            <div className="container px-4 py-2">
              {rol === 2 && (
                <Button text={"Agregar curso"} classes={"btn-dapp btn-dapp-aqua tx-sm"} onClick={() => navigate("/admin/agregarCurso")} />
              )}
              {loading && <p className="tx-sm text-white">Buscando cursos…</p>}
              {err && <p className="tx-sm tx-purple">{err}</p>}
              {!loading && !err && cursos.length === 0 && (
                <p className="tx-sm tx-purple">No hay cursos creados.</p>
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
      {/* Modal */}
      <Modal show={showModal} onClose={closeModal} title={modalContent.title}>
        <p className="mb-0">{modalContent.body}</p>
      </Modal>
    </div>
  );
}
