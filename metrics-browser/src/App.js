import './App.css';
import Chart from './Chart';
import SeriesView from './SeriesView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Metrics Browser
        </p>
      </header>
      <label>Public API: </label>
      <input type="text" id="publicAPI" name="publicAPI"></input>
      <label>Public Key: </label>
      <input type="text" id="publicKey" name="publicKey"></input>
      <label>Private Key: </label>
      <input type="text" id="privateKey" name="privateKey"></input>
      <button>get metrics</button>
      <SeriesView />
      <Chart />
    </div>
  );
}

export default App;
