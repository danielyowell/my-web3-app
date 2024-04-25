import './App.css';
import React, { useState } from 'react';
import web3 from './web3';
import itemMarketplaceContract from './itemMarketplaceContract';
import { Link } from 'react-router-dom';
//import Footer from './App';

const CreateItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the user's Ethereum account
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // Create the item
      await itemMarketplaceContract.methods
        .createItem(name, description, web3.utils.toWei(price, 'ether'))
        .send({ from: account });

      // Reset the form fields
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <button className="buy-btn">Back</button>
        </Link>
        <p>
          TESTNET MARKETPLACE
        </p>
        <div>
          <header className="App-header2">
            <h2>Create Item</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label htmlFor="description">Description: </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label htmlFor="price">Price (in Ether): </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </header>
        </div>
      </header>
      <Footer />
    </div>
  );
};

const Footer = () =>
  <header className="App-footer">
    © Daniel Yowell, 2024-2024
  </header>
  
export default CreateItem;