import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function LayoutAdmin() {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-fill p-0">
        {/* Aquí se renderizan las páginas admin */}
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutAdmin;
