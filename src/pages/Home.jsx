import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { callContractFunction } from "../config/conection";
import Card from "../components/Card";
import Modal from "../components/Modal";

export default function Home({ contracts }) {
  const navigate = useNavigate();

  // estados de contratos
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const openModal = (title, body) => {
    setModalContent({ title, body });
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const load = async () => {
      if (!contracts?.ContratoCurso) return; // aún no cargan
      setLoading(true);
      setErr("");
      try {
        const lista = await callContractFunction(contracts, "ContratoCurso", "obtenerCursos");

        // `lista` es un array de structs: { id, titulo, descripcion, precio, profesor, inscritosCount }
        const parsed = (lista || [])
          // opcional: filtra huecos si existieran
          .filter(c => c && (c.id?._isBigNumber || c.id))
          .map(c => ({
            id: c.id._isBigNumber ? c.id.toNumber() : Number(c.id),
            title: c.titulo,
            text: c.descripcion,
            price: `${Number(ethers.utils.formatEther(c.precio)).toFixed(2)} ETH`,
            subscribers: c.inscritosCount._isBigNumber
              ? c.inscritosCount.toNumber()
              : Number(c.inscritosCount),
            profesor: c.profesor,
            // Puedes decidir la imagen según el título:
            img: "/img/imagen-dapp-1.jpg",
          }));

        setCursos(parsed);
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Error al cargar cursos");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [contracts]);

  return (
    <div className="App bg-dark-gray">
      <div className="App-header container">
        {loading && <p className="tx-md text-white">Cargando cursos…</p>}
        {err && <p className="tx-md tx-purple">{err}</p>}
        {!loading && !err && cursos.length === 0 && (
          <p className="tx-md tx-purple">Aún no hay cursos publicados.</p>
        )}
        <div className="row gy-4 w-100">
          {cursos.map((curso) =>(
            <div className="col-12 col-md-6 col-lg-4 d-flex" key={curso.id}>
              <Card
                title={curso.title}
                text={curso.text}
                img={curso.img}
                side="start"
                orientation="vertical"
                price={curso.price}
                subscribers={curso.subscribers}
                onClick={() => navigate(`/curso?id=${curso.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      <Modal show={showModal} onClose={closeModal} title={modalContent.title}>
        <p className="mb-0">{modalContent.body}</p>
      </Modal>
    </div>
  );
}
