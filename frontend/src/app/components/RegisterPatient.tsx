// components/RegisterPatient.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useEthereum } from '@/contexts/EthereumContext';
import { getContract, registerPatient } from '@/utils/contract'; // Import your contract interaction functions
import { useSession } from 'next-auth/react';
import detectEthereumProvider from '@metamask/detect-provider';
import { useRouter } from 'next/navigation';

const RegisterPatient: React.FC = () => {
  const { account } = useEthereum();
  const { data: session } = useSession();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [estimatedGas, setEstimatedGas] = useState<number | null>(null);
  const router = useRouter();

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

  useEffect(() => {
    const estimateGas = async () => {
      if (web3 && account && name) {
        try {
          const contract = getContract(web3);
          const gasEstimate = await contract.methods.registerPatient(account, name).estimateGas({ from: account });
          setEstimatedGas(Number(gasEstimate));
        } catch (error) {
          console.error('Error estimating gas:', error);
        }
      }
    };

    estimateGas();
  }, [web3, account, name]);

  const handleRegisterPatient = async () => {
    if (web3 && account && name) {
      try {
        await registerPatient(web3, account, name);
        setName(''); // Clear the input field
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error registering patient. Please try again.');
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
            <h2 className="text-lg font-semibold mb-4">Register as Patient</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            {estimatedGas && (
              <p className="text-gray-600 mb-4">Estimated Gas: {estimatedGas} units</p>
            )}
            <button
              onClick={handleRegisterPatient}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Register as Patient
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        ) : (
          <p className="text-gray-700">Please connect your wallet to register as a patient.</p>
        )}
      </div>
    </div>
  );
};

export default RegisterPatient;



//above code is wihtout mongo intreaction
//below code has some errors

// we have done mongo db basic setup till now
//upload page
//regsiter/patient/route.ts
// 7 aug 2024  --> 5 bje


// "use client";
// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { useEthereum } from '@/contexts/EthereumContext';
// import { registerPatient as registerOnBlockchain } from '@/utils/contract';
// import { useSession } from 'next-auth/react';
// import detectEthereumProvider from '@metamask/detect-provider';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// const RegisterPatient: React.FC = () => {
//   const { account } = useEthereum();
//   const { data: session } = useSession();
//   const [name, setName] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);
//   const [web3, setWeb3] = useState<Web3 | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const initWeb3 = async () => {
//       try {
//         const detectedProvider = (await detectEthereumProvider()) as any;
//         if (detectedProvider) {
//           const web3Instance = new Web3(detectedProvider);
//           setWeb3(web3Instance);
//         } else {
//           setError('MetaMask is not installed. Please install MetaMask.');
//         }
//       } catch (err) {
//         setError('Failed to initialize Web3. Please try again.');
//       }
//     };

//     initWeb3();
//   }, []);

//   const handleRegisterPatient = async () => {
//     if (web3 && account && name) {
//       try {
//         // Register the patient on the blockchain
//         await registerOnBlockchain(web3, account, name);
        
//         // Register the patient in the database
//         // await axios.post('/api/register/patient', {
//         //   name,
//         //   blockchainAddress: account,
//         //   role: 'patient',
//         // });

//         setName(''); // Clear the input field
//         setError(null);
//         // router.push('/upload');
//          // Redirect to the upload page after successful registration
//       } catch (error) {
//         setError('Error registering patient. Please try again.');
//       }
//     } else {
//       setError('Please connect your wallet and provide a name.');
//     }
//   };

//   return (
//     <div className='p-20'>
//       <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
//         {account ? (
//           <div>
//             <h2 className="text-lg font-semibold mb-4">Register as Patient</h2>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md mb-4"
//             />
//             <button
//               onClick={handleRegisterPatient}
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//             >
//               Register as Patient
//             </button>
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//           </div>
//         ) : (
//           <p className="text-gray-700">Please connect your wallet to register as a patient.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegisterPatient;
