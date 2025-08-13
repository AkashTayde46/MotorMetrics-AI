// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { List, Calendar, DollarSign, User, Check, X } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '../contexts/AuthContext';

// const MyCarsRequests = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [statusFilter, setStatusFilter] = useState('all');

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get('/transactions/my-cars-requests', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         // No need to filter since the endpoint already returns only seller transactions
//         setRequests(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//         toast.error('Failed to load requests');
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [navigate, user]);

//   const handleStatusUpdate = async (requestId, status) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(`/transactions/${requestId}/status`, {
//         status
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       // Update the local state
//       setRequests(prev => prev.map(req => 
//         req._id === requestId ? { ...req, status } : req
//       ));

//       toast.success(`Request ${status} successfully`);
//     } catch (error) {
//       console.error('Error updating request status:', error);
//       toast.error('Failed to update request status');
//     }
//   };

//   const handleCompleteTransaction = async (requestId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(`/transactions/${requestId}/complete`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       // Update the local state
//       setRequests(prev => prev.map(req => 
//         req._id === requestId ? { ...req, status: 'completed' } : req
//       ));

//       toast.success('Transaction completed successfully');
//     } catch (error) {
//       console.error('Error completing transaction:', error);
//       toast.error('Failed to complete transaction');
//     }
//   };

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
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Requests</h1>
//         <p className="text-gray-600">Manage requests for your car listings</p>
//       </div>

//       {/* Transaction Status Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="flex items-center">
//             <div className="p-2 bg-yellow-100 rounded-full">
//               <List className="h-6 w-6 text-yellow-600" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-600">Pending</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {requests.filter(req => req.status === 'pending').length}
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 rounded-full">
//               <Check className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-600">Accepted</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {requests.filter(req => req.status === 'accepted').length}
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-full">
//               <Calendar className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-600">Completed</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {requests.filter(req => req.status === 'completed').length}
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="flex items-center">
//             <div className="p-2 bg-red-100 rounded-full">
//               <X className="h-6 w-6 text-red-600" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-600">Rejected</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {requests.filter(req => req.status === 'rejected').length}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Status Filter */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <div className="flex flex-wrap gap-2">
//           <button
//             onClick={() => setStatusFilter('all')}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               statusFilter === 'all'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             All ({requests.length})
//           </button>
//           <button
//             onClick={() => setStatusFilter('pending')}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               statusFilter === 'pending'
//                 ? 'bg-yellow-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Pending ({requests.filter(req => req.status === 'pending').length})
//           </button>
//           <button
//             onClick={() => setStatusFilter('accepted')}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               statusFilter === 'accepted'
//                 ? 'bg-green-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Accepted ({requests.filter(req => req.status === 'accepted').length})
//           </button>
//           <button
//             onClick={() => setStatusFilter('completed')}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               statusFilter === 'completed'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Completed ({requests.filter(req => req.status === 'completed').length})
//           </button>
//           <button
//             onClick={() => setStatusFilter('rejected')}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               statusFilter === 'rejected'
//                 ? 'bg-red-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Rejected ({requests.filter(req => req.status === 'rejected').length})
//           </button>
//         </div>
//       </div>

//       {requests.length === 0 ? (
//         <div className="bg-white rounded-lg shadow p-8">
//           <div className="text-center py-12">
//             <List className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Requests Yet</h3>
//             <p className="text-gray-600 mb-6">You haven't received any requests for your cars yet.</p>
//             <button
//               onClick={() => navigate('/dashboard')}
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="grid gap-6">
//           {requests
//             .filter(request => statusFilter === 'all' || request.status === statusFilter)
//             .map((request) => (
//             <div key={request._id} className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">
//                   {request.car.images && request.car.images.length > 0 ? (
//                     <img
//                       src={`http://localhost:5000/${request.car.images[0]}`}
//                       alt={request.car.brand}
//                       className="h-20 w-20 object-cover rounded-lg"
//                     />
//                   ) : (
//                     <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
//                       <List className="h-8 w-8 text-gray-400" />
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
//                       request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
//                       request.status === 'rejected' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {request.status}
//                     </span>
//                   </div>
                  
//                   <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <User className="h-4 w-4 mr-2" />
//                       <span>Requested by: {request.buyer.name}</span>
//                     </div>
//                     {request.startDate && (
//                       <div className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-2" />
//                         <span>Start: {new Date(request.startDate).toLocaleDateString()}</span>
//                       </div>
//                     )}
//                     {request.duration && (
//                       <div className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-2" />
//                         <span>Duration: {request.duration} days</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="mt-2 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <DollarSign className="h-4 w-4 mr-2" />
//                       <span>Amount: ${request.amount.toLocaleString()}</span>
//                     </div>
//                   </div>
                  
//                   <div className="mt-3 text-sm text-gray-500">
//                     <p>Type: {request.type === 'rent' ? 'Rental' : 'Purchase'}</p>
//                     <p>Payment Method: {request.paymentMethod}</p>
//                   </div>

//                   {/* Action buttons for pending requests */}
//                   {request.status === 'pending' && (
//                     <div className="mt-4 flex space-x-3">
//                       <button
//                         onClick={() => handleStatusUpdate(request._id, 'accepted')}
//                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                       >
//                         <Check className="h-4 w-4 mr-1" />
//                         Accept
//                       </button>
//                       <button
//                         onClick={() => handleStatusUpdate(request._id, 'rejected')}
//                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                       >
//                         <X className="h-4 w-4 mr-1" />
//                         Reject
//                       </button>
//                     </div>
//                   )}

//                   {/* Action buttons for accepted requests */}
//                   {request.status === 'accepted' && (
//                     <div className="mt-4 flex space-x-3">
//                       <button
//                         onClick={() => handleCompleteTransaction(request._id)}
//                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                       >
//                         <Check className="h-4 w-4 mr-1" />
//                         Complete Transaction
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyCarsRequests; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Calendar, DollarSign, User, Check, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const MyCarsRequests = () => {
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
        const response = await axios.get('/transactions/my-cars-requests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast.error('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [navigate, user]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/transactions/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(prev => prev.map(req => req._id === id ? { ...req, status } : req));
      toast.success(`Request ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleCompleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/transactions/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(prev => prev.map(req => req._id === id ? { ...req, status: 'completed' } : req));
      toast.success('Transaction completed');
    } catch {
      toast.error('Failed to complete transaction');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="relative py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent ${isVisible ? 'animate-fade-in-up' : ''}`}>
          Car Requests
        </h1>
        <p className="text-gray-300">Manage requests for your car listings</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-16">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statusCard('Pending', 'yellow', List, requests.filter(r => r.status === 'pending').length, 0)}
          {statusCard('Accepted', 'green', Check, requests.filter(r => r.status === 'accepted').length, 100)}
          {statusCard('Completed', 'blue', Calendar, requests.filter(r => r.status === 'completed').length, 200)}
          {statusCard('Rejected', 'red', X, requests.filter(r => r.status === 'rejected').length, 300)}
        </div>

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
                        src={`http://localhost:5000/${req.car.images}`}
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
                        <Info icon={<User className="h-4 w-4" />} text={`Requested by: ${req.buyer.name}`} />
                        {req.startDate && <Info icon={<Calendar className="h-4 w-4" />} text={`Start: ${new Date(req.startDate).toLocaleDateString()}`} />}
                        {req.duration && <Info icon={<Calendar className="h-4 w-4" />} text={`Duration: ${req.duration} days`} />}
                      </div>

                      <Info icon={<DollarSign className="h-4 w-4" />} text={`Amount: $${req.amount.toLocaleString()}`} />
                      <p className="mt-2 text-gray-400 text-sm">Type: {req.type} • Payment: {req.paymentMethod}</p>

                      {/* Action Buttons */}
                      {req.status === 'pending' && (
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={() => handleStatusUpdate(req._id, 'accepted')}
                            className="action-btn green"
                          >
                            <Check className="h-4 w-4 mr-1" /> Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(req._id, 'rejected')}
                            className="action-btn red"
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </button>
                        </div>
                      )}
                      {req.status === 'accepted' && (
                        <div className="mt-4">
                          <button
                            onClick={() => handleCompleteTransaction(req._id)}
                            className="action-btn blue"
                          >
                            <Check className="h-4 w-4 mr-1" /> Complete Transaction
                          </button>
                        </div>
                      )}
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
        .action-btn {
          display:inline-flex;
          align-items:center;
          padding:0.5rem 1rem;
          font-size:0.875rem;
          border-radius:0.5rem;
          font-weight:500;
          transition: all 0.2s;
        }
        .action-btn.green {
          background: linear-gradient(to right,#22c55e,#16a34a); color:white;
        }
        .action-btn.green:hover {
          background: linear-gradient(to right,#16a34a,#15803d);
        }
        .action-btn.red {
          background: linear-gradient(to right,#ef4444,#dc2626); color:white;
        }
        .action-btn.red:hover {
          background: linear-gradient(to right,#dc2626,#b91c1c);
        }
        .action-btn.blue {
          background: linear-gradient(to right,#3b82f6,#2563eb); color:white;
        }
        .action-btn.blue:hover {
          background: linear-gradient(to right,#2563eb,#1d4ed8);
        }
      `}</style>
    </div>
  );
};

/* --- Small UI Helpers --- */
const statusCard = (label, color, Icon, count, delay) => (
  <div
    className="glass-card p-5 rounded-xl shadow-lg animate-fade-in-up flex items-center space-x-4"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`p-3 bg-${color}-500/20 rounded-full`}>
      <Icon className={`h-6 w-6 text-${color}-400`} />
    </div>
    <div>
      <p className="text-sm text-gray-300">{label}</p>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  </div>
);

const Info = ({ icon, text }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span>{text}</span>
  </div>
);

const statusBadge = (status) => ({
  pending: 'bg-yellow-500/20 text-yellow-300',
  accepted: 'bg-green-500/20 text-green-300',
  completed: 'bg-blue-500/20 text-blue-300',
  rejected: 'bg-red-500/20 text-red-300'
}[status] || 'bg-gray-500/20 text-gray-300');

const EmptyState = ({ navigate }) => (
  <div className="glass-card p-8 rounded-xl text-center animate-fade-in-up">
    <List className="h-12 w-12 mx-auto mb-4 text-gray-400" />
    <h3 className="text-xl font-semibold mb-2">No Requests Yet</h3>
    <p className="text-gray-300 mb-6">You haven’t received any requests yet.</p>
    <button
      onClick={() => navigate('/dashboard')}
      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
    >
      Back to Dashboard
    </button>
  </div>
);

export default MyCarsRequests;
