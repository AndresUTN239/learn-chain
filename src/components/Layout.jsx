import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, showLayout }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {showLayout ? <Header /> : <></>}
      <main className="flex-fill">
        <div className="container-fluid p-0">{children}</div>
      </main>
      {showLayout ? <Footer /> : <></>}
    </div>
  );
}

export default Layout;
