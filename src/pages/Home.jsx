import React, { useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const openModal = (title, body) => {
    setModalContent({ title, body });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="App bg-dark-gray">
      <div className="App-header container">
        <div className="row gy-4 w-100">
          <div className="col-12 col-md-6 col-lg-4 d-flex">
            <Card
              title="Curso React"
              text="Aprende React paso a paso"
              img="/img/imagen-dapp-1.jpg"
              side="start"
              orientation="vertical"
              price="4 ETH"
              subscribers={120}
              onClick={() => navigate("/curso")}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 d-flex">
            <Card
              title="Curso NodeJS"
              text="Backend con Node"
              img="/img/node.png"
              side="start"
              orientation="vertical"
              price="2 ETH"
              subscribers={75}
            />
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
