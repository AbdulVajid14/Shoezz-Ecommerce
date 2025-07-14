

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsersOrders, updateOrderStatus } from '../slice/adminSlice';
// import { toast, ToastContainer } from 'react-toastify';

// const OrdersPage = () => {
//   const dispatch = useDispatch();
//   const { users, loading, error } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchUsersOrders());
//   }, [dispatch]);

//   const handleStatusChange = (orderId, status) => {
//     dispatch(updateOrderStatus({ orderId, status }));
//     toast.success("Marked as delivered");
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
//   }

//   const sortedOrders = users;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-8">Orders</h1>
//       <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {sortedOrders.map((order) => (
//               <tr key={order._id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order._id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {order.user ? order.user.username : 'N/A'}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {order.user ? order.user.email : 'N/A'}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {new Date(order.orderDate).toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.status}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <button
//                     onClick={() => handleStatusChange(order._id, 'Delivered')}
//                     disabled={order.status !== 'Pending'}
//                     className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
//                       order.status === 'Pending'
//                         ? 'bg-blue-500 hover:bg-blue-600'
//                         : 'bg-gray-400 cursor-not-allowed'
//                     }`}
//                   >
//                     Mark as Delivered
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default OrdersPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiSearch,FiUser,FiX } from 'react-icons/fi';
import { fetchUsersOrders, updateOrderStatus } from '../slice/adminSlice';
import { toast, ToastContainer } from 'react-toastify';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { users: orders, loading, error } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersOrders());
  }, [dispatch]);

 
  const filteredOrders = orders
  .filter(order => 
    order.user?.username?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    order.user?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    order._id?.toLowerCase()?.includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

const handleStatusChange = async (orderId, status) => {
  try {
    await dispatch(updateOrderStatus({ orderId, status }));
    toast.success(`Order marked as ${status.toLowerCase()}`);
    dispatch(fetchUsersOrders());
  } catch (err) {
    toast.error("Failed to update order status");
  }
};

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { y: 50, opacity: 0 }
  };

  if (loading) {
    return (
      <div className="p-8 grid gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Error loading orders: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-7xl mx-auto min-h-screen"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center">
          <FiPackage className="text-2xl text-blue-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order._id}
                    variants={rowVariants}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button 
                        onClick={() => viewOrderDetails(order)}
                        className="text-blue-500 hover:underline"
                      >
                        #{order._id.slice(-6)}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                          <FiUser />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.user?.username || 'Guest'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.user?.email || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'Delivered' ? (
                          <FiCheckCircle className="mr-1" />
                        ) : (
                          <FiClock className="mr-1" />
                        )}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => viewOrderDetails(order)}
                        className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm"
                      >
                        View
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStatusChange(order._id, 'Delivered')}
                        disabled={order.status !== 'Pending'}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          order.status === 'Pending'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        <FiTruck className="inline mr-1" />
                        Deliver
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          >
            <motion.div
              variants={modalVariants}
              className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    Order Details #{selectedOrder._id.slice(-6)}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto flex-1 p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                    <h4 className="font-bold text-lg mb-3">Customer Information</h4>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedOrder.user?.username || 'Guest'}</p>
                      <p><span className="font-medium">Email:</span> {selectedOrder.user?.email || 'N/A'}</p>
                      <p>
                        <span className="font-medium">Order Status:</span>{" "}
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          selectedOrder.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedOrder.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                    <h4 className="font-bold text-lg mb-3">Order Summary</h4>
                    <div className="space-y-2">
                      <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                      <p>
                        <span className="font-medium">Total:</span> $
                        {selectedOrder.cartItems?.reduce(
                          (total, item) => total + (item.product?.price || 0) * (item.quantity || 0),
                          0
                        ).toFixed(2)}
                      </p>
                      <p><span className="font-medium">Items:</span> {selectedOrder.cartItems?.length || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-4">Order Items</h4>
                  {selectedOrder.cartItems?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedOrder.cartItems.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.product?.name || 'Unknown Product'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${item.product?.price?.toFixed(2) || '0.00'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${((item.product?.price || 0) * (item.quantity || 0)).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No items found in this order</p>
                  )}
                </div>

                {selectedOrder.shippingAddress && (
                  <div>
                    <h4 className="font-bold text-lg mb-4">Shipping Address</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Full Name</p>
                          <p>{selectedOrder.shippingAddress.fullName}</p>
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p>{selectedOrder.shippingAddress.phone}</p>
                        </div>
                        <div>
                          <p className="font-medium">Street</p>
                          <p>{selectedOrder.shippingAddress.street}</p>
                        </div>
                        <div>
                          <p className="font-medium">City</p>
                          <p>{selectedOrder.shippingAddress.city}</p>
                        </div>
                        <div>
                          <p className="font-medium">State</p>
                          <p>{selectedOrder.shippingAddress.state}</p>
                        </div>
                        <div>
                          <p className="font-medium">Zip Code</p>
                          <p>{selectedOrder.shippingAddress.zipCode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </motion.div>
  );
};

export default OrdersPage;