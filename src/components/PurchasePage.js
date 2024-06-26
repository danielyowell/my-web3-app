/* This component handles purchases. */
import '../css/PurchasePage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../web3';
import itemMarketplaceContract from '../itemMarketplaceContract';
import { useSearchParams } from 'react-router-dom';

const PurchasePage = () => { // { selectedItemId } inside parenths
    console.log("Navigated to purchase page...");
    
    const [searchParams] = useSearchParams();
    const itemId = searchParams.get('itemId');
    console.log("The item you want to buy is...", itemId);

    const [isLoading, setIsLoading] = useState(false);
    const [confirmationHash, setConfirmationHash] = useState('');

    // By default, the item is set to null and loading is set to true
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    // By default, the purchase error is set to an empty string
    const [purchaseError, setPurchaseError] = useState('');
    
    // This useEffect hook fetches the item data from the blockchain
    useEffect(() => {
        const fetchItem = async () => {
            try {
                console.log("Fetching item...");
                const fetchedItem = await itemMarketplaceContract.methods.items(itemId).call();
                console.log("FetchedItem: ", fetchedItem);
                setItem({
                    id: fetchedItem.id,
                    name: fetchedItem.name,
                    description: fetchedItem.description,
                    price: web3.utils.fromWei(fetchedItem.price, 'ether'),
                    seller: fetchedItem.seller,
                    isAvailable: fetchedItem.isAvailable,
                });
                setLoading(false);
                console.log('Item fetched:', fetchedItem);
            } catch (error) {
                console.error('Error fetching item:', error);
                setLoading(false);
            }
        };

        if (itemId) {
            fetchItem();
        }
    },); //     }, [selectedItemId]);

    const handlePurchase = async () => {
        try {
          const fromAddress = web3.currentProvider.selectedAddress;
          if (!fromAddress) {
            console.log('fromAddress:', fromAddress);
            setPurchaseError('Please connect your wallet to proceed with the purchase.');
            return;
          }
      
          setIsLoading(true); // Set loading state to true before making the purchase
      
          const purchaseTransaction = await itemMarketplaceContract.methods
            .purchaseItem(itemId)
            .send({
              from: fromAddress,
              value: web3.utils.toWei(item.price, 'ether'),
            });
      
          setConfirmationHash(purchaseTransaction.transactionHash); // Store the confirmation hash
          setIsLoading(false); // Set loading state to false after the purchase is complete
          // navigate('/'); // Navigate to the homepage after the purchase is complete
        } catch (error) {
          setPurchaseError(`${error.message}`);
          setIsLoading(false); // Set loading state to false in case of an error
          console.error('Error purchasing item:', error);
        }
      };

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    if (!item) {
        return <div className='loading'>No item selected</div>;
    }

    return (
        <div className="subpage">
          <Link to="/buy-items">
            <button onClick={() => console.log('Back')}>Back</button>
          </Link>
          <div className='ITEM_CART'>
            <h2>Purchase Item</h2>
            <h3 className='pur_info'>Name: {item.name}</h3>
            <p className='pur_info'>Description: {item.description}</p>
            <p className='pur_info'>Price: {item.price} SepoliaETH</p>
            {purchaseError && <p className='err'>{purchaseError}</p>}
            <button onClick={handlePurchase} disabled={!item.isAvailable || isLoading}>
              {isLoading ? 'Purchasing...' : 'Purchase'}
            </button>
            <div className='success'>
            {isLoading && <p>Loading...</p>}
            </div>
            <div className='success'>
                {confirmationHash && <p>Purchase successful! Confirmation hash: {confirmationHash}</p>}
            </div>
          </div>
        </div>
      );
};

export default PurchasePage;