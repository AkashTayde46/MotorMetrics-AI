// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { Car, Plus } from 'lucide-react';
// import { toast } from 'react-hot-toast'; // Add this import

// const AddCar = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       setIsLoading(true);
      
//       // Get token from localStorage
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('https://motormetrics-ai.onrender.com/api/cars', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // Add the token in Authorization header
//         },
//         body: JSON.stringify(data)
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to add car');
//       }

//       toast.success('Car added successfully!');
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Error adding car:', error);
//       toast.error(error.message || 'Failed to add car');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Car</h1>
//         <p className="text-gray-600">List your car for rent or sale</p>
//       </div>

//       <div className="bg-white rounded-lg shadow p-8">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Basic Information */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Car Title
//               </label>
//               <input
//                 type="text"
//                 {...register('title', { required: 'Title is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., Well-maintained Toyota Camry"
//               />
//               {errors.title && (
//                 <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Brand
//               </label>
//               <input
//                 type="text"
//                 {...register('brand', { required: 'Brand is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., Toyota"
//               />
//               {errors.brand && (
//                 <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Model
//               </label>
//               <input
//                 type="text"
//                 {...register('model', { required: 'Model is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., Camry"
//               />
//               {errors.model && (
//                 <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Year
//               </label>
//               <input
//                 type="number"
//                 {...register('year', { 
//                   required: 'Year is required',
//                   min: { value: 1900, message: 'Invalid year' },
//                   max: { value: new Date().getFullYear() + 1, message: 'Invalid year' }
//                 })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., 2020"
//               />
//               {errors.year && (
//                 <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Mileage (km)
//               </label>
//               <input
//                 type="number"
//                 {...register('mileage', { 
//                   required: 'Mileage is required',
//                   min: { value: 0, message: 'Mileage must be positive' }
//                 })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., 50000"
//               />
//               {errors.mileage && (
//                 <p className="mt-1 text-sm text-red-600">{errors.mileage.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Fuel Type
//               </label>
//               <select
//                 {...register('fuelType', { required: 'Fuel type is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select fuel type</option>
//                 <option value="Petrol">Petrol</option>
//                 <option value="Diesel">Diesel</option>
//                 <option value="Electric">Electric</option>
//                 <option value="Hybrid">Hybrid</option>
//                 <option value="CNG">CNG</option>
//               </select>
//               {errors.fuelType && (
//                 <p className="mt-1 text-sm text-red-600">{errors.fuelType.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Transmission
//               </label>
//               <select
//                 {...register('transmission', { required: 'Transmission is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select transmission</option>
//                 <option value="Manual">Manual</option>
//                 <option value="Automatic">Automatic</option>
//               </select>
//               {errors.transmission && (
//                 <p className="mt-1 text-sm text-red-600">{errors.transmission.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Color
//               </label>
//               <input
//                 type="text"
//                 {...register('color', { required: 'Color is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., White"
//               />
//               {errors.color && (
//                 <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Listing Type
//               </label>
//               <select
//                 {...register('listingType', { required: 'Listing type is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select listing type</option>
//                 <option value="rent">For Rent</option>
//                 <option value="sale">For Sale</option>
//               </select>
//               {errors.listingType && (
//                 <p className="mt-1 text-sm text-red-600">{errors.listingType.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price
//               </label>
//               <input
//                 type="number"
//                 {...register('price', { 
//                   required: 'Price is required',
//                   min: { value: 0, message: 'Price must be positive' }
//                 })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., 25000"
//               />
//               {errors.price && (
//                 <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
//               )}
//             </div>
//           </div>

//           {/* Location */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 City
//               </label>
//               <input
//                 type="text"
//                 {...register('location.city', { required: 'City is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., New York"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 State
//               </label>
//               <input
//                 type="text"
//                 {...register('location.state', { required: 'State is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., NY"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               {...register('description', { 
//                 required: 'Description is required',
//                 minLength: { value: 10, message: 'Description must be at least 10 characters' }
//               })}
//               rows={4}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Describe your car, its condition, features, etc."
//             />
//             {errors.description && (
//               <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={() => navigate('/dashboard')}
//               className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
//             >
//               {isLoading ? (
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//               ) : (
//                 <Plus className="h-4 w-4 mr-2" />
//               )}
//               Add Car
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCar;



// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import axios from "axios";
// import Field from "../components/Field"; // if you have it; otherwise you can inline fields
// import { toast } from "react-hot-toast";

// export default function AddCar() {
//   const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
//     defaultValues: {
//       images: []
//     }
//   });
//   const [uploading, setUploading] = useState(false);
  
//   // Watch the images field to debug
//   const watchedImages = watch("images");
//   console.log('Watched images:', watchedImages);

//   const onSubmit = async (data) => {
//     try {
//       console.log('Form data being submitted:', data);
//       console.log('Images in form data:', data.images);
      
//       // Check if images are present
//       if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
//         toast.error("Please upload at least one image");
//         return;
//       }
      
//       // Use full backend URL since there's no proxy configured
//       const res = await axios.post("https://motormetrics-ai.onrender.com/api/cars", data, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       console.log('Response from backend:', res.data);
//       toast.success("Car added successfully!");
      
//       // Redirect to dashboard or car list
//       window.location.href = '/dashboard';
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       toast.error(err?.response?.data?.message || "Failed to add car");
//     }
//   };

//   // Upload images to Cloudinary
//   const handleImageUpload = async (e) => {
//     const files = e.target.files;
//     if (!files?.length) return;

//     setUploading(true);
//     const uploadedUrls = [];

//     for (let file of files) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "Akash108"); // your preset
//       formData.append("folder", "car-website");

//       try {
//         const res = await fetch(`https://api.cloudinary.com/v1_1/dnlnyozoa/image/upload`, {
//           method: "POST",
//           body: formData,
//         });
//         const data = await res.json();
//         console.log('Cloudinary response for file:', file.name, data);
//         if (data?.secure_url) {
//           uploadedUrls.push(data.secure_url);
//           console.log('Added URL to array:', data.secure_url);
//         } else {
//           console.error("Cloudinary response:", data);
//           toast.error("Image upload failed (Cloudinary)");
//         }
//       } catch (error) {
//         console.error("Image upload error:", error);
//         toast.error("Image upload failed");
//       }
//     }

//     console.log('Uploaded image URLs:', uploadedUrls);
//     setValue("images", uploadedUrls, { shouldValidate: true });
//     setUploading(false);
//   };

//   /* If you don't have a Field component, it's safe — it should render children and label.
//      If Field is missing, replace <Field> with a div and label manually. */

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
//             Add New Car
//           </h1>
//           <p className="text-gray-300 mt-2">List your car for rent or sale in minutes</p>
//         </div>

//         <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-lg">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Car Title</label>
//                 <input
//                   type="text"
//                   {...register("title", { required: "Title is required" })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="e.g., Well-maintained Toyota Camry"
//                 />
//                 {errors.title && <p className="mt-1 text-sm text-rose-400">{errors.title.message}</p>}
//               </div>

//               {/* Brand */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Brand</label>
//                 <input
//                   type="text"
//                   {...register("brand", { required: "Brand is required" })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="e.g., Toyota"
//                 />
//                 {errors.brand && <p className="mt-1 text-sm text-rose-400">{errors.brand.message}</p>}
//               </div>

//               {/* Model */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Model</label>
//                 <input
//                   type="text"
//                   {...register("model", { required: "Model is required" })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="e.g., Camry"
//                 />
//                 {errors.model && <p className="mt-1 text-sm text-rose-400">{errors.model.message}</p>}
//               </div>

//               {/* Year */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Year</label>
//                 <input
//                   type="number"
//                   {...register("year", { required: "Year is required", min: 1900 })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="e.g., 2020"
//                 />
//                 {errors.year && <p className="mt-1 text-sm text-rose-400">{errors.year.message}</p>}
//               </div>

//               {/* Mileage */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Mileage (km)</label>
//                 <input
//                   type="number"
//                   {...register("mileage", { required: "Mileage is required", min: 0 })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="e.g., 50000"
//                 />
//                 {errors.mileage && <p className="mt-1 text-sm text-rose-400">{errors.mileage.message}</p>}
//               </div>

//               {/* Fuel Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Fuel Type</label>
//                 <select
//                   {...register("fuelType", { required: "Fuel type is required" })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                   <option value="">Select fuel</option>
//                   <option>Petrol</option>
//                   <option>Diesel</option>
//                   <option>Electric</option>
//                   <option>Hybrid</option>
//                   <option>CNG</option>
//                 </select>
//                 {errors.fuelType && <p className="mt-1 text-sm text-rose-400">{errors.fuelType.message}</p>}
//               </div>

//               {/* Transmission */}
//              <div>
//   <label className="block text-sm font-medium text-white mb-2">
//     Transmission
//   </label>
//   <select
//     {...register("transmission", { required: "Transmission is required" })}
//     className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//   >
//     <option value="">Select transmission</option>
//     <option>Manual</option>
//     <option>Automatic</option>
//   </select>
//   {errors.transmission && (
//     <p className="mt-1 text-sm text-rose-400">
//       {errors.transmission.message}
//     </p>
//   )}
// </div>


//               {/* Color */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Color</label>
//                 <input
//                   type="text"
//                   {...register("color", { required: "Color is required" })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="e.g., White"
//                 />
//                 {errors.color && <p className="mt-1 text-sm text-rose-400">{errors.color.message}</p>}
//               </div>

//               {/* Listing Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Listing Type</label>
//                 <select
//                   {...register("listingType", { required: "Listing type is required" })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                   <option value="">Select listing</option>
//                   <option value="rent">For Rent</option>
//                   <option value="sale">For Sale</option>
//                 </select>
//                 {errors.listingType && <p className="mt-1 text-sm text-rose-400">{errors.listingType.message}</p>}
//               </div>

//               {/* Price */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Price</label>
//                 <input
//                   type="number"
//                   {...register("price", { required: "Price is required", min: 0 })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="e.g., 25000"
//                 />
//                 {errors.price && <p className="mt-1 text-sm text-rose-400">{errors.price.message}</p>}
//               </div>
//             </div>

//             {/* Location */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">City</label>
//                 <input
//                   type="text"
//                   {...register("location.city", { required: "City is required" })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="e.g., New York"
//                 />
//                 {errors.location?.city && <p className="mt-1 text-sm text-rose-400">{errors.location.city.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">State</label>
//                 <input
//                   type="text"
//                   {...register("location.state", { required: "State is required" })}
//                   className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="e.g., NY"
//                 />
//                 {errors.location?.state && <p className="mt-1 text-sm text-rose-400">{errors.location.state.message}</p>}
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
//               <textarea
//                 {...register("description", { required: "Description is required", minLength: 10 })}
//                 rows={4}
//                 className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Describe your car's condition, features, etc."
//               />
//               {errors.description && <p className="mt-1 text-sm text-rose-400">{errors.description.message}</p>}
//             </div>

//             {/* Images */}
//             <div>
//               <label className="block text-sm font-medium text-gray-200 mb-2">Car Images</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageUpload}
//                 className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white cursor-pointer"
//               />
//               {uploading && <p className="mt-2 text-sm text-blue-300">Uploading images...</p>}
//               {errors.images && <p className="mt-1 text-sm text-rose-400">{errors.images.message}</p>}
//             </div>

//             <input 
//               type="hidden" 
//               {...register("images", { 
//                 required: "At least one image is required",
//                 validate: (value) => {
//                   if (!value || !Array.isArray(value) || value.length === 0) {
//                     return "At least one image is required";
//                   }
//                   return true;
//                 }
//               })} 
//             />

//             {/* Buttons */}
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => window.history.back()}
//                 className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-100 transition"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={uploading}
//                 className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transform transition disabled:opacity-60"
//               >
//                 {uploading ? "Uploading..." : "Add Car"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Field from "../components/Field"; // if you have it; otherwise you can inline fields
import { toast } from "react-hot-toast";

export default function AddCar() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      images: []
    }
  });
  const [uploading, setUploading] = useState(false);
  
  // Watch the images field to debug
  const watchedImages = watch("images");
  console.log('Watched images:', watchedImages);

  const onSubmit = async (data) => {
    try {
      console.log('Form data being submitted:', data);
      console.log('Images in form data:', data.images);
      
      // Check if images are present
      if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }
      
      // Use full backend URL since there's no proxy configured
      const res = await axios.post("https://motormetrics-ai.onrender.com/api/cars", data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response from backend:', res.data);
      toast.success("Car added successfully!");
      
      // Redirect to dashboard or car list
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error(err?.response?.data?.message || "Failed to add car");
    }
  };

  // Upload images to Cloudinary
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const uploadedUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Akash108"); // your preset
      formData.append("folder", "car-website");

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/dnlnyozoa/image/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        console.log('Cloudinary response for file:', file.name, data);
        if (data?.secure_url) {
          uploadedUrls.push(data.secure_url);
          console.log('Added URL to array:', data.secure_url);
        } else {
          console.error("Cloudinary response:", data);
          toast.error("Image upload failed (Cloudinary)");
        }
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error("Image upload failed");
      }
    }

    console.log('Uploaded image URLs:', uploadedUrls);
    setValue("images", uploadedUrls, { shouldValidate: true });
    setUploading(false);
  };

  const selectClassName = "w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 [&>option]:bg-gray-800 [&>option]:text-white [&>option]:py-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            Add New Car
          </h1>
          <p className="text-gray-300 mt-2">List your car for rent or sale in minutes</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Car Title</label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., Well-maintained Toyota Camry"
                />
                {errors.title && <p className="mt-1 text-sm text-rose-400">{errors.title.message}</p>}
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Brand</label>
                <input
                  type="text"
                  {...register("brand", { required: "Brand is required" })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., Toyota"
                />
                {errors.brand && <p className="mt-1 text-sm text-rose-400">{errors.brand.message}</p>}
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Model</label>
                <input
                  type="text"
                  {...register("model", { required: "Model is required" })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., Camry"
                />
                {errors.model && <p className="mt-1 text-sm text-rose-400">{errors.model.message}</p>}
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Year</label>
                <input
                  type="number"
                  {...register("year", { required: "Year is required", min: 1900 })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., 2020"
                />
                {errors.year && <p className="mt-1 text-sm text-rose-400">{errors.year.message}</p>}
              </div>

              {/* Mileage */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Mileage (km)</label>
                <input
                  type="number"
                  {...register("mileage", { required: "Mileage is required", min: 0 })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., 50000"
                />
                {errors.mileage && <p className="mt-1 text-sm text-rose-400">{errors.mileage.message}</p>}
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Fuel Type</label>
                <select
                  {...register("fuelType", { required: "Fuel type is required" })}
                  className={selectClassName}
                >
                  <option value="">Select fuel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">CNG</option>
                </select>
                {errors.fuelType && <p className="mt-1 text-sm text-rose-400">{errors.fuelType.message}</p>}
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Transmission
                </label>
                <select
                  {...register("transmission", { required: "Transmission is required" })}
                  className={selectClassName}
                >
                  <option value="">Select transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
                {errors.transmission && (
                  <p className="mt-1 text-sm text-rose-400">
                    {errors.transmission.message}
                  </p>
                )}
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Color</label>
                <input
                  type="text"
                  {...register("color", { required: "Color is required" })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., White"
                />
                {errors.color && <p className="mt-1 text-sm text-rose-400">{errors.color.message}</p>}
              </div>

              {/* Listing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Listing Type</label>
                <select
                  {...register("listingType", { required: "Listing type is required" })}
                  className={selectClassName}
                >
                  <option value="">Select listing</option>
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                </select>
                {errors.listingType && <p className="mt-1 text-sm text-rose-400">{errors.listingType.message}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Price</label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required", min: 0 })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., 25000"
                />
                {errors.price && <p className="mt-1 text-sm text-rose-400">{errors.price.message}</p>}
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">City</label>
                <input
                  type="text"
                  {...register("location.city", { required: "City is required" })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., New York"
                />
                {errors.location?.city && <p className="mt-1 text-sm text-rose-400">{errors.location.city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">State</label>
                <input
                  type="text"
                  {...register("location.state", { required: "State is required" })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., NY"
                />
                {errors.location?.state && <p className="mt-1 text-sm text-rose-400">{errors.location.state.message}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
              <textarea
                {...register("description", { required: "Description is required", minLength: 10 })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Describe your car's condition, features, etc."
              />
              {errors.description && <p className="mt-1 text-sm text-rose-400">{errors.description.message}</p>}
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Car Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white cursor-pointer"
              />
              {uploading && <p className="mt-2 text-sm text-blue-300">Uploading images...</p>}
              {errors.images && <p className="mt-1 text-sm text-rose-400">{errors.images.message}</p>}
            </div>

            <input 
              type="hidden" 
              {...register("images", { 
                required: "At least one image is required",
                validate: (value) => {
                  if (!value || !Array.isArray(value) || value.length === 0) {
                    return "At least one image is required";
                  }
                  return true;
                }
              })} 
            />

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={uploading}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transform transition disabled:opacity-60"
              >
                {uploading ? "Uploading..." : "Add Car"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}