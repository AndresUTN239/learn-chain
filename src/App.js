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
import CursosEstudiante from "./pages/CursosEstudiante.jsx";
import "./css/style.css";
import "./css/backgroundAnimated.css";
import "./App.css"

function App() {
  // variables de contratos
  const [account, setAccount] = useState(""); // address/wallet actual conectada desde MetaMask
  const [chainId, setChainId] = useState(null); // ID de la red (1337)
  const [contracts, setContracts] = useState({}); // los contratos
  const [rol, setRol] = useState(""); // rol del usuario actual
  const [usuario, setUsuario] = useState("");

  // estados de carga
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");


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
    setLoading(true);
    setErr("");
    try {
      const data = await callContractFunction(contracts, "ContratoRegistro", "obtenerRol", [account]);
      setRol(Number(data));
    } catch (e) {
      setRol(0);
      setErr("Sin rol");
    } finally {
      setLoading(false);
    }
  }

  // obtener el rol
  const obtenerUsuario = async () => {
    if (!contracts?.ContratoRegistro) return;
    try {
      const data = await callContractFunction(contracts, "ContratoRegistro", "obtenerPerfil", [account]);
      setUsuario(data[3]);
    } catch (e) {
      setUsuario("");
    }
  }

  useEffect(() => {
    if (contracts?.ContratoRegistro && account) {
      obtenerRol();
      obtenerUsuario();
    }
  }, [contracts, account]);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<LayoutPublic contracts={contracts} account={account} rol={rol} loading={loading} err={err} usuario={usuario} />}>
          <Route path="/" element={<Home contracts={contracts} />} />
          <Route path="/about" element={<About />} />
          <Route path="/curso" element={<Curso contracts={contracts} rol={rol} />} />
          <Route path="/listaCursos" element={<CursosEstudiante contracts={contracts} />} />
        </Route>

        {/* Rutas de logueo y registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/registrarUsuario" element={<RegistrarUsuario contracts={contracts} loading={loading} err={err} />} />

        {/* Rutas admin */}
        <Route path="/admin" element={<LayoutAdmin rol={rol} account={account} usuario={usuario} />}>
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="cursos" element={<ListaCursos contracts={contracts} account={account} rol={rol} />} />
          <Route path="agregarCurso" element={<AgregarCurso contracts={contracts} rol={rol} />} />
          <Route path="ganancias" element={<Ganancias contracts={contracts} account={account} rol={rol} />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
