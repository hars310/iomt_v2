import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../lib/mongodb'; // MongoDB connection utility
import User from '../../../../models/user.model'; // User model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectToDatabase();

    const { name, blockchainAddress, role } = req.body;

    if (!name || !blockchainAddress || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const user = await User.create({
        email: '', // You might want to handle email separately or make it optional
        name,
        blockchainAddress,
        documents: [], // Initialize with an empty array
        role,
      });

      res.status(201).json({ message: 'Patient registered successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Error registering patient' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
