import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill">
        <div className="container my-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
