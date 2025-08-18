import Button from "./Button";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Modal({ show, onClose, title, children }) {
  if (!show) return null; // No renderiza si show es false

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content card-dapp">
          <div className="modal-header modal-dapp-header">
            <p className="modal-title tx-bold tx-md tx-color-white">{title}</p>
          </div>
          <div className="modal-body modal-dapp-body tx-sm tx-color-white">{children}</div>
          <div className="modal-footer modal-dapp-footer">
            <Button classes={"btn-dapp btn-dapp-purple"} text={"Cerrar"} onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
