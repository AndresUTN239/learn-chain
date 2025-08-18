import Card from "../components/Card";

export default function Curso() {
  return (
    <div className="App bg-dark-gray">
      <div className="App-header justify-content-start">
        <div className="w-100 bg-aqua p-4">
          <div className="mx-auto container">
            <Card
              title="Curso React"
              text="Aprende React paso a paso"
              img="/img/imagen-dapp-1.jpg"
              side="start"
              orientation="horizontal"
              textDirection="start"
              price="4 ETH"
              subscribers={120}
              button={true}
            />
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
            <p className="tx-md tx-bold text-white">Ver otros cursos</p>
            {/* Poner los cursos */}
          </div>
        </div>
      </div>
    </div>
  );
}
