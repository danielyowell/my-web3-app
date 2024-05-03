import './App.css';
import './css/HomePage.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import app_logo from './imgs/app_logo.png';

import CreateItem from './components/CreateItem';
import ItemList from './components/ItemList';
import PurchasePage from './components/PurchasePage.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-items" element={<ItemList />} />
          <Route path="/sell-items" element={<CreateItem />} />
          <Route path="/purchase" element={<PurchasePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const Home = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [userAddress, setUserAddress] = React.useState('');

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request access to user's MetaMask wallet
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setUserAddress(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  console.log('HOME');

  return (
    <div>
      <div>
        <div className="HOME_MENU">
          <img src={app_logo} alt="test" className="LOGO_SIZE" />
          <br /><br /><br />
          <Link to="/buy-items">
            <button onClick={() => console.log('Buy Items button clicked')}>Buy Items</button>
          </Link>
          <br />
          <Link to="/sell-items">
            <button onClick={() => console.log('Sell Items button clicked')}>Sell Items</button>
          </Link>
          <br />
          <button className='cw_button' onClick={connectToMetaMask} disabled={isConnected}>
            {isConnected ? 'Connect Wallet' : 'Connect Wallet'}
          </button>
          {isConnected ? 
          <p className='wallet'>Wallet Address: {userAddress.slice(0, 5) + '...'  + userAddress.slice(userAddress.length-3, userAddress.length)}</p>
           : 
           <p className='wallet'>No wallet connected</p>
           }
        </div>
      </div>
    </div>
  );
}

export default App;