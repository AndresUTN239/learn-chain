import { NavLink } from "react-router-dom";
import { LiaBookReaderSolid } from "react-icons/lia";
import Button from "./Button";
import { useState } from "react";
import Modal from "../components/Modal";

function Sidebar({ rol, loading, err, account, usuario }) {
  const linkClass = ({ isActive }) => `nav-link btn-sidebar-dapp-outline ${isActive ? "active" : ""}`;

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const openModal = (title, body) => {
    setModalContent({ title, body });
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  return (
    <div className="sidebar-dapp text-white vh-100 p-3" style={{ minWidth: "220px" }}>
      <div className="navbar-brand d-flex align-items-center tx-md tx-bold mb-4">
        <LiaBookReaderSolid className="me-2" size={28} />
        <span>LearnChain</span>
      </div>
      <ul className="nav flex-column">
        {loading && <li className="nav-item tx-md text-white">Cargando…</li>}
        {err && <li className="nav-item tx-md tx-purple">{err}</li>}
        {rol === 2 && !loading && (
          <>
            <li className="nav-item">
              <NavLink to="/admin/cursos" className={linkClass}>
                Cursos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/ganancias" className={linkClass}>
                Ganancias
              </NavLink>
            </li>
            <li className="nav-item">
              <Button text={"Ver usuario"} classes={"btn-dapp btn-dapp-aqua"} onClick={() => openModal("Tu usuario", 
                <div className="tx-sm">
                  <p><strong>Address:</strong> {account}</p>
                  <p><strong>Nombre:</strong> {usuario}</p>
                </div>
              )} />
            </li>
          </>
        )}
        {rol !== 2 && !loading && (
          <>
            <li className="nav-item">
              <NavLink to="/" className={linkClass}>
                Volver
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {/* Modal */}
      <Modal show={showModal} onClose={closeModal} title={modalContent.title}>
        <p className="mb-0">{modalContent.body}</p>
      </Modal>
    </div>
  );
}

export default Sidebar;
