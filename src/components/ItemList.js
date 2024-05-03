/* This component lists items for purchase. */
import '../App.css';
import '../css/ItemList.css';
import React, { useState, useEffect } from 'react';
import web3 from '../web3';
import itemMarketplaceContract from '../itemMarketplaceContract';
import { Link, useNavigate } from 'react-router-dom';

const ItemList = () => {
  console.log('BUY ITEM');

  // Handle purchase
  const [, setSelectedItemId] = useState(null); // const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();
  const handlePurchase = (itemId) => {
    console.log("Handling purchase for item id:", itemId);
    setSelectedItemId(itemId);
    console.log("Navigate to purchase URL");
    navigate(`/purchase?itemId=${itemId}`);
  };

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
            name: `${i}. ${item.name}`, // Prepend item number to name
            description: item.description,
            price: web3.utils.fromWei(item.price, 'ether'),
            seller: item.seller.slice(0, 5),
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
      <header className="subpage">
        <Link to="/">
          <button onClick={() => console.log('Back')}>Back</button>
        </Link>
        <div>
          <h2>Available Items</h2>
          <div className="SCROLLABLE_ITEM_LIST">
            <ul className="item-list">
              {items.map((item) => (
                <li key={item.id}>
                  <h3>{item.name}</h3> {/* Item name with number */}
                  <p>{item.description}</p>
                  <p className="price">Price: {item.price} SepoliaETH</p>
                  <p className="seller">Seller: {item.seller}</p>
                  <p className={item.isAvailable ? 'available' : 'unavailable'}>
                    Available: {item.isAvailable ? 'Yes' : 'No'}
                  </p>
                  <br /><br />
                  {item.isAvailable && (
                    <button className="buyme" onClick={() => handlePurchase(item.id)}>Purchase</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default ItemList;