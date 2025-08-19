import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getContract, connectWallet, switchToGanache } from "./config/conection.js";
import { callContractFunction } from "./config/conection.js";
import LayoutPublic from "./components/LayoutPublic";
import LayoutAdmin from "./components/LayoutAdmin";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import Curso from "./pages/Curso";
import Dashboard from "./pages/Dashboard.jsx";
import ListaCursos from "./pages/ListaCursos.jsx";
import Ganancias from "./pages/Ganancias.jsx";
import AgregarCurso from "./pages/AgregarCurso.jsx";
import "./css/style.css";
import "./css/backgroundAnimated.css";
import "./App.css"

function App() {
  // variables de contratos
  const [account, setAccount] = useState(""); // address/wallet actual conectada desde MetaMask
  const [chainId, setChainId] = useState(null); // ID de la red (1337)
  const [contracts, setContracts] = useState({}); // los contratos
  const [rol, setRol] = useState("");

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
        ContratoRegistro: getContract("ContratoRegistro", chainId),
        ContratoControlAcceso: getContract("ContratoControlAcceso", chainId),
        ContratoCurso: getContract("ContratoCurso", chainId),
        ContratoFinanzas: getContract("ContratoFinanzas", chainId),
        ContratoAuditoria: getContract("ContratoAuditoria", chainId),
      }
      setContracts(loadContracts);
    } catch (err) {
      console.error("Error de conexión:", err);
    }
  };

  // un 'useEffect' que se ejecuta si se cambia la red o cuenta en MetaMask (reinicia los estados para evitar errores)
  useEffect(() => {
    connect();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => window.location.reload());
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, []);

  // obtener el rol
  const obtenerRol = async () => {
    
    if (!contracts?.ContratoRegistro) return;
    try {
        const data = await callContractFunction(contracts, "ContratoRegistro", "obtenerRol", [account]);
        console.log("rol:", data);
        setRol(Number(data));
      } catch (e) {
        setRol(0);
      } finally {
        console.log(rol);
      }
  }

  useEffect(() => {
    if (contracts?.ContratoRegistro && account) {
      obtenerRol();
    }
  }, [contracts, account]);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<LayoutPublic contracts={contracts} account={account} rol={rol} />}>
          <Route path="/" element={<Home contracts={contracts} />} />
          <Route path="/about" element={<About />} />
          <Route path="/curso" element={<Curso contracts={contracts} />} />
        </Route>

        {/* Rutas de logueo y registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/registrarUsuario" element={<RegistrarUsuario contracts={contracts} />} />

        {/* Rutas admin */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cursos" element={<ListaCursos contracts={contracts} account={account} />} />
          <Route path="agregarCurso" element={<AgregarCurso contracts={contracts} />} />
          <Route path="ganancias" element={<Ganancias contracts={contracts} account={account} />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
