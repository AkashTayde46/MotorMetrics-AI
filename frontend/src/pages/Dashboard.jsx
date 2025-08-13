// // import { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';
// // import { Car, Plus, MessageSquare, List, User, MapPin, Calendar } from 'lucide-react';
// // import axios from 'axios';
// // import { toast } from 'react-hot-toast'; // Change this line

// // const Dashboard = () => {
// //   const { user, isOwner, isBuyer } = useAuth();
// //   const [myCars, setMyCars] = useState([]);
// //   const [myRequests, setMyRequests] = useState([]);
// //   const [carRequests, setCarRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchDashboardData = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (!token) {
// //           navigate('/login');
// //           return;
// //         }

// //         // Fetch transactions for both buyers and owners
// //         const transactionsResponse = await axios.get('/transactions/my-requests', {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         });

// //         const transactions = transactionsResponse.data;

// //         if (isOwner) {
// //           // Fetch owner's cars
// //           const carsResponse = await axios.get('/cars/owner/my-cars', {
// //             headers: {
// //               Authorization: `Bearer ${token}`
// //             }
// //           });
// //           setMyCars(carsResponse.data);

// //           // Filter transactions where user is seller
// //           const ownerRequests = transactions.filter(t => t.seller._id === user._id);
// //           setCarRequests(ownerRequests);
// //         }

// //         if (isBuyer) {
// //           // Filter transactions where user is buyer
// //           const buyerRequests = transactions.filter(t => t.buyer._id === user._id);
// //           setMyRequests(buyerRequests);
// //         }

// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching dashboard data:', error);
// //         toast.error('Failed to load dashboard data');
// //         setLoading(false);
// //       }
// //     };

// //     fetchDashboardData();
// //   }, [isOwner, isBuyer, navigate, user]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //       {/* Welcome Section */}
// //       <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-6 text-white mb-8">
// //         <h1 className="text-3xl font-bold mb-2">
// //           Welcome back, {user.name}!
// //         </h1>
// //         <p className="text-blue-100">
// //           {isOwner ? 'Manage your car listings and view requests' : 'Track your rental and purchase requests'}
// //         </p>
// //       </div>

// //       {/* Quick Stats */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //         {isOwner && (
// //           <>
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <div className="flex items-center">
// //                 <Car className="h-8 w-8 text-blue-600 mr-3" />
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-600">My Cars</p>
// //                   <p className="text-2xl font-bold text-gray-900">{myCars.length}</p>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <div className="flex items-center">
// //                 <MessageSquare className="h-8 w-8 text-green-600 mr-3" />
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-600">Pending Requests</p>
// //                   <p className="text-2xl font-bold text-gray-900">
// //                     {carRequests.filter(req => req.status === 'pending').length}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <div className="flex items-center">
// //                 <List className="h-8 w-8 text-purple-600 mr-3" />
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-600">Total Requests</p>
// //                   <p className="text-2xl font-bold text-gray-900">{carRequests.length}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         )}

// //         {isBuyer && (
// //           <>
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <div className="flex items-center">
// //                 <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-600">My Requests</p>
// //                   <p className="text-2xl font-bold text-gray-900">{myRequests.length}</p>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <div className="flex items-center">
// //                 <Calendar className="h-8 w-8 text-green-600 mr-3" />
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-600">Pending</p>
// //                   <p className="text-2xl font-bold text-gray-900">
// //                     {myRequests.filter(req => req.status === 'pending').length}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <div className="flex items-center">
// //                 <User className="h-8 w-8 text-purple-600 mr-3" />
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-600">Completed</p>
// //                   <p className="text-2xl font-bold text-gray-900">
// //                     {myRequests.filter(req => req.status === 'completed').length}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>

// //       {/* Action Buttons */}
// //       <div className="mb-8">
// //         {isOwner && (
// //           <Link
// //             to="/add-car"
// //             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
// //           >
// //             <Plus className="h-4 w-4 mr-2" />
// //             Add New Car
// //           </Link>
// //         )}
// //       </div>

// //       {/* Content Sections */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //         {/* My Cars (Owner Only) */}
// //         {isOwner && (
// //           <div className="bg-white rounded-lg shadow">
// //             <div className="px-6 py-4 border-b border-gray-200">
// //               <h2 className="text-lg font-medium text-gray-900">My Cars</h2>
// //             </div>
// //             <div className="p-6">
// //               {myCars.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //                   <p className="text-gray-500 mb-4">You haven't listed any cars yet</p>
// //                   <Link
// //                     to="/add-car"
// //                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
// //                   >
// //                     <Plus className="h-4 w-4 mr-2" />
// //                     Add Your First Car
// //                   </Link>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {myCars.slice(0, 3).map((car) => (
// //                     <div key={car._id} className="flex items-center space-x-4 p-4 border rounded-lg">
// //                       <div className="flex-shrink-0">
// //                         {car.images && car.images.length > 0 ? (
// //                           <img
// //                             src={`https://motormetrics-ai.onrender.com/${car.images[0]}`}
// //                             alt={car.title}
// //                             className="h-16 w-16 object-cover rounded"
// //                           />
// //                         ) : (
// //                           <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
// //                             <Car className="h-8 w-8 text-gray-400" />
// //                           </div>
// //                         )}
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <p className="text-sm font-medium text-gray-900 truncate">
// //                           {car.brand} {car.model}
// //                         </p>
// //                         <p className="text-sm text-gray-500">
// //                           {car.year} • ${car.price.toLocaleString()}
// //                         </p>
// //                         <p className="text-sm text-gray-500">
// //                           <MapPin className="h-3 w-3 inline mr-1" />
// //                           {car.location.city}, {car.location.state}
// //                         </p>
// //                       </div>
// //                       <div className="flex-shrink-0">
// //                         <Link
// //                           to={`/edit-car/${car._id}`}
// //                           className="text-blue-600 hover:text-blue-500 text-sm font-medium"
// //                         >
// //                           Edit
// //                         </Link>
// //                       </div>
// //                     </div>
// //                   ))}
// //                   {myCars.length > 3 && (
// //                     <div className="text-center">
// //                       <Link
// //                         to="/cars"
// //                         className="text-blue-600 hover:text-blue-500 text-sm font-medium"
// //                       >
// //                         View all {myCars.length} cars
// //                       </Link>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* My Requests (Buyer Only) */}
// //         {isBuyer && (
// //           <div className="bg-white rounded-lg shadow">
// //             <div className="px-6 py-4 border-b border-gray-200">
// //               <h2 className="text-lg font-medium text-gray-900">My Requests</h2>
// //             </div>
// //             <div className="p-6">
// //               {myRequests.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //                   <p className="text-gray-500 mb-4">You haven't made any requests yet</p>
// //                   <Link
// //                     to="/cars"
// //                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
// //                   >
// //                     Browse Cars
// //                   </Link>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {myRequests.slice(0, 3).map((request) => (
// //                     <div key={request._id} className="flex items-center space-x-4 p-4 border rounded-lg">
// //                       <div className="flex-shrink-0">
// //                         {request.car.images && request.car.images.length > 0 ? (
// //                           <img
// //                             src={`https://motormetrics-ai.onrender.com/${request.car.images[0]}`}
// //                             alt={request.car.title}
// //                             className="h-16 w-16 object-cover rounded"
// //                           />
// //                         ) : (
// //                           <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
// //                             <Car className="h-8 w-8 text-gray-400" />
// //                           </div>
// //                         )}
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <p className="text-sm font-medium text-gray-900 truncate">
// //                           {request.car.brand} {request.car.model}
// //                         </p>
// //                                                  <p className="text-sm text-gray-500">
// //                            {request.type} • ${request.amount.toLocaleString()}
// //                          </p>
// //                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
// //                           request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
// //                           request.status === 'accepted' ? 'bg-green-100 text-green-800' :
// //                           request.status === 'rejected' ? 'bg-red-100 text-red-800' :
// //                           'bg-gray-100 text-gray-800'
// //                         }`}>
// //                           {request.status}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   ))}
// //                   {myRequests.length > 3 && (
// //                     <div className="text-center">
// //                       <Link
// //                         to="/my-requests"
// //                         className="text-blue-600 hover:text-blue-500 text-sm font-medium"
// //                       >
// //                         View all {myRequests.length} requests
// //                       </Link>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Car Requests (Owner Only) */}
// //         {isOwner && (
// //           <div className="bg-white rounded-lg shadow">
// //             <div className="px-6 py-4 border-b border-gray-200">
// //               <h2 className="text-lg font-medium text-gray-900">Car Requests</h2>
// //             </div>
// //             <div className="p-6">
// //               {carRequests.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //                   <p className="text-gray-500">No requests for your cars yet</p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {carRequests.slice(0, 3).map((request) => (
// //                     <div key={request._id} className="flex items-center space-x-4 p-4 border rounded-lg">
// //                       <div className="flex-shrink-0">
// //                         {request.car.images && request.car.images.length > 0 ? (
// //                           <img
// //                             src={`https://motormetrics-ai.onrender.com/${request.car.images[0]}`}
// //                             alt={request.car.title}
// //                             className="h-16 w-16 object-cover rounded"
// //                           />
// //                         ) : (
// //                           <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
// //                             <Car className="h-8 w-8 text-gray-400" />
// //                           </div>
// //                         )}
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <p className="text-sm font-medium text-gray-900 truncate">
// //                           {request.car.brand} {request.car.model}
// //                         </p>
// //                         <p className="text-sm text-gray-500">
// //                           Requested by {request.buyer.name}
// //                         </p>
// //                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
// //                           request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
// //                           request.status === 'accepted' ? 'bg-green-100 text-green-800' :
// //                           request.status === 'rejected' ? 'bg-red-100 text-red-800' :
// //                           'bg-gray-100 text-gray-800'
// //                         }`}>
// //                           {request.status}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   ))}
// //                   {carRequests.length > 3 && (
// //                     <div className="text-center">
// //                       <Link
// //                         to="/my-cars-requests"
// //                         className="text-blue-600 hover:text-blue-500 text-sm font-medium"
// //                       >
// //                         View all {carRequests.length} requests
// //                       </Link>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { Car, Plus, MessageSquare, List, User, MapPin, Calendar } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const Dashboard = () => {
//   const { user, isOwner, isBuyer } = useAuth();
//   const [myCars, setMyCars] = useState([]);
//   const [myRequests, setMyRequests] = useState([]);
//   const [carRequests, setCarRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         // Fetch transactions for both buyers and owners
//         const transactionsResponse = await axios.get('/transactions/my-requests', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         const transactions = transactionsResponse.data;

//         if (isOwner) {
//           // Fetch owner's cars
//           const carsResponse = await axios.get('/cars/owner/my-cars', {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//           setMyCars(carsResponse.data);

//           // Filter transactions where user is seller
//           const ownerRequests = transactions.filter(t => t.seller?._id === user?._id);
//           setCarRequests(ownerRequests);
//         }

//         if (isBuyer) {
//           // Filter transactions where user is buyer
//           const buyerRequests = transactions.filter(t => t.buyer?._id === user?._id);
//           setMyRequests(buyerRequests);
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         toast.error('Failed to load dashboard data');
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [isOwner, isBuyer, navigate, user]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-6 text-white mb-8">
//         <h1 className="text-3xl font-bold mb-2">
//           Welcome back, {user?.name}!
//         </h1>
//         <p className="text-blue-100">
//           {isOwner ? 'Manage your car listings and view requests' : 'Track your rental and purchase requests'}
//         </p>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {isOwner && (
//           <>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <Car className="h-8 w-8 text-blue-600 mr-3" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">My Cars</p>
//                   <p className="text-2xl font-bold text-gray-900">{myCars.length}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <MessageSquare className="h-8 w-8 text-green-600 mr-3" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Pending Requests</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {carRequests.filter(req => req.status === 'pending').length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <List className="h-8 w-8 text-purple-600 mr-3" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Requests</p>
//                   <p className="text-2xl font-bold text-gray-900">{carRequests.length}</p>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {isBuyer && (
//           <>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">My Requests</p>
//                   <p className="text-2xl font-bold text-gray-900">{myRequests.length}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <Calendar className="h-8 w-8 text-green-600 mr-3" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Pending</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {myRequests.filter(req => req.status === 'pending').length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <User className="h-8 w-8 text-purple-600 mr-3" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Completed</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {myRequests.filter(req => req.status === 'completed').length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="mb-8">
//         {isOwner && (
//           <Link
//             to="/add-car"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add New Car
//           </Link>
//         )}
//       </div>

//       {/* Content Sections */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* My Cars (Owner Only) */}
//         {isOwner && (
//           <div className="bg-white rounded-lg shadow">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-medium text-gray-900">My Cars</h2>
//             </div>
//             <div className="p-6">
//               {myCars.length === 0 ? (
//                 <div className="text-center py-8">
//                   <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500 mb-4">You haven't listed any cars yet</p>
//                   <Link
//                     to="/add-car"
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
//                   >
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add Your First Car
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {myCars.slice(0, 3).map((car) => (
//                     <div key={car._id} className="flex items-center space-x-4 p-4 border rounded-lg">
//                       <div className="flex-shrink-0">
//                         {/* UPDATED LINE */}
//                         {car?.images?.length > 0 ? (
//                           <img
//                             src={`https://motormetrics-ai.onrender.com/${car.images[0]}`}
//                             alt={car.title}
//                             className="h-16 w-16 object-cover rounded"
//                           />
//                         ) : (
//                           <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
//                             <Car className="h-8 w-8 text-gray-400" />
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-900 truncate">
//                           {car.brand} {car.model}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {car.year} • ${car.price.toLocaleString()}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           <MapPin className="h-3 w-3 inline mr-1" />
//                           {car.location?.city}, {car.location?.state}
//                         </p>
//                       </div>
//                       <div className="flex-shrink-0">
//                         <Link
//                           to={`/edit-car/${car._id}`}
//                           className="text-blue-600 hover:text-blue-500 text-sm font-medium"
//                         >
//                           Edit
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                   {myCars.length > 3 && (
//                     <div className="text-center">
//                       <Link
//                         to="/cars"
//                         className="text-blue-600 hover:text-blue-500 text-sm font-medium"
//                       >
//                         View all {myCars.length} cars
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* My Requests (Buyer Only) */}
//         {isBuyer && (
//           <div className="bg-white rounded-lg shadow">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-medium text-gray-900">My Requests</h2>
//             </div>
//             <div className="p-6">
//               {myRequests.length === 0 ? (
//                 <div className="text-center py-8">
//                   <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500 mb-4">You haven't made any requests yet</p>
//                   <Link
//                     to="/cars"
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
//                   >
//                     Browse Cars
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {myRequests.slice(0, 3).map((request) => (
//                     <div key={request._id} className="flex items-center space-x-4 p-4 border rounded-lg">
//                       <div className="flex-shrink-0">
//                         {/* UPDATED LINE */}
//                         {request.car?.images?.length > 0 ? (
//                           <img
//                             src={`https://motormetrics-ai.onrender.com/${request.car.images[0]}`}
//                             alt={request.car.title}
//                             className="h-16 w-16 object-cover rounded"
//                           />
//                         ) : (
//                           <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
//                             <Car className="h-8 w-8 text-gray-400" />
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-900 truncate">
//                           {request.car?.brand} {request.car?.model}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {request.type} • ${request.amount.toLocaleString()}
//                         </p>
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                           request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                           request.status === 'accepted' ? 'bg-green-100 text-green-800' :
//                           request.status === 'rejected' ? 'bg-red-100 text-red-800' :
//                           'bg-gray-100 text-gray-800'
//                         }`}>
//                           {request.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                   {myRequests.length > 3 && (
//                     <div className="text-center">
//                       <Link
//                         to="/my-requests"
//                         className="text-blue-600 hover:text-blue-500 text-sm font-medium"
//                       >
//                         View all {myRequests.length} requests
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Car Requests (Owner Only) */}
//         {isOwner && (
//           <div className="bg-white rounded-lg shadow">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-medium text-gray-900">Car Requests</h2>
//             </div>
//             <div className="p-6">
//               {carRequests.length === 0 ? (
//                 <div className="text-center py-8">
//                   <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500">No requests for your cars yet</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {carRequests.slice(0, 3).map((request) => (
//                     <div key={request._id} className="flex items-center space-x-4 p-4 border rounded-lg">
//                       <div className="flex-shrink-0">
//                         {/* UPDATED LINE */}
//                         {request.car?.images?.length > 0 ? (
//                           <img
//                             src={`https://motormetrics-ai.onrender.com/${request.car.images[0]}`}
//                             alt={request.car.title}
//                             className="h-16 w-16 object-cover rounded"
//                           />
//                         ) : (
//                           <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
//                             <Car className="h-8 w-8 text-gray-400" />
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-900 truncate">
//                           {request.car?.brand} {request.car?.model}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Requested by {request.buyer?.name}
//                         </p>
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                           request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                           request.status === 'accepted' ? 'bg-green-100 text-green-800' :
//                           request.status === 'rejected' ? 'bg-red-100 text-red-800' :
//                           'bg-gray-100 text-gray-800'
//                         }`}>
//                           {request.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                   {carRequests.length > 3 && (
//                     <div className="text-center">
//                       <Link
//                         to="/my-cars-requests"
//                         className="text-blue-600 hover:text-blue-500 text-sm font-medium"
//                       >
//                         View all {carRequests.length} requests
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Car, Plus, MessageSquare, List, User, MapPin, Calendar } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { user, isOwner, isBuyer } = useAuth();
  const [myCars, setMyCars] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [carRequests, setCarRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const transactionsResponse = await axios.get('/transactions/my-requests', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const transactions = transactionsResponse.data;

        if (isOwner) {
          const carsResponse = await axios.get('/cars/owner/my-cars', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMyCars(carsResponse.data);
          const ownerRequests = transactions.filter(t => t.seller?._id === user?._id);
          setCarRequests(ownerRequests);
        }
        if (isBuyer) {
          const buyerRequests = transactions.filter(t => t.buyer?._id === user?._id);
          setMyRequests(buyerRequests);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
        toast.error('Failed to load dashboard');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isOwner, isBuyer, navigate, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      
      {/* Welcome Section with Animated Background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            Welcome back, {user?.name}!
          </h1>
          <p className="text-lg text-gray-200">
            {isOwner
              ? "Manage your car listings and view customer requests"
              : "Track your rental and purchase requests easily"}
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isOwner && (
            <>
              <StatCard delay={0} icon={<Car className="h-8 w-8" />} title="My Cars" value={myCars.length} />
              <StatCard delay={100} icon={<MessageSquare className="h-8 w-8" />} title="Pending Requests" value={carRequests.filter(r => r.status === 'pending').length} />
              <StatCard delay={200} icon={<List className="h-8 w-8" />} title="Total Requests" value={carRequests.length} />
            </>
          )}
          {isBuyer && (
            <>
              <StatCard delay={0} icon={<MessageSquare className="h-8 w-8" />} title="My Requests" value={myRequests.length} />
              <StatCard delay={100} icon={<Calendar className="h-8 w-8" />} title="Pending" value={myRequests.filter(r => r.status === 'pending').length} />
              <StatCard delay={200} icon={<User className="h-8 w-8" />} title="Completed" value={myRequests.filter(r => r.status === 'completed').length} />
            </>
          )}
        </div>
      </section>

      {/* Lists Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
        {isOwner && (
          <GlassCard title="My Cars" delay={0}>
            {myCars.length === 0 ? (
              <EmptyState message="You haven't listed any cars yet" link="/add-car" btn="Add Your First Car" />
            ) : (
              <ListItems items={myCars} type="car" />
            )}
          </GlassCard>
        )}
        {isBuyer && (
          <GlassCard title="My Requests" delay={100}>
            {myRequests.length === 0 ? (
              <EmptyState message="You haven't made any requests yet" link="/cars" btn="Browse Cars" />
            ) : (
              <ListItems items={myRequests} type="request" />
            )}
          </GlassCard>
        )}
        {isOwner && (
          <GlassCard title="Car Requests" delay={200}>
            {carRequests.length === 0 ? (
              <EmptyState message="No requests for your cars yet" />
            ) : (
              <ListItems items={carRequests} type="ownerRequest" />
            )}
          </GlassCard>
        )}
      </section>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

/* Reusable Components */
const StatCard = ({ icon, title, value, delay }) => (
  <div
    className="glass-card p-6 rounded-xl shadow-xl text-white flex items-center space-x-4 backdrop-blur-md border border-white/10 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg">{icon}</div>
    <div>
      <p className="text-sm text-gray-300">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const GlassCard = ({ title, children, delay }) => (
  <div
    className="glass-card p-6 rounded-xl shadow-xl backdrop-blur-md border border-white/10 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const EmptyState = ({ message, link, btn }) => (
  <div className="text-center text-gray-300 py-8">
    <Car className="h-12 w-12 mx-auto mb-4" />
    <p className="mb-4">{message}</p>
    {link && (
      <Link
        to={link}
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition"
      >
        {btn}
      </Link>
    )}
  </div>
);

const ListItems = ({ items, type }) => (
  <div className="space-y-4">
    {items.slice(0, 3).map((item) => (
      <div key={item._id} className="p-4 bg-white/5 rounded-lg flex items-center space-x-4 hover:bg-white/10 transition">
        <div className="flex-shrink-0">
          {(type === "car" && item.images?.length > 0) || (type !== "car" && item.car?.images?.length > 0) ? (
            <img
              src={`https://motormetrics-ai.onrender.com/${type === "car" ? item.images[0] : item.car.images}`}
              alt={type === "car" ? item.brand : item.car.brand}
              className="h-16 w-16 object-cover rounded-md"
            />
          ) : (
            <Car className="h-8 w-8 text-gray-400" />
          )}
        </div>
        <div>
          <p className="font-semibold">
            {type === "car" ? `${item.brand} ${item.model}` : `${item.car?.brand} ${item.car?.model}`}
          </p>
          <p className="text-gray-400 text-sm">{type === "car" ? `$${item.price}` : item.status}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Dashboard;

