import './App.css';
import CONNECT_WALLET from './components/CONNECT_WALLET.js';
//import LATEST_BLOCK from './components/LATEST_BLOCK.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          TESTNET MARKETPLACE
        </p>
        <header className="App-header2">
          Buy stuff!
        </header>
        <br/>
        <header className="App-header2">
          Sell stuff!
        </header>
        <br/>
        <header className="App-header2">
          <CONNECT_WALLET />
        </header>
        {/* <br/>
        <header className="App-header2">
          <LATEST_BLOCK />
        </header> */}
      </header>

    </div>
  );
}

export default App;
