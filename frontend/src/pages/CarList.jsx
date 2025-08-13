// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, Filter, MapPin, Calendar, DollarSign } from 'lucide-react';
// import axios from 'axios';

// const CarList = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     search: '',
//     brand: '',
//     model: '',
//     year: '',
//     fuelType: '',
//     transmission: '',
//     listingType: '',
//     minPrice: '',
//     maxPrice: '',
//     city: '',
//     state: ''
//   });
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     total: 0
//   });

//   const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
//   const transmissions = ['Manual', 'Automatic'];
//   const listingTypes = ['rent', 'sale'];

//   useEffect(() => {
//     fetchCars();
//   }, [filters, pagination.currentPage]);

//   const fetchCars = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams({
//         page: pagination.currentPage,
//         limit: 12,
//         ...filters
//       });

//       const response = await axios.get(`/cars?${params}`);
//       setCars(response.data.cars);
//       setPagination({
//         currentPage: parseInt(response.data.currentPage),
//         totalPages: response.data.totalPages,
//         total: response.data.total
//       });
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//     setPagination(prev => ({ ...prev, currentPage: 1 }));
//   };

//   const handlePageChange = (page) => {
//     setPagination(prev => ({ ...prev, currentPage: page }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       search: '',
//       brand: '',
//       model: '',
//       year: '',
//       fuelType: '',
//       transmission: '',
//       listingType: '',
//       minPrice: '',
//       maxPrice: '',
//       city: '',
//       state: ''
//     });
//     setPagination(prev => ({ ...prev, currentPage: 1 }));
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Cars</h1>
//         <p className="text-gray-600">Find the perfect car for your needs</p>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//           {/* Search */}
//           <div className="relative">
//             <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
//             <input
//               type="text"
//               placeholder="Search cars..."
//               value={filters.search}
//               onChange={(e) => handleFilterChange('search', e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Brand */}
//           <input
//             type="text"
//             placeholder="Brand"
//             value={filters.brand}
//             onChange={(e) => handleFilterChange('brand', e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />

//           {/* Model */}
//           <input
//             type="text"
//             placeholder="Model"
//             value={filters.model}
//             onChange={(e) => handleFilterChange('model', e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />

//           {/* Year */}
//           <input
//             type="number"
//             placeholder="Year"
//             value={filters.year}
//             onChange={(e) => handleFilterChange('year', e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
//           {/* Fuel Type */}
//           <select
//             value={filters.fuelType}
//             onChange={(e) => handleFilterChange('fuelType', e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Fuel Type</option>
//             {fuelTypes.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>

//           {/* Transmission */}
//           <select
//             value={filters.transmission}
//             onChange={(e) => handleFilterChange('transmission', e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Transmission</option>
//             {transmissions.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>

//           {/* Listing Type */}
//           <select
//             value={filters.listingType}
//             onChange={(e) => handleFilterChange('listingType', e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Listing Type</option>
//             {listingTypes.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>

//           {/* Min Price */}
//           <input
//             type="number"
//             placeholder="Min Price"
//             value={filters.minPrice}
//             onChange={(e) => handleFilterChange('minPrice', e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />

//           {/* Max Price */}
//           <input
//             type="number"
//             placeholder="Max Price"
//             value={filters.maxPrice}
//             onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />

//           {/* City */}
//           <input
//             type="text"
//             placeholder="City"
//             value={filters.city}
//             onChange={(e) => handleFilterChange('city', e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
//           >
//             Clear Filters
//           </button>
//           <p className="text-sm text-gray-600">
//             {pagination.total} cars found
//           </p>
//         </div>
//       </div>

//       {/* Cars Grid */}
//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       ) : cars.length === 0 ? (
//         <div className="text-center py-12">
//           <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
//           <p className="text-gray-600">Try adjusting your filters or search terms</p>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {cars.map((car) => (
//               <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//                 <div className="h-48 bg-gray-200 flex items-center justify-center">
//                   {car.images && car.images.length > 0 ? (
//                     <img
//                       src={`https://motormetrics-ai.onrender.com/${car.images[0]}`}
//                       alt={car.title}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="h-full w-full bg-gray-200 flex items-center justify-center">
//                       <span className="text-gray-400">No Image</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-lg font-semibold text-gray-900 truncate">
//                       {car.brand} {car.model}
//                     </h3>
//                     <span className={`text-xs font-medium px-2 py-1 rounded ${
//                       car.listingType === 'rent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
//                     }`}>
//                       {car.listingType}
//                     </span>
//                   </div>
//                   <p className="text-gray-600 text-sm mb-2">
//                     {car.year} • {car.mileage.toLocaleString()} km • {car.fuelType}
//                   </p>
//                   <p className="text-gray-600 text-sm mb-3 flex items-center">
//                     <MapPin className="h-3 w-3 mr-1" />
//                     {car.location.city}, {car.location.state}
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-xl font-bold text-blue-600">
//                       ${car.price.toLocaleString()}
//                     </span>
//                     <Link
//                       to={`/cars/${car._id}`}
//                       className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-300"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {pagination.totalPages > 1 && (
//             <div className="flex justify-center mt-8">
//               <nav className="flex items-center space-x-2">
//                 <button
//                   onClick={() => handlePageChange(pagination.currentPage - 1)}
//                   disabled={pagination.currentPage === 1}
//                   className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
                
//                 {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     className={`px-3 py-2 text-sm font-medium rounded-md ${
//                       page === pagination.currentPage
//                         ? 'bg-blue-600 text-white'
//                         : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ))}
                
//                 <button
//                   onClick={() => handlePageChange(pagination.currentPage + 1)}
//                   disabled={pagination.currentPage === pagination.totalPages}
//                   className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </nav>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default CarList; 

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    model: '',
    year: '',
    fuelType: '',
    transmission: '',
    listingType: '',
    minPrice: '',
    maxPrice: '',
    city: '',
    state: ''
  });
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, total: 0 });

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const transmissions = ['Manual', 'Automatic'];
  const listingTypes = ['rent', 'sale'];

  useEffect(() => {
    fetchCars();
  }, [filters, pagination.currentPage]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12,
        ...filters
      });
      const response = await axios.get(`/cars?${params}`);
      setCars(response.data.cars);
      setPagination({
        currentPage: parseInt(response.data.currentPage),
        totalPages: response.data.totalPages,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      brand: '',
      model: '',
      year: '',
      fuelType: '',
      transmission: '',
      listingType: '',
      minPrice: '',
      maxPrice: '',
      city: '',
      state: ''
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const inputClass = "px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const selectClass = inputClass;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Browse Cars</h1>
        <p className="text-gray-300">Find the perfect car for your needs</p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 glass-card p-6 rounded-xl mb-10 animate-fade-in-up">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input type="text" placeholder="Search cars..." value={filters.search} 
                   onChange={(e) => handleFilterChange('search', e.target.value)} className={`${inputClass} pl-10`} />
          </div>
          <input type="text" placeholder="Brand" value={filters.brand} 
                 onChange={(e) => handleFilterChange('brand', e.target.value)} className={inputClass} />
          <input type="text" placeholder="Model" value={filters.model} 
                 onChange={(e) => handleFilterChange('model', e.target.value)} className={inputClass} />
          <input type="number" placeholder="Year" value={filters.year} 
                 onChange={(e) => handleFilterChange('year', e.target.value)} className={inputClass} />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
          <select value={filters.fuelType} onChange={(e) => handleFilterChange('fuelType', e.target.value)} className={selectClass}>
            <option value="">Fuel Type</option>
            {fuelTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <select value={filters.transmission} onChange={(e) => handleFilterChange('transmission', e.target.value)} className={selectClass}>
            <option value="">Transmission</option>
            {transmissions.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <select value={filters.listingType} onChange={(e) => handleFilterChange('listingType', e.target.value)} className={selectClass}>
            <option value="">Listing Type</option>
            {listingTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <input type="number" placeholder="Min Price" value={filters.minPrice} 
                 onChange={(e) => handleFilterChange('minPrice', e.target.value)} className={inputClass} />
          <input type="number" placeholder="Max Price" value={filters.maxPrice} 
                 onChange={(e) => handleFilterChange('maxPrice', e.target.value)} className={inputClass} />
          <input type="text" placeholder="City" value={filters.city} 
                 onChange={(e) => handleFilterChange('city', e.target.value)} className={inputClass} />
        </div>

        <div className="flex justify-between items-center">
          <button onClick={clearFilters} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-200">
            Clear Filters
          </button>
          <p className="text-sm text-gray-300">{pagination.total} cars found</p>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-12 animate-fade-in-up">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No cars found</h3>
            <p className="text-gray-400">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, idx) => (
                <div key={car._id} 
                     className="glass-card rounded-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 animate-fade-in-up"
                     style={{ animationDelay: `${idx * 80}ms` }}>
                  <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                    {car.images?.[0] ? (
                      <img 
                        src={car.images[0]} 
                        alt={car.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold truncate">{car.brand} {car.model}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${car.listingType === 'rent' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
                        {car.listingType}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      {car.year} • {car.mileage.toLocaleString()} km • {car.fuelType}
                    </p>
                    <p className="text-gray-400 text-sm mb-3 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {car.location.city}, {car.location.state}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        ${car.price.toLocaleString()}
                      </span>
                      <Link
                        to={`/cars/${car._id}`}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white text-sm transition transform hover:scale-105"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8 animate-fade-in-up">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                      page === pagination.currentPage
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Animations & Glass Styles */}
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

export default CarList;

