"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEthereum } from '@/contexts/EthereumContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const { data: session } = useSession();
  const { account } = useEthereum();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch user registration status
//     const fetchUserRole = async () => {
//       if (session?.user?.email) {
//         try {
//           const response = await axios.get(`/api/user/role?email=${session.user.email}`);
//           setRole(response.data.role); // Assuming the API returns a role
//         } catch (error) {
//           console.error('Error fetching user role:', error);
//         }
//       }
//     };

//     fetchUserRole();
//   }, [session?.user?.email]);

  // Redirect to home if the user is not logged in
  if (!session?.user) {
    router.push('/');
    return null; // Prevents rendering of the rest of the component
  }

  return (
    <div className="p-20 flex flex-col justify-center items-center">
      <div className="p-10 mb-6">
        {account ? (
          <>
            <p className="text-lg font-semibold">Name: {session?.user?.name}</p>
            <p className="text-lg font-semibold">Email: {session?.user?.email}</p>
            <p className="text-lg font-semibold">Ethereum Account: {account}</p>
          </>
        ) : (
          <p>Ethereum account not connected.</p>
        )}
      </div>
      
     {
      account ? (
         <div className="p-10 border-t border-gray-300">
        <h2 className="text-xl font-bold mb-4">
          {role ? `You are registered as ${role.charAt(0).toUpperCase() + role.slice(1)}` : 'Register as:'}
        </h2>
        {!role ? (
          <div className="flex gap-4">
            <Link href="/register/patient">
              <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register as Patient</p>
            </Link>
            <Link href="/register/doctor">
              <p className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Register as Doctor</p>
            </Link>
          </div>
        ) : null}
      </div>
      )
      : ""
     }
    </div>
  );
};

export default Dashboard;
