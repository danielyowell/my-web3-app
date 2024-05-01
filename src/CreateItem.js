import './App.css';
import React, { useState } from 'react';
import web3 from './web3';
import itemMarketplaceContract from './itemMarketplaceContract';
import { Link } from 'react-router-dom';

const CreateItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  console.log('CREATE ITEM');

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
      <header className="BACKGROUND">
        <Link to="/">
          <button onClick={() => console.log('Back')}>Back</button>
        </Link>
        <div>
          <header className="box-container2">
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
                <label htmlFor="price">Price (Sepolia): </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <br />
              <button className="">Submit</button> {/* buy-btn */}
            </form>
          </header>
        </div>
      </header>
      {/* <Footer /> ?*/}
    </div>
  );
};

export default CreateItem;