import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//import React from 'react';
import CONNECT_WALLET from './components/CONNECT_WALLET.js';
import CreateItem from './CreateItem';
//import LATEST_BLOCK from './components/LATEST_BLOCK.js';
import ItemList from './ItemList';
import NewPage from './NewPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-items" element={<ItemList />} />
          <Route path="/sell-item" element={<CreateItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const Home = () =>
  <div className="App">
    <header className="App-header">
      <p>
        TESTNET MARKETPLACE
      </p>
      <Link to="/buy-items">
        <button>Buy Items</button>
      </Link>
      <br />
      <header className="App-header2">
        <CONNECT_WALLET />
      </header>
    </header>
  </div>;

export default App;