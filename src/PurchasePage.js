/* This component handles purchases. */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import web3 from './web3';
import itemMarketplaceContract from './itemMarketplaceContract';

const PurchasePage = ({ selectedItemId }) => {
    console.log("Navigated to purchase page...");
    // By default, the item is set to null and loading is set to true
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    // By default, the purchase error is set to an empty string
    const [purchaseError, setPurchaseError] = useState('');
    const navigate = useNavigate();

    // This useEffect hook fetches the item data from the blockchain
    useEffect(() => {
        const fetchItem = async () => {
            try {
                console.log("Fetching item...");
                const fetchedItem = await itemMarketplaceContract.methods.items(selectedItemId).call();
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

        if (selectedItemId) {
            fetchItem();
        }
    }, [selectedItemId]);

    const handlePurchase = async () => {
        try {
            await itemMarketplaceContract.methods.purchaseItem(selectedItemId).send({
                from: web3.currentProvider.selectedAddress,
                value: web3.utils.toWei(item.price, 'ether'),
            });
            navigate('/');
        } catch (error) {
            setPurchaseError('Error purchasing item');
            console.error('Error purchasing item:', error);
        }
    };

    // if (loading) {
    //     return <div className='loading'>Loading...</div>;
    // }

    if (!item) {
        return <div className='loading'>No item selected</div>;
    }

    return (
        <div>
            <Link to="/buy-items">
                <button onClick={() => console.log('Back')}>Back</button>
            </Link>
            <h2>Purchase Item</h2>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: {item.price} SepoliaETH</p>
            <p>Seller: {item.seller}</p>
            {purchaseError && <p>{purchaseError}</p>}
            <button onClick={handlePurchase} disabled={!item.isAvailable}>
                Purchase
            </button>
        </div>
    );
};

export default PurchasePage;