import logo from "../logo.svg";
import Button from "../components/Button";

export default function About() {
  return (
    <div className="App bg-dark-gray">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Está en desarrollo</p>
        <Button text={"¡Has click aquí!"} classes={"btn-dapp btn-dapp-aqua"} />
        <Button text={"Cancelar"} classes={"btn-dapp btn-dapp-purple"} />
      </div>
    </div>
  );
}
