
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createProduct } from '../slice/adminSlice';

// function AddProducts() {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.admin);

//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     stock: '',
//     categories: '',
//     images: null,
//     description: '',
//   });
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       images: file, 
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', product.name);
//     formData.append('price', product.price);
//     formData.append('stock', product.stock);
//     formData.append('categories', product.categories);
//     formData.append('description', product.description);
//     formData.append('images', product.images); 

//     dispatch(createProduct(formData))
//       .then(() => {
//         setSuccessMessage('Product added successfully!');
//         setErrorMessage('');
//         setProduct({
//           name: '',
//           price: '',
//           stock: '',
//           categories: '',
//           images: null,
//           description: '',
//         });
//       })
//       .catch(() => {
//         setErrorMessage('Error adding product. Please try again.');
//         setSuccessMessage('');
//       });
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-lg font-bold mb-4">Add New Product</h2>
//       {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
//       {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="mb-4">
//           <label className="block mb-2">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             className="p-2 border w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             className="p-2 border w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Stock</label>
//           <input
//             type="number"
//             name="stock"
//             value={product.stock}
//             onChange={handleChange}
//             className="p-2 border w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Category</label>
//           <select
//             name="categories"
//             value={product.categories}
//             onChange={handleChange}
//             className="p-2 border w-full"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="men">men</option>
//             <option value="women">women</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Image</label>
//           <input
//             type="file"
//             name="images"
//             onChange={handleImageChange}
//             className="p-2 border w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Description</label>
//           <textarea
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             className="p-2 border w-full"
//             required
//           ></textarea>
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add Product
//         </button>
//       </form>

//       <div className="mt-8">
//         <h3 className="text-lg font-bold mb-4">Existing Products</h3>
//         <ul className="list-disc pl-5">
//           {products.map((p) => (
//             <li key={p._id} className="mb-2">
//               {p.name} - ${p.price}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default AddProducts;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiImage, FiCheck, FiX } from 'react-icons/fi';
import { createProduct } from '../slice/adminSlice';

const AddProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.admin);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    categories: '',
    images: null,
    description: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const notificationVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { y: 50, opacity: 0 }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct(prev => ({ ...prev, images: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('categories', product.categories);
    formData.append('description', product.description);
    formData.append('images', product.images);

    try {
      await dispatch(createProduct(formData)).unwrap();
      
      setNotification({
        show: true,
        message: 'Product added successfully!',
        type: 'success'
      });

      // Reset form
      setProduct({
        name: '',
        price: '',
        stock: '',
        categories: '',
        images: null,
        description: '',
      });
      setImagePreview('');

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);

    } catch (error) {
      setNotification({
        show: true,
        message: 'Error adding product. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600">Fill out the form to add a new product to your store</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter product name"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter price"
                  min="0"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter stock quantity"
                  min="0"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="categories"
                  value={product.categories}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiImage className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="text-sm text-gray-500">Upload Image</p>
                  </div>
                  <input 
                    type="file" 
                    name="images"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                    required
                  />
                </label>
                {imagePreview && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative"
                  >
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setProduct(prev => ({ ...prev, images: null }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter product description"
              ></textarea>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow hover:shadow-md transition-all"
              >
                <FiPlus className="w-5 h-5" />
                Add Product
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {products.length > 0 && (
          <motion.div 
            variants={containerVariants}
            className="mt-8 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recently Added Products</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.slice(0, 5).map((product) => (
                      <motion.tr 
                        key={product._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{product.categories}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white flex items-center gap-2`}
          >
            <FiCheck className="w-5 h-5" />
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddProducts;