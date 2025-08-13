const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  mileage: {
    type: Number,
    required: true,
    min: 0
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'],
    required: true
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  images: [{
    type: String
  }],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  listingType: {
    type: String,
    enum: ['rent', 'sale'],
    required: true
  },
  // For rental listings
  dailyRate: {
    type: Number,
    min: 0
  },
  weeklyRate: {
    type: Number,
    min: 0
  },
  monthlyRate: {
    type: Number,
    min: 0
  },
  // Car specifications
  engineSize: {
    type: String
  },
  seats: {
    type: Number,
    min: 1,
    max: 20
  },
  doors: {
    type: Number,
    min: 2,
    max: 5
  },
  features: [{
    type: String
  }],
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String
    }
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
carSchema.index({ 
  title: 'text', 
  description: 'text', 
  brand: 'text', 
  model: 'text' 
});

module.exports = mongoose.model('Car', carSchema);