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
    <div>
      <header className="BACKGROUND">
        <Link to="/">
          <button>Back</button>
        </Link>
        <div>
          <h2>Available Items</h2>
          <ol className="item-list">
            {items.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">Price: {item.price} SepoliaETH</p>
                <p className="seller">Seller: {item.seller}</p>
                <p className={item.isAvailable ? 'available' : 'unavailable'}>Available: {item.isAvailable ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ol>
        </div>
      </header>
    </div>
  );
};

export default ItemList;