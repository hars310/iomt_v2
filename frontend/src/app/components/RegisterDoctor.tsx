// components/RegisterDoctor.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useEthereum } from '@/contexts/EthereumContext';
import { registerDoctor } from '@/utils/contract'; // Import your contract interaction functions
import { useSession } from 'next-auth/react';
import detectEthereumProvider from '@metamask/detect-provider';

const RegisterDoctor: React.FC = () => {
  const { account } = useEthereum();
  const { data: session } = useSession();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const detectedProvider = (await detectEthereumProvider()) as any;
        if (detectedProvider) {
          const web3Instance = new Web3(detectedProvider);
          setWeb3(web3Instance);
        } else {
          setError('MetaMask is not installed. Please install MetaMask.');
        }
      } catch (err) {
        setError('Failed to initialize Web3. Please try again.');
      }
    };

    initWeb3();
  }, []);

  const handleRegisterDoctor = async () => {
    if (web3 && account && name) {
      try {
        await registerDoctor(web3, account, name);
        setName(''); // Clear the input field
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error registering doctor. Please try again.');
      }
    } else {
      setError('Please connect your wallet and provide a name.');
    }
  };

  return (
    <div className='p-20'>
      <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        {account ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">Register as Doctor</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              onClick={handleRegisterDoctor}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Register as Doctor
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        ) : (
          <p className="text-gray-700">Please connect your wallet to register as a doctor.</p>
        )}
      </div>
    </div>
  );
};

export default RegisterDoctor;
