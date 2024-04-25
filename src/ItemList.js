import './App.css';
import React, { useState, useEffect } from 'react';
import web3 from './web3';
import itemMarketplaceContract from './itemMarketplaceContract';
import {Link } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemCount = await itemMarketplaceContract.methods.itemCount().call();
        const fetchedItems = [];

        for (let i = 1; i <= itemCount; i++) {
          const item = await itemMarketplaceContract.methods.items(i).call();
          fetchedItems.push({
            id: item.id,
            name: item.name,
            description: item.description,
            price: web3.utils.fromWei(item.price, 'ether'),
            seller: item.seller,
            isAvailable: item.isAvailable,
          });
        }

        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <button className="buy-btn">Back</button>
        </Link>
        <h2>
          TESTNET MARKETPLACE
        </h2>
        <div>
          <h2>Available Items</h2>
          <ul className="item-list">
            {items.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">Price: {item.price} Ether</p>
                <p className="seller">Seller: {item.seller}</p>
                <p className={item.isAvailable ? 'available' : 'unavailable'}>Available: {item.isAvailable ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

const Footer = () =>
  <header className="App-footer">
    © Daniel Yowell, 2024-2024
  </header>

export default ItemList;