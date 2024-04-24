import React, { useEffect, useState } from 'react';
import web3 from '../web3';

const LATEST_BLOCK = () => {
  const [blockNumber, setBlockNumber] = useState(0);

  useEffect(() => {
    const fetchBlockNumber = async () => {
      const latestBlockNumber = await web3.eth.getBlockNumber();
      setBlockNumber(latestBlockNumber);
    };

    fetchBlockNumber();
  }, []);

  return (
    <div>
      <h2>Latest Block Number</h2>
      <p>{blockNumber}</p>
    </div>
  );
};

export default LATEST_BLOCK;