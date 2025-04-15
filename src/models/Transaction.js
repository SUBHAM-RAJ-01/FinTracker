// src/models/Transaction.js
import mongoose from 'mongoose';

// Ensure DB connection is established (already handled in utils/helpers.js)
import { connectToDB } from '../utils/helpers'; // Corrected relative path

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [100, 'Description cannot exceed 100 characters']
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['food', 'transport', 'housing', 'entertainment', 'other'],
    message: 'Invalid category'
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  }
}, {
  timestamps: true
});

// Check if the model exists before compiling to avoid overwriting existing model
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;
