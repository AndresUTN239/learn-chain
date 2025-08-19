import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ethers } from "ethers";
import { callContractFunction } from "../config/conection";

export default function Curso({ contracts }) {
  const [params] = useSearchParams();
  const id = Number(params.get("id"));
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [cursos, setCursos] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(false);
  const [errCursos, setErrCursos] = useState("");

  const navigate = useNavigate();

  // cargar el contenido del curso
  useEffect(() => {
    const load = async () => {
      if (!contracts?.ContratoCurso || !id) return;
      setLoading(true);
      setErr("");
      try {
        const data = await callContractFunction(contracts, "ContratoCurso", "obtenerCurso", [id]);
        // data es un array/obj con los campos del struct
        const obj = {
          id: data[0].toNumber(),
          title: data[1],
          text: data[2],
          price: `${Number(ethers.utils.formatEther(data[3])).toFixed(2)} ETH`,
          weiPrice: data[3],
          profesor: data[4],
          subscribers: data[5].toNumber(),
        };
        setCurso(obj);
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Error al carga el curso");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [contracts, id]);

  // cargar otros cursos en la parte inferior de la página
  useEffect(() => {
    const load = async () => {
      if (!contracts?.ContratoCurso) return;
      setLoadingCursos(true);
      setErrCursos("");
      try {
        const lista = await callContractFunction(contracts, "ContratoCurso", "obtenerCursos");
        console.log(lista);

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
            img: "/img/imagen-dapp-1.jpg",
          }));

        setCursos(parsed);
      } catch (e) {
        console.error(e);
        setErrCursos(e?.message || "Error al cargar cursos");
      } finally {
        setLoadingCursos(false);
      }
    };
    load();
  }, [contracts]);

  // comprar curso
  const comprarCurso = async (id, precio) => {
    console.log(id, precio);
    if (!contracts?.ContratoFinanzas) return;
    try {
        const data = await callContractFunction(contracts, "ContratoFinanzas", "comprarCurso", [id], {value: precio});
        console.log(data);
      } catch (e) {
        console.error(e);
        
      } finally {
        
      }
  }

  return (
    <div className="App bg-dark-gray">
      <div className="App-header justify-content-start">
        <div className="w-100 bg-aqua p-4">
          <div className="mx-auto container">
            {loading && <p className="tx-md text-white">Cargando información...</p>}
            {err && <p className="tx-md tx-purple">{err}</p>}
            {!loading && !err && curso ? (
              <Card
                title={curso.title}
                text={curso.text}
                img="/img/imagen-dapp-1.jpg"
                side="start"
                orientation="horizontal"
                textDirection="start"
                price={curso.price}
                subscribers={curso.subscribers}
                button={() => comprarCurso(curso.id, curso.weiPrice)}
              />
            ) : (
              !loading && !err && <p className="tx-md tx-purple">Este curso no está disponible</p>
            )}
          </div>
        </div>
        <div className="container mt-4">
          <div className="row text-start w-100 mb-4">
            <p className="tx-md tx-bold text-white">
              Información General sobre los Cursos
            </p>
            <p className="tx-sm text-white">
              En nuestra plataforma encontrarás una amplia variedad de cursos
              diseñados para adaptarse a tus necesidades de aprendizaje. Cada
              curso está creado por instructores especializados en su área,
              garantizando contenido actualizado, práctico y accesible para
              todos los niveles: desde principiantes hasta profesionales que
              buscan perfeccionar sus habilidades.
            </p>
          </div>
          <div className="row text-start w-100 mb-4">
            <p className="tx-md tx-bold text-white">¿Qué ofrecemos?</p>
            <p className="tx-sm text-white">
              <span className="tx-bold">Diversidad de temas:</span> Tecnología, negocios, arte, salud, desarrollo
              personal y mucho más.
              <br />
              <span className="tx-bold">Acceso flexible:</span> Aprende a tu ritmo, desde cualquier lugar y en
              cualquier momento.
              <br />
              <span className="tx-bold">Contenido actualizado:</span> Cursos que se adaptan a las tendencias y
              cambios del mercado.
              <br />
              <span className="tx-bold">Certificados de finalización:</span> Obtén reconocimiento por tus logros
              y compártelos en tu perfil profesional.
              <br />
              <span className="tx-bold">Comunidad activa:</span> Interactúa con instructores y estudiantes,
              comparte experiencias y resuelve dudas.
            </p>
          </div>
          <div className="row text-start w-100 mb-4">
            <p className="tx-md tx-bold text-white">
              Beneficios de aprender aquí
            </p>
            <p className="tx-sm text-white">
              Aprendizaje práctico con ejemplos y recursos descargables.
              <br />
              Avanza paso a paso con lecciones organizadas y fáciles de seguir.
              <br />
              Oportunidad de crecimiento personal y profesional.
              <br />
              Nuestra misión es brindarte las herramientas necesarias para que
              alcances tus metas, sin importar si quieres aprender algo nuevo,
              reforzar tus conocimientos o impulsar tu carrera.
            </p>
          </div>
          <div className="row text-start w-100 mb-4">
            <p className="tx-md tx-bold text-white mb-0">Ver otros cursos</p>
              {loadingCursos && <p className="tx-md text-white">Cargando cursos…</p>}
              {errCursos && <p className="tx-md tx-purple">{errCursos}</p>}
              {!loadingCursos && !errCursos && cursos.length === 0 && (
                <p className="tx-md tx-purple">Aún no hay cursos publicados.</p>
              )}
              <div className="row gy-4 w-100">
                {cursos
                  .filter((c) => c.id !== id)
                  .map((curso) =>(
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
        </div>
      </div>
    </div>
  );
}
