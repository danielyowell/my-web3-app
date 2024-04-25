import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import CONNECT_WALLET from './components/CONNECT_WALLET.js';
import CreateItem from './CreateItem';
import ItemList from './ItemList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-items" element={<ItemList />} />
          <Route path="/sell-items" element={<CreateItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const Home = () =>
  <div className="App">
    <header className="App-header">
      <h2>
        TESTNET MARKETPLACE
      </h2>
      <Link to="/buy-items">
        <button className="buy-btn">Buy Items</button>
      </Link>
      <br />
      <Link to="/sell-items">
        <button className="sell-btn">Sell Items</button>
      </Link>
      <br />
      <header className="App-header2">
        <CONNECT_WALLET />
      </header>
    </header>
    <Footer />
  </div>;

const Footer = () =>
  <header className="App-footer">
    © Daniel Yowell, 2024-2024
  </header>

export default App;