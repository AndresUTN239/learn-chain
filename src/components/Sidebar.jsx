import { NavLink } from "react-router-dom";
import { LiaBookReaderSolid } from "react-icons/lia";

function Sidebar() {
  const linkClass = ({ isActive }) => `nav-link btn-sidebar-dapp-outline ${isActive ? "active" : ""}`;

  return (
    <div className="sidebar-dapp text-white vh-100 p-3" style={{ minWidth: "220px" }}>
      <div className="navbar-brand d-flex align-items-center tx-md tx-bold mb-4">
        <LiaBookReaderSolid className="me-2" size={28} />
        <span>LearnChain</span>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </li>
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
          <NavLink to="/login" className={linkClass}>
            Cerrar sesión
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
