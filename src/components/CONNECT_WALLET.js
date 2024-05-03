import React, { useState, useEffect } from 'react';
import web3 from '../web3';

const CONNECT_WALLET = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadAccount = async () => {
      try {
        // Request access to the user's MetaMask account
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the current account
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error getting account:', error);
      }
    };

    loadAccount();
  }, []);

  return (
    <div>
      {/* <h2>My Ethereum Account</h2> */}
      <p>Account: {account}</p>
    </div>
  );
};

export default CONNECT_WALLET;