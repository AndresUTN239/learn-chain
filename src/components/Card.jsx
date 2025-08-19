import Button from "./Button";

export default function Card({ title, text, img, side = "start", orientation = "horizontal", textDirection = "center", layout = "col-12", price = null, subscribers = null, onClick = null, button = null }) {
  const isHorizontal = orientation === "horizontal";

  // Orden horizontal
  const textOrder = side === "start" ? "order-sm-1" : "order-sm-2";
  const imgOrder = side === "start" ? "order-sm-2" : "order-sm-1";

  // Orden vertical
  const textOrderV = side === "start" ? "order-2" : "order-1";
  const imgOrderV = side === "start" ? "order-1" : "order-2";

  // Clases dinámicas si es clickeable
  const cardClass = `${onClick ? "card-button-dapp" : "card-dapp"} w-100 h-100 d-flex flex-column justify-content-between ${onClick ? "card-clickable" : ""}`;

  // Clases en textos
  const hClass = `fw-bold tx-md text-${textDirection}`;
  const pClass = `tx-sm text-${textDirection}`;

  return (
    <div className={`${layout} h-100`}>
      <div className={cardClass} onClick={onClick}>
        {/* Contenido principal */}
        {img ? (
          <div className={`row align-items-center text-center ${isHorizontal ? "" : "flex-column"}`}>
            <div className={`col-sm-7 p-4 ${isHorizontal ? textOrder : textOrderV}`}>
              {title && <p className={hClass}>{title}</p>}
              {text && <p className={pClass}>{text}</p>}
            </div>

            <div className={`col-sm-5 p-0 ${isHorizontal ? imgOrder : imgOrderV}`}>
              <img className="img-fluid w-100" src={img} alt={"..."} style={{ objectFit: "cover", height: "100%" }} />
            </div>
          </div>
        ) : (
          <div className="row h-100 d-flex justify-content-center align-items-center">
            <div className="col-12 p-4 text-center">
              {title && <p className={hClass}>{title}</p>}
              {text && <p className={pClass}>{text}</p>}
            </div>
          </div>
        )}

        {/* Información inferior */}
        {(price || subscribers) && (
          <div className={`${onClick ? "" : "card-dapp-footer"} mt-auto p-3 d-flex justify-content-between`}>
            {price !== null && <span className="fw-bold tx-sm">Precio: {price}</span>}
            {button && (
              <Button text={"Comprar"} onClick={button} classes={"btn-dapp btn-dapp-purple tx-sm"} />
            )}
            {subscribers !== null && <span className="tx-sm">Suscriptores: {subscribers}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
