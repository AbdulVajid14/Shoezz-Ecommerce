

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOrders } from '../slice/userSlice';

// const YourOrders = () => {
//   const { orders, user, status, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (user) {
//       dispatch(getOrders(user.id));
//     }
//   }, [user, dispatch]);

//   if (status === 'loading') {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl font-semibold">Loading orders...</div>
//       </div>
//     );
//   }

//   if (status === 'failed') {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl font-semibold text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
//           <p className="text-gray-600">You have no orders yet.</p>
//         </div>
//       </div>
//     );
//   }

//   const totalOrdersPrice = orders.reduce((total, order) => {
//     const orderTotal = order.cartItems.reduce((orderSum, item) => {
//       return orderSum + item.product.price * item.quantity;
//     }, 0);
//     return total + orderTotal;
//   }, 0);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Orders</h2>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-6">
//           {orders.map((order) => {
//             const totalPrice = order.cartItems.reduce((total, item) => {
//               const itemPrice = item.product.price * item.quantity;
//               return total + itemPrice;
//             }, 0);

//             return (
//               <div
//                 key={order._id}
//                 className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-800">
//                       Order ID: {order._id}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       Status:{' '}
//                       <span
//                         className={`font-medium ${
//                           order.status === 'Pending'
//                             ? 'text-yellow-600'
//                             : order.status === 'Delivered'
//                             ? 'text-green-600'
//                             : 'text-red-600'
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Order Date: {new Date(order.orderDate).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <h4 className="font-medium text-gray-700">Items:</h4>
//                   <ul className="mt-2 space-y-3">
//                     {order.cartItems.map((item) => (
//                       <li key={item._id} className="flex items-center space-x-4">
//                         <img
//                           src={item.product.images.url}
//                           alt={item.product.name}
//                           className="w-16 h-16 object-cover rounded-lg"
//                         />
//                         <div className="flex-grow">
//                           <p className="font-medium text-gray-800">
//                             {item.product.name}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             Quantity: {item.quantity}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             Price: ₹{item.product.price}
//                           </p>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <h4 className="font-medium text-gray-700">Shipping Address:</h4>
//                     <p className="text-sm text-gray-600">
//                       {order.shippingAddress.fullName}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       {order.shippingAddress.street}, {order.shippingAddress.city}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       {order.shippingAddress.state}, {order.shippingAddress.zipCode}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Phone: {order.shippingAddress.phone}
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-700">Payment Details:</h4>
//                     <p className="text-sm text-gray-600">
//                       Method: {order.paymentDetails.paymentMethod}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Total: ₹{totalPrice.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-24">
//           <h3 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h3>
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Total Orders:</span>
//               <span className="font-medium">{orders.length}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Pending Orders:</span>
//               <span className="font-medium text-yellow-600">
//                 {orders.filter((order) => order.status === 'Pending').length}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Delivered Orders:</span>
//               <span className="font-medium text-green-600">
//                 {orders.filter((order) => order.status === 'Delivered').length}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Total Spent:</span>
//               <span className="font-medium">₹{totalOrdersPrice.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YourOrders;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../slice/userSlice';
import { motion, AnimatePresence } from 'framer-motion';
import emptyOrdersImage from '../assets/Animation - 1742901942541.gif'; // Replace with your empty orders image
import { FiPackage, FiCheckCircle, FiClock, FiDollarSign, FiTruck } from 'react-icons/fi';

const YourOrders = () => {
  const { orders, user, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getOrders(user.id));
    }
  }, [user, dispatch]);

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
        duration: 0.5
      }
    }
  };

  const cardHover = {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  };

  const statusColors = {
    'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <FiClock className="text-yellow-500" /> },
    'Delivered': { bg: 'bg-green-100', text: 'text-green-800', icon: <FiCheckCircle className="text-green-500" /> },
    'Shipped': { bg: 'bg-blue-100', text: 'text-blue-800', icon: <FiTruck className="text-blue-500" /> },
    'Cancelled': { bg: 'bg-red-100', text: 'text-red-800', icon: <FiPackage className="text-red-500" /> }
  };

  if (status === 'loading') {
    return (
      <motion.div 
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading your orders...</p>
        </div>
      </motion.div>
    );
  }

  if (status === 'failed') {
    return (
      <motion.div 
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage className="text-red-500 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error loading orders</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(getOrders(user.id))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <motion.div 
        className="flex flex-col justify-center items-center h-screen p-6"
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
            src={emptyOrdersImage} 
            alt="No orders" 
            className="w-64 h-64 mx-auto mb-8"
          />
        </motion.div>
        <motion.h2 
          className="text-3xl font-bold mb-4 text-gray-800 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          No Orders Yet
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-lg mb-8 text-center max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Your order history will appear here once you make a purchase
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="/"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center"
          >
            <FiPackage className="mr-2" />
            Start Shopping
          </a>
        </motion.div>
      </motion.div>
    );
  }

  const totalOrdersPrice = orders.reduce((total, order) => {
    const orderTotal = order.cartItems.reduce((orderSum, item) => {
      return orderSum + item.product.price * item.quantity;
    }, 0);
    return total + orderTotal;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-gray-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Your Order History
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Order Summary Card */}
            <motion.div 
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-md sticky top-16">
                <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                  <FiPackage className="mr-2 text-blue-500" />
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Orders:</span>
                    <span className="font-medium text-gray-800">{orders.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-medium text-yellow-600 flex items-center">
                      <FiClock className="mr-1" />
                      {orders.filter(o => o.status === 'Pending').length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivered:</span>
                    <span className="font-medium text-green-600 flex items-center">
                      <FiCheckCircle className="mr-1" />
                      {orders.filter(o => o.status === 'Delivered').length}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Spent:</span>
                      <span className="font-bold text-gray-800 flex items-center">
                        ₹{totalOrdersPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Orders List */}
            <motion.div 
              className="lg:col-span-3 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {orders.map((order) => {
                  const totalPrice = order.cartItems.reduce((total, item) => {
                    return total + (item.product.price * item.quantity);
                  }, 0);
                  
                  const statusConfig = statusColors[order.status] || statusColors['Pending'];

                  return (
                    <motion.div
                      key={order._id}
                      variants={itemVariants}
                      whileHover={cardHover}
                      className="bg-white p-6 rounded-xl shadow-md overflow-hidden"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-gray-200">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Placed on {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <motion.div
                          className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center ${statusConfig.bg} ${statusConfig.text}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {statusConfig.icon}
                          <span className="ml-1">{order.status}</span>
                        </motion.div>
                      </div>
                      
                      {/* Order Items */}
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-700 mb-3">Items Ordered</h4>
                        <ul className="space-y-4">
                          {order.cartItems.map((item) => (
                            <motion.li 
                              key={item._id} 
                              className="flex items-start space-x-4"
                              whileHover={{ x: 5 }}
                            >
                              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                  src={item.product.images.url}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="font-medium text-gray-800">{item.product.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                <p className="text-sm text-gray-500">Size: {item.selectedSize || 'N/A'}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-800">₹{item.product.price}</p>
                                <p className="text-sm text-gray-500">Total: ₹{(item.product.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Order Footer */}
                      <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Shipping Address</h4>
                          <address className="text-sm text-gray-600 not-italic">
                            {order.shippingAddress.fullName}<br />
                            {order.shippingAddress.street}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                            {order.shippingAddress.zipCode}<br />
                            Phone: {order.shippingAddress.phone}
                          </address>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Payment Details</h4>
                          <div className="text-sm text-gray-600">
                            <p className="mb-1">Method: {order.paymentDetails.paymentMethod}</p>
                            <p className="mb-1">Status: {order.paymentDetails.status || 'Completed'}</p>
                            <p className="font-medium text-gray-800 mt-2">
                              Order Total: ₹{totalPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default YourOrders;