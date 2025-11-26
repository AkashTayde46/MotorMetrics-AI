import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        setUser(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address
            ? `${data.address.city || ''}, ${data.address.state || ''} ${data.address.pinCode || ''}`
            : ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      }
    };

    fetchUserProfile();
  }, [navigate, API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const addressParts = formData.address.split(',');
      const addressObj = {
        city: addressParts[0]?.trim() || '',
        state: addressParts[1]?.trim() || '',
        pinCode: addressParts[2]?.trim() || ''
      };

      const response = await axios.put(`${API_URL}/api/users/profile`, {
        ...formData,
        address: addressObj
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-gray-300 mb-8">Manage your account information</p>

        <div className="glass-card rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <User className="h-12 w-12 text-gray-400 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {['name', 'email', 'phone', 'address'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
                    {field === 'address' ? 'Address (City, State, PinCode)' : field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              ))}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-gray-300">
                <p><span className="font-medium">Phone:</span> {user.phone || 'Not provided'}</p>
                <p>
                  <span className="font-medium">Address:</span>{' '}
                  {user.address
                    ? `${user.address.city || ''}, ${user.address.state || ''} ${user.address.pinCode || ''}`
                    : 'Not provided'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animations and glass card */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Profile;
