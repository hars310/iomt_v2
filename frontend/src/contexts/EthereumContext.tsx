// contexts/EthereumContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface EthereumContextType {
  account: string | null;
  setAccount: (account: string | null) => void;
}

const EthereumContext = createContext<EthereumContextType | undefined>(undefined);

export const EthereumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  return (
    <EthereumContext.Provider value={{ account, setAccount }}>
      {children}
    </EthereumContext.Provider>
  );
};

export const useEthereum = () => {
  const context = useContext(EthereumContext);
  if (context === undefined) {
    throw new Error('useEthereum must be used within an EthereumProvider');
  }
  return context;
};
