// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');

// // Import routes
// const authRoutes = require('./routes/auth');
// const carRoutes = require('./routes/cars');
// const transactionRoutes = require('./routes/transactions');
// const userRoutes = require('./routes/users');

// // Load environment variables
// dotenv.config({ path: './config.env' });

// const app = express();
// app.use(cors({
//   origin: process.env.FRONTEND_URL, // e.g. https://your-frontend.vercel.app
  
//   credentials: true
// }));
// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/car-website');

// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// mongoose.connection.once('open', () => {
//   console.log('MongoDB connected successfully');
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/cars', carRoutes);
// app.use('/api/transactions', transactionRoutes);
// app.use('/api/users', userRoutes);
// // Basic route
// app.get('/', (req, res) => {
//   res.json({ message: 'Car Website API is running!' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: './config.env' });

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',               // Local dev
  'https://motor-metrics-ai.vercel.app' // Production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like mobile apps, curl, Postman
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS policy: origin ${origin} not allowed`), false);
    }
    return callback(null, true);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// This ensures preflight OPTIONS requests are handled
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/car-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Import routes
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/users');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Car Website API is running!' });
});

// Global Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
