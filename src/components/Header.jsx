import Logo from './Logo';
import Nav from './Nav';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gray header-dapp">
      <div className="container">
        <Logo />
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <Nav />
        </div>
      </div>
    </nav>
  );
}

export default Header;
