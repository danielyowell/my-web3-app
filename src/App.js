import './App.css';
import './css/HomePage.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import CONNECT_WALLET from './components/CONNECT_WALLET.js';
import CreateItem from './components/CreateItem';
import ItemList from './components/ItemList';
import title2 from './imgs/title2.png';
import account from './components/CONNECT_WALLET.js';
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
  console.log('HOME');
  return (
    //  className="App"
    <div>
      <div>
        <div className="HOME_MENU">
          <img src={title2} alt="test" className="LOGO_SIZE" />
          <br /><br /><br />
          <Link to="/buy-items">
            <button className="b1" onClick={() => console.log('Buy Items button clicked')}>Buy Items</button>
          </Link>
          <br />
          <Link to="/sell-items">
            <button className="b1" onClick={() => console.log('Sell Items button clicked')}>Sell Items</button>
          </Link>
          <br />
          <Link to={CONNECT_WALLET}>
            <button className="b1" onClick={() => console.log('Connect Wallet button clicked')}>Connect Wallet</button>
          </Link>
          <br />
          <div className="wallet">
            {account ? '(Wallet successfully connected)' : '(No wallet connected)'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="BACKGROUND">
//         <p>
//           Placeholder
//         </p>
//       </header>
//     </div>
//   );
// }

// export default App;