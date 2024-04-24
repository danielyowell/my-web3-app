import Web3 from 'web3';

let web3;

/*
"With an Infura API key, you can use Infura 
as a remote Ethereum node provider in your 
decentralized application (dApp). 

Infura provides a reliable and scalable 
infrastructure to interact with the Ethereum 
blockchain without having to run a full 
Ethereum node yourself."
*/
let API_KEY = '4fa3f4bc1fb64adeb53218145f8964c1';
let infuraEndpoint = `https://mainnet.infura.io/v3/${API_KEY}`;

// Check if Web3 has been injected by the browser (e.g., MetaMask)
if (typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
} else {
  // Fallback to a remote node, e.g., Infura
  const provider = new Web3.providers.HttpProvider(infuraEndpoint);
  web3 = new Web3(provider);
}

export default web3;