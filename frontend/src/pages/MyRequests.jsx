// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MessageSquare, Calendar, DollarSign, User } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '../contexts/AuthContext';

// const MyRequests = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get('/transactions/my-requests', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         // Filter requests where user is the buyer
//         const myRequests = response.data.filter(req => req.buyer._id === user._id);
//         setRequests(myRequests);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//         toast.error('Failed to load requests');
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [navigate, user]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">My Requests</h1>
//         <p className="text-gray-600">Track your rental and purchase requests</p>
//       </div>

//       {requests.length === 0 ? (
//         <div className="bg-white rounded-lg shadow p-8">
//           <div className="text-center py-12">
//             <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Requests Yet</h3>
//             <p className="text-gray-600 mb-6">You haven't made any rental or purchase requests yet.</p>
//             <button
//               onClick={() => navigate('/cars')}
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
//             >
//               Browse Cars
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="grid gap-6">
//           {requests.map((request) => (
//             <div key={request._id} className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">
//                   {request.car.images && request.car.images.length > 0 ? (
//                     <img
//                       src={`https://motormetrics-ai.onrender.com/${request.car.images[0]}`}
//                       alt={request.car.brand}
//                       className="h-20 w-20 object-cover rounded-lg"
//                     />
//                   ) : (
//                     <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
//                       <MessageSquare className="h-8 w-8 text-gray-400" />
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-medium text-gray-900">
//                       {request.car.brand} {request.car.model}
//                     </h3>
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                       request.status === 'accepted' ? 'bg-green-100 text-green-800' :
//                       request.status === 'rejected' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {request.status}
//                     </span>
//                   </div>
                  
//                   <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Calendar className="h-4 w-4 mr-2" />
//                       <span>Start: {new Date(request.startDate).toLocaleDateString()}</span>
//                     </div>
//                     {request.duration && (
//                       <div className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-2" />
//                         <span>Duration: {request.duration} days</span>
//                       </div>
//                     )}
//                     <div className="flex items-center">
//                       <DollarSign className="h-4 w-4 mr-2" />
//                       <span>Amount: ${request.amount.toLocaleString()}</span>
//                     </div>
//                   </div>
                  
//                   <div className="mt-2 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <User className="h-4 w-4 mr-2" />
//                       <span>Owner: {request.seller.name}</span>
//                     </div>
//                   </div>
                  
//                   <div className="mt-3 text-sm text-gray-500">
//                     <p>Type: {request.type === 'rent' ? 'Rental' : 'Purchase'}</p>
//                     <p>Payment Method: {request.paymentMethod}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyRequests; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Calendar, DollarSign, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MyRequests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_URL}/api/transactions/buyer-requests`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching buyer requests:', error);
        toast.error('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchRequests();
  }, [navigate, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="relative py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent ${isVisible ? 'animate-fade-in-up' : ''}`}>
          My Requests
        </h1>
        <p className="text-gray-300">Track your rental and purchase requests</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-16">
        {/* Filter Buttons */}
        <div className="glass-card p-4 rounded-xl mb-8 animate-fade-in-up flex flex-wrap gap-3">
          {['all', 'pending', 'accepted', 'completed', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
                statusFilter === status
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-200 hover:bg-white/20'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({status === 'all' ? requests.length : requests.filter(r => r.status === status).length})
            </button>
          ))}
        </div>

        {/* Requests List */}
        {requests.length === 0 ? (
          <EmptyState navigate={navigate} />
        ) : (
          <div className="space-y-6">
            {requests
              .filter(r => statusFilter === 'all' || r.status === statusFilter)
              .map((req, index) => (
                <div
                  key={req._id}
                  className="glass-card p-6 rounded-xl animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    {req.car.images?.[0] ? (
                      <img
                        src={`${API_URL}/${req.car.images[0]}`}
                        alt={req.car.brand}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="h-20 w-20 bg-white/10 rounded-lg flex items-center justify-center">
                        <List className="h-8 w-8 text-gray-300" />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{req.car.brand} {req.car.model}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(req.status)}`}>
                          {req.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-3 mt-2 text-gray-300 text-sm">
                        <Info icon={<User className="h-4 w-4" />} text={`Owner: ${req.seller.name}`} />
                        {req.startDate && <Info icon={<Calendar className="h-4 w-4" />} text={`Start: ${new Date(req.startDate).toLocaleDateString()}`} />}
                        {req.duration && <Info icon={<Calendar className="h-4 w-4" />} text={`Duration: ${req.duration} days`} />}
                      </div>

                      <Info icon={<DollarSign className="h-4 w-4" />} text={`Amount: $${req.amount.toLocaleString()}`} />
                      <p className="mt-2 text-gray-400 text-sm">Type: {req.type === 'rent' ? 'Rental' : 'Purchase'} • Payment: {req.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {opacity:0; transform:translateY(20px);}
          to {opacity:1; transform:translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .glass-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
};

/* --- Helpers --- */
const statusBadge = (status) => ({
  pending: 'bg-yellow-500/20 text-yellow-300',
  accepted: 'bg-green-500/20 text-green-300',
  completed: 'bg-blue-500/20 text-blue-300',
  rejected: 'bg-red-500/20 text-red-300'
}[status] || 'bg-gray-500/20 text-gray-300');

const Info = ({ icon, text }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span>{text}</span>
  </div>
);

const EmptyState = ({ navigate }) => (
  <div className="glass-card p-8 rounded-xl text-center animate-fade-in-up">
    <List className="h-12 w-12 mx-auto mb-4 text-gray-400" />
    <h3 className="text-xl font-semibold mb-2">No Requests Yet</h3>
    <p className="text-gray-300 mb-6">You haven’t made any rental or purchase requests yet.</p>
    <button
      onClick={() => navigate('/cars')}
      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
    >
      Browse Cars
    </button>
  </div>
);

export default MyRequests;
