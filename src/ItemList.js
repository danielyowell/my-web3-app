import React, { useState, useEffect } from 'react';
import web3 from './web3';
import itemMarketplaceContract from './itemMarketplaceContract';

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
      <p>
        TESTNET MARKETPLACE
      </p>
      <div>
      <h2>Available Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: {item.price} Ether</p>
            <p>Seller: {item.seller}</p>
            <p>Available: {item.isAvailable ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
    </header>
  </div>
  );
};

export default ItemList;