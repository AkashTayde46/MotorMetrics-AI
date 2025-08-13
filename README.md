# CarShare - Car Rental and Sales Website

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that connects car owners with buyers and renters. Car owners can list their vehicles for rent or sale, while buyers can browse, search, and make requests for cars.

## Features

### For Car Owners
- Register as a car owner
- List cars for rent or sale with detailed information
- Manage car listings (add, edit, delete)
- View and respond to rental/purchase requests
- Track transaction status

### For Buyers/Renters
- Register as a buyer
- Browse available cars with advanced filtering
- Search cars by brand, model, location, price range
- Make rental or purchase requests
- Track request status and history

### General Features
- User authentication and authorization
- Responsive design with Tailwind CSS
- Real-time notifications
- Image upload support
- Advanced search and filtering
- Pagination for better performance

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **multer** - File upload handling

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **Tailwind CSS** - Styling

## Project Structure

```
car-website/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Car.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cars.js
│   │   └── transactions.js
│   ├── middleware/
│   │   └── auth.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── config.env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   └── layout/
│   │   │       ├── Navbar.jsx
│   │   │       └── Footer.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CarList.jsx
│   │   │   ├── CarDetail.jsx
│   │   │   ├── AddCar.jsx
│   │   │   ├── EditCar.jsx
│   │   │   ├── MyRequests.jsx
│   │   │   ├── MyCarsRequests.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `config.env.example` to `config.env` (if available)
   - Or create `config.env` with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/car-website
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

### Database Setup

1. **Install MongoDB locally** or use MongoDB Atlas
2. **Create a database** named `car-website`
3. **Update the MONGODB_URI** in your `config.env` file

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Cars
- `GET /api/cars` - Get all cars with filtering
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create new car listing (Owner only)
- `PUT /api/cars/:id` - Update car listing (Owner only)
- `DELETE /api/cars/:id` - Delete car listing (Owner only)
- `GET /api/cars/owner/my-cars` - Get user's cars (Owner only)
- `GET /api/cars/featured/featured` - Get featured cars

### Transactions
- `POST /api/transactions` - Create transaction request (Buyer only)
- `GET /api/transactions/my-requests` - Get user's requests (Buyer only)
- `GET /api/transactions/my-cars-requests` - Get car requests (Owner only)
- `PUT /api/transactions/:id/respond` - Respond to request (Owner only)
- `PUT /api/transactions/:id/complete` - Complete transaction (Owner only)
- `DELETE /api/transactions/:id` - Cancel transaction (Buyer only)

## Usage

### For Car Owners
1. Register as an "owner"
2. Add your cars with detailed information
3. View incoming requests for your cars
4. Accept or reject requests
5. Complete transactions

### For Buyers
1. Register as a "buyer"
2. Browse available cars
3. Use filters to find specific cars
4. Make rental or purchase requests
5. Track your request status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Enhancements

- [ ] Image upload functionality
- [ ] Payment integration
- [ ] Real-time messaging
- [ ] Reviews and ratings
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Email notifications
- [ ] Admin dashboard

## License

This project is licensed under the MIT License.

## Support

For support, email support@carshare.com or create an issue in the repository. 