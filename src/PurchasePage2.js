/* This component handles purchases. */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import web3 from './web3';
import itemMarketplaceContract from './itemMarketplaceContract';

const PurchasePage = ({ selectedItemId }) => {
    console.log("Navigated to purchase page...");
    useEffect(() => {

    }, [selectedItemId]);

    return (
        <div>
            <Link to="/buy-items">
                <button onClick={() => console.log('Back')}>Back</button>
            </Link>
        </div>
    );
};

export default PurchasePage;