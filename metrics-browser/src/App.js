import './App.css';
import SeriesView from './SeriesView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <text style={{fontSize: 40}}>
          MongoDB Metrics Browser
        </text>
        <text style={{fontSize: 15}}>
          show metrics from MongoDB Measurements API
        </text>
      </header>
      <SeriesView />
    </div>
  );
}

export default App;
