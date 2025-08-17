import logo from "../logo.svg";
import '../App.css';

export default function Home({setShowLayout}) {
  setShowLayout(true);

  return (
    <div className="App bg-dark-gray">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
      </header>
    </div>
  )
}