const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['rent', 'sale'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: function() {
      return this.type === 'rent';
    }
  },
  duration: {
    type: Number,
    required: function() {
      return this.type === 'rent';
    }
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);