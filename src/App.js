import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getContract, connectWallet, switchToGanache } from "./config/conection.js";
import Layout from "./components/Layout"
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const [account, setAccount] = useState(""); // address/wallet actual conectada desde MetaMask
  const [chainId, setChainId] = useState(null); // ID de la red (1337)
  const [contracts, setContracts] = useState({}); // los contratos

  const connect = async () => {
    try {
      // conectar a MetaMask
      const { account, chainId } = await connectWallet();
      setAccount(account);
      setChainId(chainId);

      // en caso de no ser a la red correcta, forzárlo a la red correcta (1337)
      if (chainId !== 1337) {
        await switchToGanache();
      }

      // obtener el contrato con el nombre del contrato y el ID de la red
      const loadContracts = {
        registro: getContract("ContratoRegistro", chainId),
        acceso: getContract("ContratoControlAcceso", chainId),
        curso: getContract("ContratoCursos", chainId),
        finanza: getContract("ContratoFinanzas", chainId),
        auditoria: getContract("ContratoAuditoria", chainId),
      }
      setCalculatorContract(loadContracts);
    } catch (err) {
      console.error("Error de conexión:", err);
    }
  };

  // un 'useEffect' que se ejecuta si se cambia la red o cuenta en MetaMask (reinicia los estados para evitar errores)
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => window.location.reload());
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
