import logo from "../logo.svg";
import "../App.css";
import Button from "../components/Buttom";

export default function About({setShowLayout}) {
  setShowLayout(true);

  return (
    <div className="App bg-dark-gray">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Está en desarrollo</p>
        <Button text={"¡Has click aquí!"} classes={"btn-dapp btn-dapp-aqua"} />
        <Button text={"Cancelar"} classes={"btn-dapp btn-dapp-purple"} />
      </header>
    </div>
  );
}
