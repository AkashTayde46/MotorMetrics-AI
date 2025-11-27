import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import MyRequests from './pages/MyRequests';
import MyCarsRequests from './pages/MyCarsRequests';
import Profile from './pages/Profile';
import Transaction from './pages/Transaction';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PredictorPage from './pages/PredictorPage';
import EMICalculator from './pages/EMICalculator';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/predict'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/predict" element={<PredictorPage />} />
            <Route path="/emicalculator" element={<EMICalculator />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-car"
            element={
              <ProtectedRoute requireOwner>
                <AddCar />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-car/:id"
            element={
              <ProtectedRoute requireOwner>
                <EditCar />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-requests"
            element={
              <ProtectedRoute requireBuyer>
                <MyRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-cars-requests"
            element={
              <ProtectedRoute requireOwner>
                <MyCarsRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transaction/:id"
            element={
              <ProtectedRoute>
                <Transaction />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
