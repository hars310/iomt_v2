"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import WalletConnect from './WalletConnect';
import { PrimaryButton } from './Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Appbar = () => {
  const { data: session } = useSession();  

  return (
    <div className="fixed w-full h-16 text-zinc-900 bg-white/60 shadow-md py-2 px-4 flex justify-between items-center z-40">
      <div className="text-2xl">IOMT</div>
      <div>
        {session?.user ? (
          <div className='flex justify-between gap-4'>
            <Link href='/dashboard'>Dashboard</Link>
            <Link href='/transactions'>Transactions</Link>
          </div>
        ) : null}
      </div>
      <div className="flex space-x-4 items-center">
        {session?.user ? (
          <>
            <PrimaryButton onClick={()=>signOut()}>Sign Out</PrimaryButton>
            <WalletConnect />
          </>
        ) : (
          <>
            <PrimaryButton onClick={() => signIn()}>Sign In</PrimaryButton>
            <WalletConnect />
          </>
        )}
      </div>
    </div>
  );
};
