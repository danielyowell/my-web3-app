import './App.css';
import logo from './imgs/checker.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import CONNECT_WALLET from './components/CONNECT_WALLET.js';
import CreateItem from './CreateItem';
import ItemList from './ItemList';
import title from './imgs/title.png';
import title2 from './imgs/title2.png';
import account from './components/CONNECT_WALLET.js';
import accounts from './components/CONNECT_WALLET.js';

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
    //  className="App"
    <div>
      <header>
        <div className="box-container">
        <img src={title2} alt="test" className="box-image" />
          <br /><br /><br />
          <Link to="/buy-items">
          <button className="b1">Buy Items</button>
          </Link>
          <br />
          <Link to="/sell-items">
          <button className="b1">Sell Items</button>
          </Link>
          <br />
          <Link to={CONNECT_WALLET}>
          <button className="b1">Connect Wallet</button>
          </Link>
          <br />
          <div className="wallet">
          {account ? '(Wallet successfully connected)' : '(No wallet connected)'}
            </div>
        </div>
      </header>
    </div>

export default App;