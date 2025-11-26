const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Car = require('../models/Car');

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { carId, type, amount, startDate, duration, paymentMethod } = req.body;

    // Verify car exists and is available
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    if (!car.isAvailable) {
      return res.status(400).json({ message: 'Car is not available' });
    }

    // Create transaction
    const transaction = new Transaction({
      car: carId,
      buyer: req.user._id,
      seller: car.owner,
      type,
      amount,
      startDate,
      duration,
      paymentMethod,
      status: 'pending'
    });

    await transaction.save();

    // Update car availability
    car.isAvailable = false;
    await car.save();

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// Get user's transactions
router.get('/my-requests', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { buyer: req.user._id },
        { seller: req.user._id }
      ]
    })
    .populate('car')
    .populate('buyer', 'name email')
    .populate('seller', 'name email')
    .sort('-createdAt');

    res.json(transactions);
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get car requests for car owners (transactions where user is seller)
router.get('/my-cars-requests', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      seller: req.user._id
    })
    .populate('car')
    .populate('buyer', 'name email')
    .populate('seller', 'name email')
    .sort('-createdAt');

    res.json(transactions);
  } catch (error) {
    console.error('Error getting car requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all requests made by the buyer (user)
router.get('/buyer-requests', auth, async (req, res) => {
  try {
    const requests = await Transaction.find({
      buyer: req.user._id   // BUYER FILTER
    })
      .populate('car')
      .populate('seller', 'name email')
      .sort('-createdAt');

    res.json(requests);
  } catch (error) {
    console.error('Error getting buyer requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Update transaction status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check if user is the seller of this transaction
    if (transaction.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this transaction' });
    }

    // Update transaction status
    transaction.status = status;
    await transaction.save();

    // If accepted, update car availability
    if (status === 'accepted') {
      const car = await Car.findById(transaction.car);
      if (car) {
        car.isAvailable = false;
        await car.save();
      }
    }

    // If rejected, make car available again
    if (status === 'rejected') {
      const car = await Car.findById(transaction.car);
      if (car) {
        car.isAvailable = true;
        await car.save();
      }
    }

    // If completed, make car available again (for rentals) or keep unavailable (for sales)
    if (status === 'completed') {
      const car = await Car.findById(transaction.car);
      if (car && transaction.type === 'rent') {
        car.isAvailable = true;
        await car.save();
      }
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error updating transaction status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark transaction as completed
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check if user is the seller of this transaction
    if (transaction.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to complete this transaction' });
    }

    // Update transaction status to completed
    transaction.status = 'completed';
    await transaction.save();

    // If it's a rental, make the car available again
    if (transaction.type === 'rent') {
      const car = await Car.findById(transaction.car);
      if (car) {
        car.isAvailable = true;
        await car.save();
      }
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error completing transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;