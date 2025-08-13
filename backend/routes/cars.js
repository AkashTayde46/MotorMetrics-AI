const express = require('express');
const { body, validationResult } = require('express-validator');
const Car = require('../models/Car');
const { auth, isOwner } = require('../middleware/auth');
const upload = require('../middleware/upload'); // the Cloudinary multer setup


const router = express.Router();

// @route   GET /api/cars
// @desc    Get all cars with filtering and search
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      brand,
      model,
      year,
      fuelType,
      transmission,
      listingType,
      minPrice,
      maxPrice,
      city,
      state,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {
      isAvailable: true,
      owner: { $ne: req.user._id } // Exclude owner's cars
    };

    // Search functionality
    if (search) {
      filter.$or = [
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } }
      ];
    }

    // Filtering
    if (brand) filter.brand = new RegExp(brand, 'i');
    if (model) filter.model = new RegExp(model, 'i');
    if (year) filter.year = parseInt(year);
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;
    if (listingType) filter.listingType = listingType;
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (state) filter['location.state'] = new RegExp(state, 'i');

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const cars = await Car.find(filter)
      .populate('owner', 'name email phone')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Car.countDocuments(filter);

    res.json({
      cars,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/cars/featured
// @desc    Get featured cars
// @access  Public
router.get('/featured', auth, async (req, res) => {
  try {
    const featuredCars = await Car.find({ 
      isFeatured: true,
      isAvailable: true,
      owner: { $ne: req.user._id } // Exclude owner's cars
    })
    .populate('owner', 'name email phone')
    .limit(6)
    .sort('-createdAt');

    res.json(featuredCars);
  } catch (error) {
    console.error('Get featured cars error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/cars/:id
// @desc    Get car by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('owner', 'name email phone address');

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Increment views
    car.views += 1;
    await car.save();

    res.json(car);
  } catch (error) {
    console.error('Get car error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/cars
// @desc    Create a new car listing
// @access  Private (Owner only)
// router.post('/', auth, isOwner, [
//   body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
//   body('brand').trim().notEmpty().withMessage('Brand is required'),
//   body('model').trim().notEmpty().withMessage('Model is required'),
//   body('year').isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage('Invalid year'),
//   body('mileage').isInt({ min: 0 }).withMessage('Mileage must be positive'),
//   body('fuelType').isIn(['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']).withMessage('Invalid fuel type'),
//   body('transmission').isIn(['Manual', 'Automatic']).withMessage('Invalid transmission'),
//   body('color').trim().notEmpty().withMessage('Color is required'),
//   body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be 10-1000 characters'),
//   body('price').isFloat({ min: 0 }).withMessage('Price must be positive'),
//   body('listingType').isIn(['rent', 'sale']).withMessage('Invalid listing type'),
//   body('location.city').trim().notEmpty().withMessage('City is required'),
//   body('location.state').trim().notEmpty().withMessage('State is required')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.log('Validation errors:', errors.array());  // Add this line
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Add logging to debug request body
//     console.log('Received car data:', req.body);
    
//     const carData = {
//       ...req.body,
//       owner: req.user._id,
//       isAvailable: true  // Add this default
//     };

//     const car = new Car(carData);
//     await car.save();

//     const populatedCar = await Car.findById(car._id)
//       .populate('owner', 'name email phone');

//     res.status(201).json(populatedCar);
//   } catch (error) {
//     console.error('Create car error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
router.post(
  '/',
  auth,
  isOwner,
  [
    body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    body('brand').trim().notEmpty().withMessage('Brand is required'),
    body('model').trim().notEmpty().withMessage('Model is required'),
    body('year').isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage('Invalid year'),
    body('mileage').isInt({ min: 0 }).withMessage('Mileage must be positive'),
    body('fuelType').isIn(['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']).withMessage('Invalid fuel type'),
    body('transmission').isIn(['Manual', 'Automatic']).withMessage('Invalid transmission'),
    body('color').trim().notEmpty().withMessage('Color is required'),
    body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be 10-1000 characters'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be positive'),
    body('listingType').isIn(['rent', 'sale']).withMessage('Invalid listing type'),
    body('location.city').trim().notEmpty().withMessage('City is required'),
    body('location.state').trim().notEmpty().withMessage('State is required')
  ],
  async (req, res) => {
    try {
      console.log('Received request body:', req.body);
      console.log('Received files:', req.files);
      console.log('Content-Type:', req.get('Content-Type'));
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      // Handle images - check if they're already uploaded URLs or need to be processed
      let imageUrls = [];
      
      if (req.body.images && Array.isArray(req.body.images) && req.body.images.length > 0) {
        // Images are already uploaded URLs from frontend
        imageUrls = req.body.images.filter(url => url && url.trim() !== '');
      } else if (req.files && req.files.length > 0) {
        // Images were uploaded via multer (fallback)
        imageUrls = req.files.map(file => file.path);
      }

      console.log('Processing images:', { bodyImages: req.body.images, files: req.files, finalUrls: imageUrls });
      
      // Ensure we have at least one image
      if (imageUrls.length === 0) {
        return res.status(400).json({ message: 'At least one image is required' });
      }

      const carData = {
        ...req.body,
        owner: req.user._id,
        isAvailable: true,
        images: imageUrls
      };

      console.log('Car data to save:', carData);
      console.log('Final images array:', carData.images);

      const car = new Car(carData);
      console.log('Car instance before save:', car);
      
      const savedCar = await car.save();
      console.log('Car after save:', savedCar);
      console.log('Saved car images:', savedCar.images);

      const populatedCar = await Car.findById(car._id)
        .populate('owner', 'name email phone');

      console.log('Populated car images:', populatedCar.images);
      res.status(201).json(populatedCar);
    } catch (error) {
      console.error('Create car error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);



// @route   PUT /api/cars/:id
// @desc    Update car listing
// @access  Private (Owner only)
router.put('/:id', auth, isOwner, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user owns this car
    if (car.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this car' });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('owner', 'name email phone');

    res.json(updatedCar);
  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/cars/:id
// @desc    Delete car listing
// @access  Private (Owner only)
router.delete('/:id', auth, isOwner, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user owns this car
    if (car.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this car' });
    }

    await Car.findByIdAndDelete(req.params.id);

    res.json({ message: 'Car removed' });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/cars/owner/my-cars
// @desc    Get current user's cars
// @access  Private (Owner only)
router.get('/owner/my-cars', auth, isOwner, async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id })
      .populate('owner', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(cars);
  } catch (error) {
    console.error('Get my cars error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;