import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  name: string;
  blockchainAddress: string;
  documents: string[]; // Array of file URLs or paths
  role: 'doctor' | 'patient'; // Define the role as either 'doctor' or 'patient'
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  blockchainAddress: {
    type: String,
    required: true,
    trim: true,
  },
  documents: {
    type: [String], // Array of file URLs or paths
    default: [], // Default to an empty array
  },
  role: {
    type: String,
    enum: ['doctor', 'patient'], // Enum to restrict role to 'doctor' or 'patient'
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
