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
      const transactionHash = await itemMarketplaceContract.methods.item_CreationHashes(i).call();
      const purchaseTransactionHash = await itemMarketplaceContract.methods.item_PurchaseHashes(i).call();

      fetchedItems.push({
        id: item.id,
        name: `${i}. ${item.name}`,
        description: item.description,
        price: web3.utils.fromWei(item.price, 'ether'),
        seller: item.seller.slice(0, 5) + '...' + item.seller.slice(item.seller.length - 3, item.seller.length),
        isAvailable: item.isAvailable,
        transactionHash: transactionHash,
        purchaseTransactionHash: item.isAvailable ? null : purchaseTransactionHash, // Set purchaseTransactionHash to null if the item is available
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
      <div className="subpage">
        <Link to="/">
          <button onClick={() => console.log('Back')}>Back</button>
        </Link>
        <div>
          <h2>Available Items</h2>
          <div className="SCROLLABLE_ITEM_LIST">
            <ul className="item-list">
              {items.map((item) => (
                <li key={item.id}>
                  <h3 className="iname">{item.name}</h3>
                  <p className='desc'>{item.description}</p>
                  <p className="price">Price: {item.price} SepoliaETH</p>
                  <p className="seller">Seller: {item.seller}</p>
                  <p className={item.isAvailable ? 'available' : 'unavailable'}>
                    Available: {item.isAvailable ? 'Yes' : 'No'}
                  </p>
                  <div className='c_hash'>
                  {item.transactionHash && (
                    <p>Creation Transaction Hash: {item.transactionHash}</p>
                  )}
                  </div>
                  <div className='c_hash'>
                  {item.purchaseTransactionHash && (
                    <p>Purchase Transaction Hash: {item.purchaseTransactionHash}</p>
                  )}
                  </div>
                  <br />
                  <center>
                    {item.isAvailable && (
                      <button className="buyme" onClick={() => handlePurchase(item.id)}>
                        Purchase
                      </button>
                    )}
                  </center>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;