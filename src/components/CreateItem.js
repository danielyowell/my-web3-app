import '../App.css';
import '../css/CreateItem.css';
import React, { useState } from 'react';
import web3 from '../web3';
import itemMarketplaceContract from '../itemMarketplaceContract';
import { Link } from 'react-router-dom';

const CreateItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  console.log('CREATE ITEM');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the user's Ethereum account
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // Check if the price is greater than 0.0001
      if (parseFloat(price) > 0.0001) {
        setSuccessMessage('Price cannot be greater than 0.0001');
        return;
      }

      // Check if the name and description are longer than 50 characters
      if (name.length > 50 || description.length > 50) {
        setSuccessMessage('Name and description cannot be longer than 50 characters');
        return;
      }

      setSuccessMessage('Loading...');
      console.log('Creating item...');

      // Create the item
      await itemMarketplaceContract.methods
        .createItem(name, description, web3.utils.toWei(price, 'ether'))
        .send({ from: account });

      // Display success message
      setSuccessMessage('Item created successfully!');

      // Reset the form fields
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div>
      <div className="subpage">
        <Link to="/">
          <button onClick={() => console.log('Back')}>Back</button>
        </Link>
        <div>
          <header className="CREATE_ITEM_MENU">
            <h2>Create Item</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Maximum 50 characters"
                  required
                  maxLength="50"
                />
              </div>
              <br />
              <div>
                <label htmlFor="description">Description: </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Maximum 50 characters"
                  required
                  maxLength="50"
                />
              </div>
              <br />
              <div>
                <label htmlFor="price">Price (Sepolia ETH): </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Maximum 0.0001"
                  required
                  max="0.0001"
                />
              </div>
              <br />
              <button>Submit</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
          </header>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;