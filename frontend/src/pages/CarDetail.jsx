// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { MapPin, Calendar, DollarSign, User, Phone, Mail, X } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const CarDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showContactModal, setShowContactModal] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await axios.get(`/cars/${id}`);
//         setCar(response.data);
//       } catch (error) {
//         console.error('Error fetching car:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCar();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!car) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Car not found</h2>
//           <p className="text-gray-600">The car you're looking for doesn't exist.</p>
//         </div>
//       </div>
//     );
//   }

//   const handleTransaction = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please login to continue');
//       navigate('/login');
//       return;
//     }

//     navigate(`/transaction/${car._id}`, {
//       state: {
//         car: car,
//         type: car.listingType
//       }
//     });
//   };

//   const handleContact = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('Please login to contact the owner');
//         navigate('/login');
//         return;
//       }

//       await axios.post(`/api/messages`, {
//         recipient: car.owner._id,
//         carId: car._id,
//         message
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       toast.success('Message sent successfully');
//       setShowContactModal(false);
//       setMessage('');
//     } catch (error) {
//       console.error('Contact error:', error);
//       toast.error('Failed to send message');
//     }
//   };

//   const ActionButtons = () => (
//     <div className="flex space-x-4">
//       <button 
//         onClick={handleTransaction}
//         className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
//       >
//         {car.listingType === 'rent' ? 'Rent This Car' : 'Buy This Car'}
//       </button>
//       <button 
//         onClick={() => setShowContactModal(true)}
//         className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-300"
//       >
//         Contact Owner
//       </button>
//     </div>
//   );

//   const ContactModal = () => (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${showContactModal ? '' : 'hidden'}`}>
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Contact Owner</h3>
//           <button 
//             onClick={() => setShowContactModal(false)}
//             className="text-gray-400 hover:text-gray-500"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         <form onSubmit={handleContact}>
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="w-full border rounded-lg p-3 mb-4"
//             rows="4"
//             placeholder="Write your message here..."
//             required
//           ></textarea>
//           <button 
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Car Images */}
//         <div>
//           <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
//             {car.images && car.images.length > 0 ? (
//               <img
//                 src={`http://localhost:5000/${car.images[0]}`}
//                 alt={car.title}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             ) : (
//               <span className="text-gray-400">No Image Available</span>
//             )}
//           </div>
//         </div>

//         {/* Car Details */}
//         <div>
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {car.brand} {car.model}
//             </h1>
//             <p className="text-xl text-gray-600 mb-4">{car.title}</p>
//             <div className="flex items-center mb-4">
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 car.listingType === 'rent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
//               }`}>
//                 {car.listingType === 'rent' ? 'For Rent' : 'For Sale'}
//               </span>
//             </div>
//             <div className="text-3xl font-bold text-blue-600 mb-6">
//               ${car.price.toLocaleString()}
//             </div>
//           </div>

//           {/* Car Specifications */}
//           <div className="bg-gray-50 rounded-lg p-6 mb-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600">Year</p>
//                 <p className="font-medium">{car.year}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Mileage</p>
//                 <p className="font-medium">{car.mileage.toLocaleString()} km</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Fuel Type</p>
//                 <p className="font-medium">{car.fuelType}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Transmission</p>
//                 <p className="font-medium">{car.transmission}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Color</p>
//                 <p className="font-medium">{car.color}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Location</p>
//                 <p className="font-medium flex items-center">
//                   <MapPin className="h-4 w-4 mr-1" />
//                   {car.location.city}, {car.location.state}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Owner Information */}
//           <div className="bg-white border rounded-lg p-6 mb-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Information</h3>
//             <div className="flex items-center space-x-4">
//               <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
//                 <User className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="font-medium">{car.owner.name}</p>
//                 <p className="text-sm text-gray-600 flex items-center">
//                   <Mail className="h-4 w-4 mr-1" />
//                   {car.owner.email}
//                 </p>
//                 {car.owner.phone && (
//                   <p className="text-sm text-gray-600 flex items-center">
//                     <Phone className="h-4 w-4 mr-1" />
//                     {car.owner.phone}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
//             <p className="text-gray-600 leading-relaxed">{car.description}</p>
//           </div>

//           <ActionButtons />
//           <ContactModal />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarDetail;
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, X as Close, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">Car not found</div>
    );
  }

  const handleTransaction = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }
    navigate(`/transaction/${car._id}`, { state: { car, type: car.listingType } });
  };

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to contact the owner');
        navigate('/login');
        return;
      }
      await axios.post(`/api/messages`, {
        recipient: car.owner._id,
        carId: car._id,
        message
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Message sent successfully');
      setShowContactModal(false);
      setMessage('');
    } catch {
      toast.error('Failed to send message');
    }
  };

  /* Action Buttons */
  const ActionButtons = () => (
    <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up">
      <button
        onClick={handleTransaction}
        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transform hover:scale-105 transition"
      >
        {car.listingType === 'rent' ? 'Rent This Car' : 'Buy This Car'}
      </button>
      <button
        onClick={() => setShowContactModal(true)}
        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-gray-100 rounded-lg font-medium shadow-lg transition"
      >
        Contact Owner
      </button>
    </div>
  );

  /* Contact Modal */
  const ContactModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 ${showContactModal ? '' : 'hidden'}`}>
      <div className="glass-card w-full max-w-md rounded-xl p-6 animate-fade-in-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Contact Owner</h3>
          <button onClick={() => setShowContactModal(false)} className="text-gray-400 hover:text-white">
            <Close className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleContact}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows="4"
            placeholder="Write your message here..."
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Image */}
        <div className="h-full animate-fade-in-up">
          <div className="rounded-xl overflow-hidden shadow-lg bg-white/5 border border-white/10">
            {car.images?.[0] ? (
              <img
                src={car.images[0]} // ✅ Use first Cloudinary image directly
                alt={car.title}
                className="w-full h-[28rem] object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-[28rem] flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-8">
          {/* Intro */}
          <div className="animate-fade-in-up">
            <h1 className="text-4xl font-bold mb-2">{car.brand} {car.model}</h1>
            <p className="text-lg text-gray-300 mb-4">{car.title}</p>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${car.listingType === 'rent' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
              {car.listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ${car.price.toLocaleString()}
            </div>
          </div>

          {/* Specs */}
          <div className="glass-card rounded-xl p-6 animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <Spec label="Year" value={car.year} />
              <Spec label="Mileage" value={`${car.mileage.toLocaleString()} km`} />
              <Spec label="Fuel Type" value={car.fuelType} />
              <Spec label="Transmission" value={car.transmission} />
              <Spec label="Color" value={car.color} />
              <Spec label="Location" value={`${car.location.city}, ${car.location.state}`} icon={<MapPin className="h-4 w-4 mr-1" />} />
            </div>
          </div>

          {/* Owner Info */}
          <div className="glass-card rounded-xl p-6 animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-4">Owner</h3>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-300" />
              </div>
              <div>
                <p className="font-medium">{car.owner.name}</p>
                <p className="text-sm text-gray-300 flex items-center"><Mail className="h-4 w-4 mr-1" /> {car.owner.email}</p>
                {car.owner.phone && <p className="text-sm text-gray-300 flex items-center"><Phone className="h-4 w-4 mr-1" /> {car.owner.phone}</p>}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-300 leading-relaxed">{car.description}</p>
          </div>

          <ActionButtons />
        </div>
      </div>

      <ContactModal />

      {/* Styles */}
      <style jsx>{`
        .glass-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1);}
        @keyframes fade-in-up { from {opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

const Spec = ({ label, value, icon }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="font-medium flex items-center">{icon}{value}</p>
  </div>
);

export default CarDetail;
