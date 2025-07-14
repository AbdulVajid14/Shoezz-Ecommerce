



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { removeFromCart, updateQuantity, setCart } from '../slice/userSlice';
// import api from '../axiosIntence'
// const Cart = () => {
//   const { cart, user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       api
//         .get('/cart')
//         .then((response) => {
//           dispatch(setCart(response.data.items || [])); 
//         })
//         .catch((error) => {
//           console.error('Error fetching cart:', error);
//           if (error.response?.status === 401) {
//             toast.error('Session expired. Please log in again.');
//           } else {
//             toast.error('Failed to fetch cart.');
//           }
//         });
//     }
//   }, [user, dispatch]);
  

//   const handleQuantityChange = (itemId, quantity) => {
//     const validQuantity = Math.max(1, isNaN(quantity) ? 1 : quantity); 
//     dispatch(updateQuantity({ productId: itemId, newQuantity: validQuantity }));
//   };

//   const handleCheckout = () => {
//     if (cart.length > 0) {
//       navigate('/checkout');
//     } else {
//       toast.error('Your cart is empty');
//     }
//   };

// if(!cart||cart.length === 0 )
//   return(
// <>
//   <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h2>
//         <p className="text-gray-600 text-lg">
//           Your cart is empty.{' '}
//           <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
//             Continue shopping
//           </Link>
//         </p>
//         </>
//   )
//   return (


//     <div className="container mx-auto p-4 lg:p-8">
//         <div className="space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {cart.map((item) => {
//               const product = item.product; 
//               return (
//                 <div key={item._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//                   <div className="flex flex-col space-y-4">
//                     <img
//                       src={product.images.url} 
//                       alt={product.name}
//                       className="w-full h-48 object-cover rounded-lg"
//                     />
//                     <div className="space-y-2">
//                       <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
//                       <p className="text-lg font-semibold text-gray-700">₹{product.price}</p>
//                       {item.selectedSize && (
//                         <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
//                           Size: {item.selectedSize}
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-3">
//                         <button
//                           className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
//                           onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
//                           disabled={item.quantity <= 1}
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
//                           </svg>
//                         </button>
//                         <input
//                           type="number"
//                           value={item.quantity}
//                           onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
//                           className="w-16 text-center border-2 border-gray-200 p-2 rounded-lg font-medium"
//                           min="1"
//                         />
//                         <button
//                           className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
//                           onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                           </svg>
//                         </button>
//                       </div>
//                       <button
//                         className="flex items-center space-x-1 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors"
//                         onClick={() => dispatch(removeFromCart(item.product._id))}
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                         <span className="font-medium">Remove</span>
//                       </button>
//                     </div>
//                     <div className="border-t pt-4">
//                       <p className="text-lg font-bold text-gray-800">
//                         Total: ₹{product.price * item.quantity}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg">
//             <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//               <Link
//                 to="/"
//                 className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg font-medium text-gray-700 transition-colors"
//               >
//                 ← Continue Shopping
//               </Link>
//               <div className="text-2xl font-bold text-gray-800">
//                 Total: ₹
//                 {cart.reduce((total, item) => {
//                   const product = item.product;
//                   return total + (product ? product.price * item.quantity : 0);
//                 }, 0)}
//               </div>
//               <button
//                 className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all w-full md:w-auto"
//                 onClick={handleCheckout}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
      
//       <ToastContainer />
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeFromCart, updateQuantity, setCart } from '../slice/userSlice';
import api from '../axiosIntence';
import { motion, AnimatePresence } from 'framer-motion';
import emptyCartImage from '../assets/Animation - 1742899212928.gif'; 


const Cart = () => {
  const { cart, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      api
        .get('/cart')
        .then((response) => {
          dispatch(setCart(response.data.items || []));
        })
        .catch((error) => {
          console.error('Error fetching cart:', error);
          if (error.response?.status === 401) {
            toast.error('Session expired. Please log in again.');
          } else {
            toast.error('Failed to fetch cart.');
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [user, dispatch]);

  const handleQuantityChange = (itemId, quantity) => {
    const validQuantity = Math.max(1, isNaN(quantity) ? 1 : quantity);
    dispatch(updateQuantity({ productId: itemId, newQuantity: validQuantity }));
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    } else {
      toast.error('Your cart is empty');
    }
  };

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

  const hoverEffect = {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  };

  const tapEffect = {
    scale: 0.98
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 lg:p-8 min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <motion.div 
        className="container mx-auto p-8 min-h-screen flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img 
            src={emptyCartImage} 
            alt="Empty cart" 
            className="w-64 h-64 mx-auto mb-8"
          />
        </motion.div>
        <motion.h2 
          className="text-3xl font-bold mb-4 text-gray-800 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your Shopping Cart is Empty
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-lg mb-8 text-center max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Looks like you haven't added anything to your cart yet
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Start Shopping
          </Link>
        </motion.div>
        <ToastContainer />
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>
        
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <AnimatePresence>
              {cart.map((item) => {
                const product = item.product;
                return (
                  <motion.div 
                    key={item._id}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
                    variants={itemVariants}
                    whileHover={hoverEffect}
                    whileTap={tapEffect}
                    layout
                  >
                    <div className="flex flex-col space-y-4">
                      <div className="relative overflow-hidden rounded-lg h-48">
                        <img
                          src={product.images.url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <motion.button
                          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-100 text-red-500 transition-colors"
                          onClick={() => dispatch(removeFromCart(item.product._id))}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
                        <p className="text-lg font-semibold text-blue-600">₹{product.price.toLocaleString()}</p>
                        {item.selectedSize && (
                          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.button
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                            onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </motion.button>
                          <motion.div 
                            className="w-16 text-center border-2 border-gray-200 p-2 rounded-lg font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            {item.quantity}
                          </motion.div>
                          <motion.button
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                            onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-lg font-bold text-gray-800">
                          Item Total: ₹{(product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg sticky bottom-0"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.div whileHover={{ x: -5 }}>
                <Link
                  to="/"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-xl text-gray-600">Subtotal:</span>
                <span className="text-2xl font-bold text-gray-800">
                  ₹{cart.reduce((total, item) => {
                    const product = item.product;
                    return total + (product ? product.price * item.quantity : 0);
                  }, 0).toLocaleString()}
                </span>
              </motion.div>
              
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all w-full md:w-auto"
                onClick={handleCheckout}
                whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(37, 99, 235, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Proceed to Checkout
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <ToastContainer />
    </div>
  );
};

export default Cart;