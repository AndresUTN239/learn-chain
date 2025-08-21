import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function LayoutAdmin({ rol, loading, err, account, usuario }) {
  return (
    <div className="d-flex">
      <Sidebar rol={rol} loading={loading} err={err} account={account} usuario={usuario} />
      <main className="flex-fill p-0">
        {/* Aquí se renderizan las páginas admin */}
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutAdmin;
