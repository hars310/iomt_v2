// components/WalletConnect.tsx
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { Button } from '@/components/ui/button';
import { useEthereum } from '@/contexts/EthereumContext';

const WalletConnect: React.FC = () => {
  const { account, setAccount } = useEthereum();
  const [provider, setProvider] = useState<any>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const detectedProvider = (await detectEthereumProvider()) as any;
        if (detectedProvider) {
          setProvider(detectedProvider);
          const web3Instance = new Web3(detectedProvider);
          setWeb3(web3Instance);

          // Check if the user is already connected
          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } else {
          setError('MetaMask is not installed. Please install MetaMask.');
        }
      } catch (err) {
        setError('Failed to initialize Web3. Please try again.');
      }
    };

    initWeb3();
  }, [setAccount]);

  const handleConnect = async () => {
    if (provider && web3) {
      try {
        // Request account access if needed
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setError('No accounts found. Please make sure you are logged in to MetaMask.');
        }
      } catch (err) {
        setError('Failed to connect wallet. Please try again.');
      }
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
  };

  
  const formatAccountAddress = (address: string) => {
    if (address.length > 0) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return '';
  };

  return (
    <div className="wallet-connect-container">
      {error && <p className="error-message">{error}</p>}
      {!account ? (
        <button
          onClick={handleConnect}
          className="connect-button"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="connected-status">
          {/* <p>Connected as: <span className="account-address">{formatAccountAddress(account)}</span></p> */}
          <Button
            onClick={handleDisconnect}
            className="disconnect-button"
          >
            Disconnect Wallet
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
