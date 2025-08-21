import { Link } from "react-router-dom";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { callContractFunction } from "../config/conection";
import { useState } from "react";
import Modal from "../components/Modal";

function Nav({ contracts, account, rol, usuario }) {
  const navigate = useNavigate();

  // pasar a ser profesor
  const cambiarRol = async () => {
    if (!contracts?.ContratoRegistro) return;
    try {
        const data = await callContractFunction(contracts, "ContratoRegistro", "actualizarUsuario", [2, usuario]);
      } catch (e) {
        console.error(e);
        
      } finally {
        
      }
  }

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const openModal = (title, body) => {
    setModalContent({ title, body });
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  return (
    <div className="navbar-nav ms-auto">
      <Link className="nav-link m-auto" to="/">
        Inicio
      </Link>
      {rol === 1 && (
        <>
          <Link className="nav-link m-auto" to="/listaCursos">
            Tus cursos
          </Link>
          <Button text={"Ver usuario"} classes={"btn-dapp btn-dapp-aqua"} onClick={() => openModal("Tu usuario", 
            <div className="tx-sm">
              <p><strong>Address:</strong> {account}</p>
              <p><strong>Nombre:</strong> {usuario}</p>
            </div>
          )} />
        </>
      )}
      {rol === 0 && (
        <div className="nav-link p-0 m-auto mx-1" to="/login">
          <Button text={"Registrate"} classes={"btn-dapp btn-dapp-outline-purple"} onClick={() => navigate("/registrarUsuario")} />
        </div>
      )}
      {rol === 1 && (
        <div className="nav-link p-0 m-auto mx-1" to="/teach">
          <Button text={"Enseñar"} classes={"btn-dapp btn-dapp-outline-aqua"} onClick={() => cambiarRol()} />
        </div>
      )}
      {rol === 2 && (
        <div className="nav-link p-0 m-auto mx-1" to="/teach">
          <Button text={"Crear cursos"} classes={"btn-dapp btn-dapp-outline-aqua"} onClick={() => navigate("/admin/home")} />
        </div>
      )}
      {/* Modal */}
      <Modal show={showModal} onClose={closeModal} title={modalContent.title}>
        <p className="mb-0">{modalContent.body}</p>
      </Modal>
    </div>
  );
}

export default Nav;
