import Title from "../components/Title";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ethers } from "ethers";
import { callContractFunction } from "../config/conection";

export default function AgregarCurso({ contracts, rol }) {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const id = Number(params.get("id"));
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleNombre = (event) => {
    setNombre(event.target.value);
  }
  const handleDescripcion = (event) => {
    setDescripcion(event.target.value);
  }
  const handlePrecio = (event) => {
    setPrecio(event.target.value);
  }

  // crear/actualizar curso
  const guardarCurso = async () => {
    if (!contracts?.ContratoCurso) return;
    try {
        const precioETH = ethers.utils.parseEther(precio.toString());
        const content = !id ? [nombre, descripcion, precioETH] : [id, nombre, descripcion, precioETH]
        const data = await callContractFunction(contracts, "ContratoCurso", !id ? "crearCurso" : "editarCurso", content);
        console.log(data);
      } catch (e) {
        console.error(e);
        alert(e);
      } finally {
        
      }
  }

  // cargar datos del curso a editar
  useEffect(() => {
    const load = async () => {
      if (!contracts?.ContratoCurso || !id) return;
      setLoading(true);
      setErr("");
      try {
        const data = await callContractFunction(contracts, "ContratoCurso", "obtenerCurso", [id]);
        setNombre(data[1]);
        setDescripcion(data[2]);
        setPrecio(ethers.utils.formatEther(data[3]));
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Error al carga el curso");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [contracts, id]);

  return (
    <div className="App bg-dark-gray">
      <div className="App-header container p-4 justify-content-start">
        <div className="row m-0 mb-4 w-100">
          <Title title="Crear curso" />
        </div>
        <div className="row m-0 mb-4 w-100">
          <div className="text-start card-dapp">
            <div className="container px-4 py-2">
              <div className="row mb-3">
                <div className="col-6">
                  <label for="nombre" className="tx-sm">Nombre del curso:</label>
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre" value={nombre} onChange={handleNombre} disabled={loading} />
                </div>
                <div className="col-6">
                  <label for="precio" className="tx-sm">Precio:</label>
                  <input type="number" className={`form-control ${id ? "bg-dark text-white" : ""}`} id="precio" placeholder="ETH" value={precio} onChange={handlePrecio} disabled={loading || id} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <div class="mb-3">
                    <label for="descripcion" className="tx-sm">Descripción:</label>
                    <textarea className="form-control" id="descripcion" rows="3" placeholder="Una descripción breve" value={descripcion} onChange={handleDescripcion} disabled={loading}></textarea>
                  </div>
                </div>
              </div>
              {rol === 2 && (
                <div className="text-center justify-content-center">
                  <Button text={"Volver"} classes={"btn-dapp btn-dapp-outline-aqua tx-sm"} onClick={() => navigate("/admin/cursos")} />
                  <br/>
                  <Button text={!id ? "Crear curso" : "Guardar cambios"} classes={"btn-dapp btn-dapp-aqua tx-sm"} onClick={() => guardarCurso()} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
