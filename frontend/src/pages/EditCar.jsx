import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit } from 'lucide-react';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement car update logic
    console.log('Updating car:', id);
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Car</h1>
        <p className="text-gray-600">Update your car listing</p>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center py-12">
          <Edit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Edit Car Feature</h3>
          <p className="text-gray-600 mb-6">This feature will be implemented to allow car owners to edit their listings.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCar; 