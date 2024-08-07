"use client"
import Image from "next/image";
import img1 from '../../assets/img1.jpg';
import Link from "next/link";
import { useSession } from "next-auth/react";
import Dashboard from "./dashboard/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter()

  
  return (
    <main className="flex  flex-col items-center justify-between p-4 bg-gray-100">
      {
        session.data?.user ? <>
        {
         router.push('/dashboard') 
        }
        </> : <>
        <div className="absolute inset-0">
        <Image
          src={img1}
          alt="Healthcare Platform Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60 z-10"></div>
      </div>
      
      <div className="relative min-h-screen z-20 p-10 flex flex-col items-center justify-center text-center text-white">
        <h1 className="font-bold mb-6">
          <span className="text-4xl">
          Welcome to  </span>
          <br />
          <span className="text-blue-400 text-7xl">
          IoMT  Healthcare Platform
          </span>
        </h1>
        <p className="text-xl mb-8 px-20">
          Revolutionizing healthcare with blockchain technology for secure and seamless patient and doctor management. 
          Register, manage, and store your healthcare documents securely.
        </p>
        {/* <div className="flex space-x-4">
          <Link href={'/register/patient'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register as Patient
          </Link>
          <Link href={'/register/doctor'} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Register as Doctor
          </Link>
        </div> */}
      </div>

      {/* <section className="flex flex-col items-center justify-center w-full mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <Image
              src="/secure-storage.png"
              alt="Secure Storage"
              width={80}
              height={80}
              className="mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Secure Storage
            </h3>
            <p className="text-gray-700 text-center">
              Your medical documents are securely stored using blockchain technology ensuring privacy and integrity.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <Image
              src="/patient-doctor.png"
              alt="Patient and Doctor Management"
              width={80}
              height={80}
              className="mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Patient and Doctor Management
            </h3>
            <p className="text-gray-700 text-center">
              Easily manage patient and doctor registrations and interactions on our intuitive platform.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <Image
              src="/iomt-integration.png"
              alt="IoMT Integration"
              width={80}
              height={80}
              className="mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              IoMT Integration
            </h3>
            <p className="text-gray-700 text-center">
              Seamlessly integrate with Internet of Medical Things (IoMT) devices for real-time health monitoring.
            </p>
          </div>
        </div>
      </section> */}

      {/* <section className="flex flex-col items-center justify-center w-full mt-16 mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              1. Register
            </h3>
            <p className="text-gray-700 text-center">
              Sign up as a patient or doctor using your basic information and connect your MetaMask wallet.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              2. Verify
            </h3>
            <p className="text-gray-700 text-center">
              Complete your profile and verify your identity using blockchain-based transactions on the Sepolia network.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              3. Upload Documents
            </h3>
            <p className="text-gray-700 text-center">
              Upload and manage your medical documents securely with our decentralized storage solution.
            </p>
          </div>
        </div>
      </section> */}

      {/* <footer className="flex flex-col items-center justify-center w-full p-4 bg-gray-800 text-white">
        <p className="text-center">
          © 2024 IoMT Healthcare Platform. All rights reserved.
        </p>
      </footer> */}
        </>
      }
    </main>
  );
}
