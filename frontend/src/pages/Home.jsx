import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Shield, Users, MapPin, Search, Star, ArrowRight, Zap, Award, TrendingUp, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { isOwner } = useAuth();

  useEffect(() => {
    setIsVisible(true);
    const fetchFeaturedCars = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/cars/featured', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setFeaturedCars(response.data);
      } catch (error) {
        console.error('Error fetching featured cars:', error);
        toast.error('Failed to load featured cars');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, [navigate]);

  const features = [
    {
      icon: <Car className="h-8 w-8 text-blue-500" />,
      title: 'Rent or Buy',
      description: 'Choose from thousands of verified cars available for rent or purchase',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-500" />,
      title: 'Safe & Secure',
      description: 'Advanced encryption and verified payment methods protect every transaction',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: 'Trusted Community',
      description: 'Connect with thoroughly verified car owners and buyers worldwide',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: <MapPin className="h-8 w-8 text-rose-500" />,
      title: 'Smart Locations',
      description: 'AI-powered location matching finds the perfect cars near you',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: Users },
    { number: '15K+', label: 'Cars Available', icon: Car },
    { number: '500+', label: 'Cities Covered', icon: MapPin },
    { number: '4.9', label: 'Average Rating', icon: Star }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white mb-6">
              <Zap className="h-4 w-4 mr-2 text-yellow-400" />
              New: AI-Powered Car Matching
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Car Experience
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Revolutionary platform connecting car owners with seekers. Rent, buy, or sell with complete confidence and cutting-edge technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!isOwner && (
                <Link
                  to="/cars"
                  className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center"
                >
                  <Search className="h-5 w-5 mr-3" />
                  Discover Cars
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )}
              {!User && (
              <Link
                to="/register"
                className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-blue-400 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              <Award className="h-4 w-4 mr-2" />
              Why Choose CarShare
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Redefining Car
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Commerce</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of automotive transactions with our innovative platform designed for the modern world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group relative ${feature.bgColor} ${feature.borderColor} border-2 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              Featured Collection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Premium Car
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Selection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked vehicles from our most trusted sellers and premium inventory
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.slice(0, 6).map((car, index) => (
                <div 
                  key={car._id} 
                  className={`group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {car.images && car.images.length > 0 ? (
                      <img
                        src={`https://motormetrics-ai.onrender.com/${car.images[0]}`}
                        alt={car.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Car className="h-20 w-20 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-2 rounded-full shadow-lg">
                        {car.listingType}
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {car.brand} {car.model}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.8</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                      <span className="bg-gray-100 px-2 py-1 rounded-lg">{car.year}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-lg">{car.mileage?.toLocaleString()} km</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-lg">{car.fuelType}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-6">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {car.location?.city}, {car.location?.state}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${car.price?.toLocaleString()}
                      </span>
                      <Link
                        to={`/cars/${car._id}`}
                        className="group/btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            {!isOwner && (
              <Link
                to="/cars"
                className="group inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Explore All Cars
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Car Journey?
            </span>
          </h2>
          
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join over 50,000 satisfied users who've discovered the future of automotive commerce with CarShare
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {!User && (
            <Link
              to="/register"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center"
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            )}
            
            {!isOwner && (
              <Link
                to="/cars"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:scale-105"
              >
                Browse Cars
              </Link>
            )}
          </div>
          
          <div className="mt-12 text-sm text-gray-400">
            No hidden fees • 30-day money-back guarantee • 24/7 support
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default Home;

// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Car, Shield, Users, MapPin, Search, Star, ArrowRight, Zap, Award, TrendingUp } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useAuth } from '../contexts/AuthContext';

// const Home = () => {
//   const [featuredCars, setFeaturedCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);
//   const navigate = useNavigate();
//   const { isOwner, user } = useAuth();

//   useEffect(() => {
//     setIsVisible(true);
//     const fetchFeaturedCars = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }
//         const response = await axios.get('/api/cars/featured', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setFeaturedCars(response.data);
//       } catch (error) {
//         console.error('Error fetching featured cars:', error);
//         toast.error('Failed to load featured cars');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFeaturedCars();
//   }, [navigate]);

//   const features = [
//     {
//       icon: <Car className="h-8 w-8 text-blue-500" />,
//       title: 'Rent or Buy',
//       description: 'Choose from thousands of verified cars available for rent or purchase',
//       color: 'from-blue-500 to-blue-600',
//       bgColor: 'bg-blue-50',
//       borderColor: 'border-blue-200'
//     },
//     {
//       icon: <Shield className="h-8 w-8 text-emerald-500" />,
//       title: 'Safe & Secure',
//       description: 'Advanced encryption and verified payment methods protect every transaction',
//       color: 'from-emerald-500 to-emerald-600',
//       bgColor: 'bg-emerald-50',
//       borderColor: 'border-emerald-200'
//     },
//     {
//       icon: <Users className="h-8 w-8 text-purple-500" />,
//       title: 'Trusted Community',
//       description: 'Connect with thoroughly verified car owners and buyers worldwide',
//       color: 'from-purple-500 to-purple-600',
//       bgColor: 'bg-purple-50',
//       borderColor: 'border-purple-200'
//     },
//     {
//       icon: <MapPin className="h-8 w-8 text-rose-500" />,
//       title: 'Smart Locations',
//       description: 'AI-powered location matching finds the perfect cars near you',
//       color: 'from-rose-500 to-rose-600',
//       bgColor: 'bg-rose-50',
//       borderColor: 'border-rose-200'
//     }
//   ];

//   const stats = [
//     { number: '50K+', label: 'Happy Customers', icon: Users },
//     { number: '15K+', label: 'Cars Available', icon: Car },
//     { number: '500+', label: 'Cities Covered', icon: MapPin },
//     { number: '4.9', label: 'Average Rating', icon: Star }
//   ];

//   return (
//     <div className="min-h-screen overflow-hidden">
      
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        
//         {/* Animated BG */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
//           <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full blur-xl animate-pulse delay-1000"></div>
//           <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full blur-xl animate-pulse delay-2000"></div>
//         </div>

//         {/* Hero Content */}
//         <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32 text-center transition-all duration-1000">
//           <div className={`${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
//               <Zap className="h-4 w-4 mr-2 text-yellow-400" /> New: AI-Powered Car Matching
//             </div>
//             <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               Find Your Perfect
//               <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Car Experience</span>
//             </h1>
//             <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
//               Revolutionary platform connecting car owners with seekers. Rent, buy, or sell with complete confidence and cutting-edge technology.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               {!isOwner && (
//                 <Link
//                   to="/cars"
//                   className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:scale-105 hover:shadow-2xl flex items-center"
//                 >
//                   <Search className="h-5 w-5 mr-3" /> Discover Cars
//                   <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               )}
//               {!user && (
//                 <Link
//                   to="/register"
//                   className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300"
//                 >
//                   Get Started Free
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
//           <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             {stats.map((stat, i) => (
//               <div key={i} className="group">
//                 <div className="flex justify-center mb-2">
//                   <stat.icon className="h-6 w-6 text-blue-400 group-hover:text-white transition-colors" />
//                 </div>
//                 <div className="text-2xl font-bold">{stat.number}</div>
//                 <div className="text-sm text-gray-300">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-24 bg-gradient-to-b from-white to-gray-50">
//         {/* Feature cards same as before */}
//       </section>

//       {/* Featured Cars */}
//       <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
//         {/* Featured car grid same as before */}
//       </section>

//       {/* CTA Section */}
//       <section className="relative py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white text-center">
//         <h2 className="text-4xl md:text-5xl font-bold mb-6">
//           Ready to Transform Your
//           <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Car Journey?</span>
//         </h2>
//         <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
//           Join over 50,000 satisfied users who've discovered the future of automotive commerce with CarShare
//         </p>
//         <div className="flex flex-col sm:flex-row gap-6 justify-center">
//           {!user && (
//             <Link
//               to="/register"
//               className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:scale-105 hover:shadow-2xl flex items-center"
//             >
//               Start Your Journey
//               <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           )}
//           {!isOwner && (
//             <Link
//               to="/cars"
//               className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300"
//             >
//               Browse Cars
//             </Link>
//           )}
//         </div>
//       </section>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes fade-in-up {
//           from { opacity:0; transform:translateY(30px);}
//           to { opacity:1; transform:translateY(0);}
//         }
//         .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
//       `}</style>
//     </div>
//   );
// };

// export default Home;
