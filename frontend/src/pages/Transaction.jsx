import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Calendar, CreditCard, DollarSign } from 'lucide-react';

const Transaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, type } = location.state;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    duration: type === 'rent' ? 1 : null,
    paymentMethod: 'card'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to continue');
        navigate('/login');
        return;
      }

      const response = await axios.post('/transactions', {
        carId: car._id,
        type,
        amount: type === 'rent' ? car.price * formData.duration : car.price,
        startDate: type === 'rent' ? formData.startDate : null,
        duration: formData.duration,
        paymentMethod: formData.paymentMethod
      }, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success('Transaction successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Transaction error:', error);
      toast.error(error.response?.data?.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const totalAmount = type === 'rent' 
    ? car.price * (formData.duration || 1)
    : car.price;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {type === 'rent' ? 'Rent Car' : 'Purchase Car'}
      </h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Car Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Model</p>
            <p className="font-medium">{car.brand} {car.model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Year</p>
            <p className="font-medium">{car.year}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          {type === 'rent' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="startDate"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.startDate}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <Calendar className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
              </div>
            </div>
          )}

          {type === 'rent' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (days)
              </label>
              <input
                type="number"
                name="duration"
                min="1"
                required
                value={formData.duration}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="card">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-blue-600">${totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Confirm Transaction'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Transaction;