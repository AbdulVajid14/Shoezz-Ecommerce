
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../slice/userSlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import api from '../axiosIntence'

// const ProductDetails = () => {
//     const { id } = useParams();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);
//   const [product, setProduct] = useState(null);
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
//   const [selectedSize, setSelectedSize] = useState(null); 
//   const navigate = useNavigate();

  
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await api.get(`/products/${id}`); 
//         setProduct(response.data);
//       } catch (err) {
//         console.error("Error fetching the product:", err);
//         setError("Failed to fetch product. Please try again later.");
//       }
//     };

//     fetchProduct();
//   }, [id]);


//   const handleAddToCart = async () => {
//     if (!user) {
//       setShowLoginPrompt(true);
//       return;
//     }
  
//     if (!selectedSize) {
//       toast.error('Please select a size before adding to cart');
//       return;
//     }
  
//     try {
//       await dispatch(
//         addToCart({ productId: product._id, quantity: 1, selectedSize })
//       ).unwrap();
//       toast.success('Product added to cart!');
//     } catch (error) {
//       toast.error(error.payload || 'Failed to add item to cart');
//     }
//   };
//   const handleLoginRedirect = () => {
//     navigate("/login");
//   };

//   const handleCloseLoginPrompt = () => {
//     setShowLoginPrompt(false);
//   };

//   if (!product) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:flex lg:gap-8">
//           <div className="lg:w-1/2 mb-8 lg:mb-0">
//             <img
//               src={product.images.url}
//               alt={product.name}
//               className="w-full h-96 object-contain rounded-xl bg-gray-100 p-4"
//             />
//           </div>

//           <div className="lg:w-1/2 space-y-6">
//             <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
//               {product.name}
//             </h1>

//             <div className="space-y-4">
//               <p className="text-2xl font-semibold text-gray-900">
//               ₹{product.price}
//                 <span className="text-sm text-gray-500 ml-2">(incl. taxes)</span>
//               </p>

//               <div className="flex items-center space-x-4 text-sm text-gray-600">
//                 <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
//                   {product.stock} in stock
//                 </span>
//                 <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
//                   {product.categories}
//                 </span>
//               </div>

//               <div className="pt-4 border-t border-gray-200">
//                 <p className="text-gray-700 leading-relaxed">{product.description}</p>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <label className="block text-sm font-medium text-gray-700">
//                 Select Size
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {[6, 7, 8, 9, 10].map((size) => (
//                   <button
//                     key={size}
//                     className={`w-12 h-12 flex items-center justify-center border-2 rounded-full text-sm font-medium transition-all
//                       ${
//                         selectedSize === size
//                           ? "bg-gray-900 text-white border-gray-900"
//                           : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
//                       }`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="pt-6 border-t border-gray-200">
//               <button
//                 className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl font-medium
//                          hover:bg-gray-800 transition-colors duration-200 shadow-sm
//                          disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleAddToCart}
//                 disabled={!selectedSize}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {showLoginPrompt && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
//               <h3 className="text-lg font-semibold mb-4">
//                 Sign in to add items to your cart
//               </h3>
//               <div className="flex gap-3 justify-center">
//                 <button
//                   onClick={handleLoginRedirect}
//                   className="px-6 py-2 bg-gray-900 text-white rounded-full
//                            hover:bg-gray-800 transition-colors duration-200"
//                 >
//                   Continue to Login
//                 </button>
//                 <button
//                   onClick={handleCloseLoginPrompt}
//                   className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full
//                            hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <ToastContainer position="bottom-right" autoClose={3000} />
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slice/userSlice";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiHeart, FiArrowLeft, FiCheck, FiX } from "react-icons/fi";
import api from '../axiosIntence';
import { Toaster, toast } from 'sonner';


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        duration: 0.5
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        if (response.data.images?.url) {
          setProduct(prev => ({
            ...prev,
            gallery: [response.data.images.url]
          }));
        }
      } catch (err) {
        console.error("Error fetching the product:", err);
        setError("Failed to fetch product. Please try again later.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size before adding to cart');
      return;
    }

    try {
      await dispatch(
        addToCart({ productId: product._id, quantity: 1, selectedSize })
      ).unwrap();
      toast.success('product add to cart');
    } catch (error) {
      toast.error(error.payload || 'Failed to add item to cart');
    }
  };

 

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: `/products/${id}` } });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-96 bg-gray-200 rounded-xl w-full"></div>
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8"
    >
            <Toaster position="bottom-right" richColors expand={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Products
        </motion.button>

        <motion.div 
          variants={containerVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden lg:flex"
        >
          {/* Product Images */}
          <div className="lg:w-1/2 p-6 md:p-8">
            <motion.div
              variants={imageVariants}
              className="relative h-96 w-full bg-gray-50 rounded-xl overflow-hidden mb-4"
            >
              <img
                src={product.gallery?.[currentImage] || product.images.url}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
              
            </motion.div>

            {product.gallery && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {product.gallery.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      currentImage === index ? 'border-gray-900' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div 
            variants={containerVariants}
            className="lg:w-1/2 p-6 md:p-8 lg:border-l border-gray-100"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {product.categories}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <p className="text-3xl font-bold text-gray-900 mb-2">
                ₹{product.price}
                <span className="text-sm text-gray-500 ml-2">(incl. taxes)</span>
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FiCheck className="text-green-500" />
                <span>Free shipping on orders over ₹5000</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {[6, 7, 8, 9, 10].map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!selectedSize || product.stock <= 0}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium shadow-md transition-all ${
                  !selectedSize || product.stock <= 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:shadow-lg'
                }`}
              >
                <FiShoppingCart className="text-lg" />
                {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </motion.button>

            </motion.div>
          </motion.div>
        </motion.div>

        {/* Product Features */}
        <motion.div 
          variants={containerVariants}
          className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Details</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Designed for comfort and durability</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Breathable fabric technology</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping & Returns</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Free shipping on orders over ₹5000</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>30-day return policy</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Delivery within 3-5 business days</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Login Prompt Modal */}
        <AnimatePresence>
          {showLoginPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Sign in required</h3>
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
                <p className="text-gray-600 mb-6">
                  You need to sign in to add items to your cart. Would you like to sign in now?
                </p>
                <div className="flex gap-3 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleLoginRedirect}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Continue to Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowLoginPrompt(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
      </div>
    </motion.div>
  );
};

export default ProductDetails;