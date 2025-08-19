import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function LayoutPublic({ contracts, account, rol }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header contracts={contracts} account={account} rol={rol} />
      <main className="flex-fill">
        <div className="container-fluid p-0">
          {/* Aquí se inyectan las páginas hijas */}
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LayoutPublic;
