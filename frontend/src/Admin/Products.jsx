
// // // import React, { useEffect, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import axios from "axios";
// // // import { Link, Outlet } from "react-router-dom";
// // // import { setProducts, editProduct } from "../slice/adminSlice";
// // // import api from '../axiosIntence'

// // // function Products() {
// // //   const dispatch = useDispatch();
// // //   const { products } = useSelector((state) => state.admin);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [currentProduct, setCurrentProduct] = useState(null);
// // //   const [selectedCategory, setSelectedCategory] = useState("All");
// // //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// // //   const [productToDelete, setProductToDelete] = useState(null);
// // //   const [imagePreview, setImagePreview] = useState("");
// // //   const [imageFile, setImageFile] = useState(null);

// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, []);

// // //   const fetchProducts = async () => {
// // //     try {
// // //       const response = await api.get("/products");
// // //       dispatch(setProducts(response.data));
// // //     } catch (error) {
// // //       console.error("Error fetching products:", error);
// // //     }
// // //   };


// // //   const deleteProduct = async () => {
// // //     if (productToDelete) {
// // //       try {
// // //         await api.delete(`/admin/products/${productToDelete._id}`); 
// // //         dispatch(setProducts(products.filter((product) => product._id !== productToDelete._id)));
// // //         setIsDeleteModalOpen(false);
// // //       } catch (error) {
// // //         console.error('Error deleting product:', error);
// // //       }
// // //     }
// // //   };
// // //   const handleEditSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const formData = new FormData();
// // //     formData.append('name', e.target.name.value);
// // //     formData.append('price', e.target.price.value);
// // //     formData.append('stock', e.target.stock.value);
// // //     formData.append('categories', e.target.category.value);
// // //     formData.append('description', e.target.description.value);
// // //     if (imageFile) {
// // //       formData.append('images', imageFile);
// // //     }
// // //     try {
// // //       await dispatch(editProduct({ 
// // //         _id: currentProduct._id, 
// // //         updatedProduct: formData 
// // //       }));
// // //       setIsEditing(false);
// // //       setCurrentProduct(null);
// // //       setImagePreview("");
// // //       setImageFile(null);
// // //       fetchProducts();
// // //     } catch (error) {
// // //       console.error("Error updating product:", error);
// // //     }
// // //   };

// // //   const filteredProducts = products.filter((product) =>
// // //     selectedCategory === "All"
// // //       ? true
// // //       : product.categories?.toLowerCase() === selectedCategory.toLowerCase()
// // //   );

// // //   return (
// // //     <div>
// // //       <h2 className="text-xl font-bold">Products</h2>
// // //       <div className="flex space-x-4 mb-4">
// // //         {["All", "Men", "Women"].map((category) => (
// // //           <button
// // //             key={category}
// // //             onClick={() => setSelectedCategory(category)}
// // //             className={`px-4 py-2 rounded ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
// // //           >
// // //             {category}
// // //           </button>
// // //         ))}
// // //       </div>
// // //       <div className="mb-4 flex justify-end">
// // //         <Link to="/admin/add" className="bg-green-500 text-white px-4 py-2 rounded">Add Product</Link>
// // //       </div>
// // //       <div className="mt-4">
// // //         <table className="table-auto w-full">
// // //           <thead>
// // //             <tr>
// // //               <th className="border p-2">ID</th>
// // //               <th className="border p-2">Name</th>
// // //               <th className="border p-2">Price</th>
// // //               <th className="border p-2">Stock</th>
// // //               <th className="border p-2">Category</th>
// // //               <th className="border p-2">Image</th>
// // //               <th className="border p-2">Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {filteredProducts.map((product) => (
// // //               <tr key={product._id}>
// // //                 <td className="border p-2">{product._id}</td>
// // //                 <td className="border p-2">{product.name}</td>
// // //                 <td className="border p-2">{product.price}</td>
// // //                 <td className="border p-2">{product.stock}</td>
// // //                 <td className="border p-2">{product.categories}</td>
// // //                 <td className="border p-2">
// // //                   <img 
// // //                     src={product.images?.url || product.images} // Handle both object and string
// // //                     alt={product.name} 
// // //                     className="h-12 w-12 object-cover" 
// // //                   />
// // //                 </td>
// // //                 <td className="border p-2">
// // //                   <button onClick={() => { setProductToDelete(product); setIsDeleteModalOpen(true); }} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
// // //                   <button onClick={() => { setIsEditing(true); setCurrentProduct(product); }} className="bg-blue-500 text-white px-3 py-1 rounded ml-2">Edit</button>
// // //                 </td> 
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //       {isEditing && currentProduct && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// // //           <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-2xl">
// // //             <h3 className="text-lg font-bold mb-4">Edit Product</h3>
// // //             <form onSubmit={handleEditSubmit}>
// // //               <div className="mb-4">
// // //                 <label className="block mb-2">Name</label>
// // //                 <input type="text" name="name" defaultValue={currentProduct.name} className="p-2 border w-full" required />
// // //               </div>
// // //               <div className="mb-4">
// // //                 <label className="block mb-2">Price</label>
// // //                 <input type="number" name="price" defaultValue={currentProduct.price} className="p-2 border w-full" required />
// // //               </div>
// // //               <div className="mb-4">
// // //                 <label className="block mb-2">Stock</label>
// // //                 <input type="number" name="stock" defaultValue={currentProduct.stock} className="p-2 border w-full" required />
// // //               </div>
// // //               <div className="mb-4">
// // //                 <label className="block mb-2">Category</label>
// // //                 <select name="category" defaultValue={currentProduct.categories} className="p-2 border w-full" required>
// // //                   <option value="men">men</option>
// // //                   <option value="women">women</option>
// // //                 </select>
// // //               </div>
// // //               <div className="mb-4">
// // //                 <label className="block mb-2">Product Image</label>
// // //                 <input 
// // //                   type="file" 
// // //                   name="image"
// // //                   onChange={(e) => {
// // //                     if (e.target.files[0]) {
// // //                       setImageFile(e.target.files[0]);
// // //                       setImagePreview(URL.createObjectURL(e.target.files[0]));
// // //                     }
// // //                   }}
// // //                   className="p-2 border w-full"
// // //                 />
// // //                 {imagePreview && (
// // //                   <img 
// // //                     src={imagePreview} 
// // //                     alt="Preview" 
// // //                     className="mt-2 h-24 w-24 object-cover"
// // //                   />
// // //                 )}
// // //                 {!imagePreview && currentProduct.images && (
// // //                   <img 
// // //                     src={currentProduct.images?.url || currentProduct.images} // Handle both object and string
// // //                     alt="Current" 
// // //                     className="mt-2 h-24 w-24 object-cover"
// // //                   />
// // //                 )}
// // //               </div>
// // //               <div className="mb-4">
// // //                 <label className="block mb-2">Description</label>
// // //                 <textarea name="description" defaultValue={currentProduct.description} className="p-2 border w-full" required />
// // //               </div>
// // //               <div className="flex justify-end">
// // //                 <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
// // //                 <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}
// // //       {isDeleteModalOpen && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// // //           <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-md">
// // //             <h3 className="text-lg font-bold mb-4">Are you sure?</h3>
// // //             <p className="mb-4">Do you really want to delete this product? This action cannot be undone.</p>
// // //             <div className="flex justify-end space-x-4">
// // //               <button
// // //                 onClick={() => setIsDeleteModalOpen(false)}
// // //                 className="bg-gray-500 text-white px-4 py-2 rounded"
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 onClick={deleteProduct}
// // //                 className="bg-red-500 text-white px-4 py-2 rounded"
// // //               >
// // //                 Confirm Delete
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //       <Outlet />
// // //     </div>
// // //   );
// // // }

// // // export default Products;


// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, Outlet } from "react-router-dom";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
// // import { setProducts, editProduct } from "../slice/adminSlice";
// // import api from '../axiosIntence';

// // const Products = () => {
// //   const dispatch = useDispatch();
// //   const { products } = useSelector((state) => state.admin);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentProduct, setCurrentProduct] = useState(null);
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [productToDelete, setProductToDelete] = useState(null);
// //   const [imagePreview, setImagePreview] = useState("");
// //   const [imageFile, setImageFile] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   // Animation variants
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //         when: "beforeChildren"
// //       }
// //     }
// //   };

// //   const itemVariants = {
// //     hidden: { y: 20, opacity: 0 },
// //     visible: {
// //       y: 0,
// //       opacity: 1,
// //       transition: {
// //         duration: 0.3
// //       }
// //     }
// //   };

// //   const modalVariants = {
// //     hidden: { opacity: 0, scale: 0.9 },
// //     visible: { 
// //       opacity: 1, 
// //       scale: 1,
// //       transition: { 
// //         type: "spring", 
// //         stiffness: 300, 
// //         damping: 25,
// //         duration: 0.3
// //       }
// //     },
// //     exit: { opacity: 0, scale: 0.9 }
// //   };

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await api.get("/products");
// //         dispatch(setProducts(response.data));
// //         setIsLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, [dispatch]);

// //   const deleteProduct = async () => {
// //     if (productToDelete) {
// //       try {
// //         await api.delete(`/admin/products/${productToDelete._id}`); 
// //         dispatch(setProducts(products.filter((product) => product._id !== productToDelete._id)));
// //         setIsDeleteModalOpen(false);
// //       } catch (error) {
// //         console.error('Error deleting product:', error);
// //       }
// //     }
// //   };

// //   const handleEditSubmit = async (e) => {
// //     e.preventDefault();
// //     const formData = new FormData();
// //     formData.append('name', e.target.name.value);
// //     formData.append('price', e.target.price.value);
// //     formData.append('stock', e.target.stock.value);
// //     formData.append('categories', e.target.category.value);
// //     formData.append('description', e.target.description.value);
// //     if (imageFile) {
// //       formData.append('images', imageFile);
// //     }
// //     try {
// //       await dispatch(editProduct({ 
// //         _id: currentProduct._id, 
// //         updatedProduct: formData 
// //       }));
// //       setIsEditing(false);
// //       setCurrentProduct(null);
// //       setImagePreview("");
// //       setImageFile(null);
// //     } catch (error) {
// //       console.error("Error updating product:", error);
// //     }
// //   };

// //   const filteredProducts = products.filter((product) =>
// //     selectedCategory === "All"
// //       ? true
// //       : product.categories?.toLowerCase() === selectedCategory.toLowerCase()
// //   );

// //   if (isLoading) {
// //     return (
// //       <div className="p-8 grid gap-4">
// //         {[...Array(5)].map((_, i) => (
// //           <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
// //         ))}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 max-w-7xl mx-auto">
// //       {/* Main Content */}
// //       <motion.div
// //         initial="hidden"
// //         animate="visible"
// //         variants={containerVariants}
// //       >
// //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
// //           <motion.h2 
// //             variants={itemVariants}
// //             className="text-2xl font-bold text-gray-800 mb-4 md:mb-0"
// //           >
// //             Product Management
// //           </motion.h2>
// //           <div className="flex space-x-3">
// //             <motion.div variants={itemVariants}>
// //               <Link 
// //                 to="/admin/add" 
// //                 className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
// //               >
// //                 <FiPlus /> Add Product
// //               </Link>
// //             </motion.div>
// //           </div>
// //         </div>

// //         <motion.div variants={itemVariants} className="mb-6">
// //           <div className="flex flex-wrap gap-2">
// //             {["All", "Men", "Women"].map((category) => (
// //               <motion.button
// //                 key={category}
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={() => setSelectedCategory(category)}
// //                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// //                   selectedCategory === category
// //                     ? "bg-blue-600 text-white"
// //                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
// //                 }`}
// //               >
// //                 {category}
// //               </motion.button>
// //             ))}
// //           </div>
// //         </motion.div>

// //         <motion.div variants={containerVariants} className="bg-white rounded-xl shadow-sm overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 <AnimatePresence>
// //                   {filteredProducts.map((product) => (
// //                     <motion.tr
// //                       key={product._id}
// //                       variants={itemVariants}
// //                       className="hover:bg-gray-50 transition-colors"
// //                     >
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="flex items-center">
// //                           <div className="flex-shrink-0 h-10 w-10">
// //                             <img 
// //                               src={product.images?.url || product.images} 
// //                               alt={product.name} 
// //                               className="h-10 w-10 rounded-md object-cover" 
// //                             />
// //                           </div>
// //                           <div className="ml-4">
// //                             <div className="text-sm font-medium text-gray-900">{product.name}</div>
// //                             <div className="text-sm text-gray-500">ID: {product._id}</div>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         ₹{product.price}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                           product.stock > 10 
// //                             ? 'bg-green-100 text-green-800' 
// //                             : product.stock > 0 
// //                               ? 'bg-yellow-100 text-yellow-800' 
// //                               : 'bg-red-100 text-red-800'
// //                         }`}>
// //                           {product.stock} in stock
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
// //                         {product.categories}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
// //                         <motion.button
// //                           whileHover={{ scale: 1.05 }}
// //                           whileTap={{ scale: 0.95 }}
// //                           onClick={() => { 
// //                             setIsEditing(true); 
// //                             setCurrentProduct(product);
// //                             setImagePreview("");
// //                             setImageFile(null);
// //                           }}
// //                           className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
// //                           title="Edit"
// //                         >
// //                           <FiEdit2 />
// //                         </motion.button>
// //                         <motion.button
// //                           whileHover={{ scale: 1.05 }}
// //                           whileTap={{ scale: 0.95 }}
// //                           onClick={() => { 
// //                             setProductToDelete(product); 
// //                             setIsDeleteModalOpen(true); 
// //                           }}
// //                           className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
// //                           title="Delete"
// //                         >
// //                           <FiTrash2 />
// //                         </motion.button>
// //                       </td>
// //                     </motion.tr>
// //                   ))}
// //                 </AnimatePresence>
// //               </tbody>
// //             </table>
// //           </div>
// //         </motion.div>
// //       </motion.div>

// //       {/* Edit Product Modal */}
// //       <AnimatePresence>
// //         {isEditing && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
// //           >
// //             <motion.div
// //               variants={modalVariants}
// //               className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
// //             >
// //               <div className="p-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h3 className="text-xl font-bold">Edit Product</h3>
// //                   <button
// //                     onClick={() => setIsEditing(false)}
// //                     className="text-gray-500 hover:text-gray-700"
// //                   >
// //                     <FiX size={24} />
// //                   </button>
// //                 </div>
                
// //                 {currentProduct && (
// //                   <form onSubmit={handleEditSubmit}>
// //                     <div className="grid md:grid-cols-2 gap-6 mb-6">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
// //                         <input 
// //                           type="text" 
// //                           name="name" 
// //                           defaultValue={currentProduct.name} 
// //                           className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
// //                           required 
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
// //                         <input 
// //                           type="number" 
// //                           name="price" 
// //                           defaultValue={currentProduct.price} 
// //                           className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
// //                           required 
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
// //                         <input 
// //                           type="number" 
// //                           name="stock" 
// //                           defaultValue={currentProduct.stock} 
// //                           className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
// //                           required 
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
// //                         <select 
// //                           name="category" 
// //                           defaultValue={currentProduct.categories} 
// //                           className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
// //                           required
// //                         >
// //                           <option value="men">Men</option>
// //                           <option value="women">Women</option>
// //                         </select>
// //                       </div>
// //                     </div>

// //                     <div className="mb-6">
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
// //                       <textarea 
// //                         name="description" 
// //                         defaultValue={currentProduct.description} 
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
// //                         rows="3" 
// //                         required 
// //                       />
// //                     </div>

// //                     <div className="mb-6">
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
// //                       <input 
// //                         type="file" 
// //                         name="image"
// //                         onChange={(e) => {
// //                           if (e.target.files[0]) {
// //                             setImageFile(e.target.files[0]);
// //                             setImagePreview(URL.createObjectURL(e.target.files[0]));
// //                           }
// //                         }}
// //                         className="w-full text-sm text-gray-500 mb-2"
// //                       />
// //                       <div className="flex items-center gap-4">
// //                         {imagePreview ? (
// //                           <img src={imagePreview} alt="Preview" className="h-24 w-24 object-cover rounded-lg" />
// //                         ) : (
// //                           currentProduct.images && (
// //                             <img 
// //                               src={currentProduct.images?.url || currentProduct.images} 
// //                               alt="Current" 
// //                               className="h-24 w-24 object-cover rounded-lg"
// //                             />
// //                           )
// //                         )}
// //                       </div>
// //                     </div>

// //                     <div className="flex justify-end gap-3">
// //                       <motion.button
// //                         whileHover={{ scale: 1.03 }}
// //                         whileTap={{ scale: 0.97 }}
// //                         type="button"
// //                         onClick={() => setIsEditing(false)}
// //                         className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg"
// //                       >
// //                         Cancel
// //                       </motion.button>
// //                       <motion.button
// //                         whileHover={{ scale: 1.03 }}
// //                         whileTap={{ scale: 0.97 }}
// //                         type="submit"
// //                         className="px-6 py-2 bg-blue-600 text-white rounded-lg"
// //                       >
// //                         Save Changes
// //                       </motion.button>
// //                     </div>
// //                   </form>
// //                 )}
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* Delete Confirmation Modal */}
// //       <AnimatePresence>
// //         {isDeleteModalOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
// //           >
// //             <motion.div
// //               variants={modalVariants}
// //               className="bg-white rounded-xl shadow-lg w-full max-w-md"
// //             >
// //               <div className="p-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h3 className="text-lg font-bold">Confirm Deletion</h3>
// //                   <button
// //                     onClick={() => setIsDeleteModalOpen(false)}
// //                     className="text-gray-500 hover:text-gray-700"
// //                   >
// //                     <FiX size={24} />
// //                   </button>
// //                 </div>
// //                 <p className="text-gray-600 mb-6">
// //                   Are you sure you want to delete <span className="font-medium">{productToDelete?.name}</span>? This action cannot be undone.
// //                 </p>
// //                 <div className="flex justify-end gap-3">
// //                   <motion.button
// //                     whileHover={{ scale: 1.03 }}
// //                     whileTap={{ scale: 0.97 }}
// //                     onClick={() => setIsDeleteModalOpen(false)}
// //                     className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg"
// //                   >
// //                     Cancel
// //                   </motion.button>
// //                   <motion.button
// //                     whileHover={{ scale: 1.03 }}
// //                     whileTap={{ scale: 0.97 }}
// //                     onClick={deleteProduct}
// //                     className="px-6 py-2 bg-red-600 text-white rounded-lg"
// //                   >
// //                     Delete
// //                   </motion.button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <Outlet />
// //     </div>
// //   );
// // };

// // export default Products;


// "use client"

// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, Outlet } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi"
// import { setProducts } from "../slice/adminSlice"
// import api from "../axiosIntence"

// const Products = () => {
//   const dispatch = useDispatch()
//   const { products } = useSelector((state) => state.admin)
//   const [isEditing, setIsEditing] = useState(false)
//   const [currentProduct, setCurrentProduct] = useState(null)
//   const [selectedCategory, setSelectedCategory] = useState("All")
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [productToDelete, setProductToDelete] = useState(null)
//   const [imagePreview, setImagePreview] = useState("")
//   const [imageFile, setImageFile] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         when: "beforeChildren",
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.3,
//       },
//     },
//   }

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 25,
//         duration: 0.3,
//       },
//     },
//     exit: { opacity: 0, scale: 0.9 },
//   }

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await api.get("/products")
//         dispatch(setProducts(response.data))
//         setIsLoading(false)
//       } catch (error) {
//         console.error("Error fetching products:", error)
//         setIsLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [dispatch])

//   const deleteProduct = async () => {
//     if (productToDelete) {
//       try {
//         await api.delete(`/admin/products/${productToDelete._id}`)
//         dispatch(setProducts(products.filter((product) => product._id !== productToDelete._id)))
//         setIsDeleteModalOpen(false)
//       } catch (error) {
//         console.error("Error deleting product:", error)
//       }
//     }
//   }

//   const handleEditSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", e.target.name.value)
//       formData.append("price", e.target.price.value)
//       formData.append("stock", e.target.stock.value)
//       formData.append("categories", e.target.category.value)
//       formData.append("description", e.target.description.value)

//       if (imageFile) {
//         formData.append("images", imageFile)
//       }

//       // Make direct API call instead of relying on Redux action
//       const response = await api.put(`/admin/products/${currentProduct._id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })

//       // Update the Redux store with the updated product
//       const updatedProducts = products.map((product) => (product._id === currentProduct._id ? response.data : product))

//       dispatch(setProducts(updatedProducts))

//       // Reset form state
//       setIsEditing(false)
//       setCurrentProduct(null)
//       setImagePreview("")
//       setImageFile(null)
//     } catch (error) {
//       console.error("Error updating product:", error)
//       alert(`Failed to update product: ${error.message || "Unknown error"}`)
//       // Keep the form open so user can try again
//       setIsSubmitting(false)
//       return // Prevent the form from closing on error
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const filteredProducts = products.filter((product) =>
//     selectedCategory === "All" ? true : product.categories?.toLowerCase() === selectedCategory.toLowerCase(),
//   )

//   if (isLoading) {
//     return (
//       <div className="p-8 grid gap-4">
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Main Content */}
//       <motion.div initial="hidden" animate="visible" variants={containerVariants}>
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
//             Product Management
//           </motion.h2>
//           <div className="flex space-x-3">
//             <motion.div variants={itemVariants}>
//               <Link
//                 to="/admin/add"
//                 className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
//               >
//                 <FiPlus /> Add Product
//               </Link>
//             </motion.div>
//           </div>
//         </div>

//         <motion.div variants={itemVariants} className="mb-6">
//           <div className="flex flex-wrap gap-2">
//             {["All", "Men", "Women"].map((category) => (
//               <motion.button
//                 key={category}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   selectedCategory === category
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 {category}
//               </motion.button>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div variants={containerVariants} className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <AnimatePresence>
//                   {filteredProducts.map((product) => (
//                     <motion.tr key={product._id} variants={itemVariants} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10">
//                             <img
//                               src={product.images?.url || product.images}
//                               alt={product.name}
//                               className="h-10 w-10 rounded-md object-cover"
//                             />
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">{product.name}</div>
//                             <div className="text-sm text-gray-500">ID: {product._id}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             product.stock > 10
//                               ? "bg-green-100 text-green-800"
//                               : product.stock > 0
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-red-100 text-red-800"
//                           }`}
//                         >
//                           {product.stock} in stock
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
//                         {product.categories}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => {
//                             setIsEditing(true)
//                             setCurrentProduct(product)
//                             setImagePreview("")
//                             setImageFile(null)
//                           }}
//                           className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
//                           title="Edit"
//                         >
//                           <FiEdit2 />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => {
//                             setProductToDelete(product)
//                             setIsDeleteModalOpen(true)
//                           }}
//                           className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
//                           title="Delete"
//                         >
//                           <FiTrash2 />
//                         </motion.button>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Edit Product Modal */}
//       <AnimatePresence>
//         {isEditing && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//           >
//             <motion.div
//               variants={modalVariants}
//               className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-xl font-bold">Edit Product</h3>
//                   <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
//                     <FiX size={24} />
//                   </button>
//                 </div>

//                 {currentProduct && (
//                   <form onSubmit={handleEditSubmit}>
//                     <div className="grid md:grid-cols-2 gap-6 mb-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                         <input
//                           type="text"
//                           name="name"
//                           defaultValue={currentProduct.name}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//                         <input
//                           type="number"
//                           name="price"
//                           defaultValue={currentProduct.price}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
//                         <input
//                           type="number"
//                           name="stock"
//                           defaultValue={currentProduct.stock}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                         <select
//                           name="category"
//                           defaultValue={currentProduct.categories}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                           required
//                         >
//                           <option value="men">Men</option>
//                           <option value="women">Women</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                       <textarea
//                         name="description"
//                         defaultValue={currentProduct.description}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                         rows="3"
//                         required
//                       />
//                     </div>

//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
//                       <input
//                         type="file"
//                         name="image"
//                         onChange={(e) => {
//                           if (e.target.files[0]) {
//                             setImageFile(e.target.files[0])
//                             setImagePreview(URL.createObjectURL(e.target.files[0]))
//                           }
//                         }}
//                         className="w-full text-sm text-gray-500 mb-2"
//                       />
//                       <div className="flex items-center gap-4">
//                         {imagePreview ? (
//                           <img
//                             src={imagePreview || "/placeholder.svg"}
//                             alt="Preview"
//                             className="h-24 w-24 object-cover rounded-lg"
//                           />
//                         ) : (
//                           currentProduct.images && (
//                             <img
//                               src={currentProduct.images?.url || currentProduct.images}
//                               alt="Current"
//                               className="h-24 w-24 object-cover rounded-lg"
//                             />
//                           )
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex justify-end gap-3">
//                       <motion.button
//                         whileHover={{ scale: 1.03 }}
//                         whileTap={{ scale: 0.97 }}
//                         type="button"
//                         onClick={() => setIsEditing(false)}
//                         className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg"
//                         disabled={isSubmitting}
//                       >
//                         Cancel
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.03 }}
//                         whileTap={{ scale: 0.97 }}
//                         type="submit"
//                         className={`px-6 py-2 ${isSubmitting ? "bg-blue-400" : "bg-blue-600"} text-white rounded-lg flex items-center justify-center`}
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <svg
//                               className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 key="circle"
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 key="path"
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Saving...
//                           </>
//                         ) : (
//                           "Save Changes"
//                         )}
//                       </motion.button>
//                     </div>
//                   </form>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {isDeleteModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//           >
//             <motion.div variants={modalVariants} className="bg-white rounded-xl shadow-lg w-full max-w-md">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-bold">Confirm Deletion</h3>
//                   <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-500 hover:text-gray-700">
//                     <FiX size={24} />
//                   </button>
//                 </div>
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to delete <span className="font-medium">{productToDelete?.name}</span>? This
//                   action cannot be undone.
//                 </p>
//                 <div className="flex justify-end gap-3">
//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => setIsDeleteModalOpen(false)}
//                     className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg"
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={deleteProduct}
//                     className="px-6 py-2 bg-red-600 text-white rounded-lg"
//                   >
//                     Delete
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <Outlet />
//     </div>
//   )
// }

// export default Products


import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { setProducts, editProduct } from "../slice/adminSlice"
import api from "../axiosIntence"
import { Package, Edit, Trash2, Plus, X, Save, AlertTriangle, Search, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function Products() {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.admin)
  const [isEditing, setIsEditing] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/products")
      dispatch(setProducts(response.data))
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProduct = async () => {
    if (productToDelete) {
      try {
        await api.delete(`/admin/products/${productToDelete._id}`)
        dispatch(setProducts(products.filter((product) => product._id !== productToDelete._id)))
        setIsDeleteModalOpen(false)
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", e.target.name.value)
    formData.append("price", e.target.price.value)
    formData.append("stock", e.target.stock.value)
    formData.append("categories", e.target.category.value)
    formData.append("description", e.target.description.value)
    if (imageFile) {
      formData.append("images", imageFile)
    }
    try {
      await dispatch(
        editProduct({
          _id: currentProduct._id,
          updatedProduct: formData,
        }),
      )
      setIsEditing(false)
      setCurrentProduct(null)
      setImagePreview("")
      setImageFile(null)
      fetchProducts()
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All" ? true : product.categories?.toLowerCase() === selectedCategory.toLowerCase(),
    )
    .filter((product) => product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Package className="mr-2 text-indigo-600" />
              Product Management
            </h2>
            <Link
              to="/admin/add"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="mr-1" size={18} />
              Add Product
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex space-x-2 mb-4 md:mb-0">
              {["All", "Men", "Women"].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
              />
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No products found</h3>
                <p className="text-gray-500 mt-2">Try changing your search or filter criteria</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <motion.table
                  className="min-w-full divide-y divide-gray-200"
                  variants={tableVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <motion.tr
                        key={product._id}
                        variants={rowVariants}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                src={product.images?.url || product.images}
                                alt={product.name}
                                className="h-10 w-10 rounded-md object-cover border border-gray-200"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-xs text-gray-500 truncate max-w-xs">{product._id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${product.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.stock > 10
                                ? "bg-green-100 text-green-800"
                                : product.stock > 0
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.categories}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <motion.button
                              onClick={() => {
                                setIsEditing(true)
                                setCurrentProduct(product)
                              }}
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Edit size={18} />
                            </motion.button>
                            <motion.button
                              onClick={() => {
                                setProductToDelete(product)
                                setIsDeleteModalOpen(true)
                              }}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </motion.table>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {isEditing && currentProduct && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-3/4 max-w-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Edit Product</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={currentProduct.name}
                      className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      name="price"
                      defaultValue={currentProduct.price}
                      className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      defaultValue={currentProduct.stock}
                      className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      defaultValue={currentProduct.categories}
                      className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="image"
                                type="file"
                                className="sr-only"
                                onChange={(e) => {
                                  if (e.target.files[0]) {
                                    setImageFile(e.target.files[0])
                                    setImagePreview(URL.createObjectURL(e.target.files[0]))
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-24 h-24 flex-shrink-0">
                      {imagePreview ? (
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        currentProduct.images && (
                          <img
                            src={currentProduct.images?.url || currentProduct.images}
                            alt="Current"
                            className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    defaultValue={currentProduct.description}
                    className="p-2 border border-gray-300 rounded-lg w-full h-24 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <X className="mr-1" size={18} />
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save className="mr-1" size={18} />
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="text-center mb-5">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Product</h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this product? This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-5">
                <motion.button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={deleteProduct}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Outlet />
    </div>
  )
}

export default Products
