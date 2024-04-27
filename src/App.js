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
  <div className="AppHome">
    <div className='FUNNYBOX'>
      <header className="BACKGROUND">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h2 className="TITLE"></h2>
        <Link to="/buy-items">
          <button className="buy-btn">Buy Items</button>
        </Link>
        <Link to="/sell-items">
          <button className="sell-btn">Sell Items</button>
        </Link>
        <header className="ETH">
          <CONNECT_WALLET />
        </header>
      </header>
    </div>
    <Footer />
  </div>;

const Footer = () =>
  <header className="FOOTER">
    © Daniel Yowell, 2024-2024
  </header>

export default App;