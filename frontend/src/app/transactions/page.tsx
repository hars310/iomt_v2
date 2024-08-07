"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const contractAddress = '0x84B8DbbFae145a985dD56Cb99b5d216F5AC61EDc';
  const etherscanApiKey = 'JV2MHAUST7BNIQ12NMY3XJ7KCZBGJ7JJ5V';

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanApiKey}`
        );
        setTransactions(response.data.result as Transaction[]);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [contractAddress, etherscanApiKey]);

  if (loading) return <p className="text-center mt-10">Loading transactions...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error fetching transactions: {error}</p>;

  const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="container mx-auto p-20">
      <h1 className="text-2xl font-bold mb-4">Transactions for Contract: {truncateAddress(contractAddress)}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Block Number</th>
              <th className="py-2 px-4 border-b">Time Stamp</th>
              <th className="py-2 px-4 border-b">From</th>
              <th className="py-2 px-4 border-b">To</th>
              <th className="py-2 px-4 border-b">Value</th>
              <th className="py-2 px-4 border-b">Hash</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{tx.blockNumber}</td>
                <td className="py-2 px-4 border-b text-center">{new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}</td>
                <td className="py-2 px-4 border-b text-center">{truncateAddress(tx.from)}</td>
                <td className="py-2 px-4 border-b text-center">{truncateAddress(tx.to)}</td>
                <td className="py-2 px-4 border-b text-center">{parseFloat(tx.value) / 1e18} ETH</td>
                <td className="py-2 px-4 border-b text-center">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {truncateAddress(tx.hash)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
