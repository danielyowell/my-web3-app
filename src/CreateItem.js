import React, { useState } from 'react';
import web3 from './web3';
import itemMarketplaceContract from './itemMarketplaceContract';

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
    <div>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price (in Ether):</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default CreateItem;