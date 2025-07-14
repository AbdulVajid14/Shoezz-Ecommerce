
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers, fetchUserDetails, updateUserBlockStatus } from "../slice/adminSlice";

// function Users() {
//   const dispatch = useDispatch();
//   const { users, loading, error, selectedUserDetails } = useSelector((state) => state.admin);
//   const [isModalOpen, setIsModalOpen] = useState(false);

  
//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const viewUserDetails = async (userId) => {
//     await dispatch(fetchUserDetails(userId));
//     setIsModalOpen(true);
//   };

//   const toggleBlockStatus = async (userId) => {
//     const user = users.find((u) => u._id === userId);

//     if (!user) {
//       alert("User not found!");
//       return;
//     }

//     const action = user.isBlocked ? "Unblock" : "Block";
//     const confirmed = window.confirm(`Are you sure you want to ${action} this user?`);

//     if (!confirmed) {
//       return;
//     }

//     try {
//       await dispatch(updateUserBlockStatus({ userId, isBlocked: !user.isBlocked }));
//       alert(`${action}ed user successfully`);
//       dispatch(fetchUsers()); 
//     } catch (error) {
//       console.error("Error updating block status:", error);
//       alert("Error updating block status");
//     }
//   };

//   if (loading) {
//     return <p className="text-center p-4">Loading users...</p>;
//   }

//   if (error) {
//     return <p className="text-center p-4 text-red-500">Error: {error}</p>;
//   }

//   return (
//     <div className="p-6 max-w-screen-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Registered Users</h2>
//       <ul className="mb-6 space-y-4">
//         {users.map((user) => (
//           <li key={user._id} className="flex justify-between items-center">
//             <span>
//               {user.username} ({user.email})
//             </span>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => viewUserDetails(user._id)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded text-sm sm:text-base"
//               >
//                 View Details
//               </button>
//               <button
//                 onClick={() => toggleBlockStatus(user._id)}
//                 className={`px-3 py-1 rounded text-sm sm:text-base ${
//                   user.isBlocked ? "bg-green-500 text-white" : "bg-red-500 text-white"
//                 }`}
//               >
//                 {user.isBlocked ? "Unblock" : "Block"}
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {isModalOpen && selectedUserDetails && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto sm:max-w-2xl relative">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="sticky top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-700"
//             >
//               &times;  
//             </button>
//             <h3 className="text-lg font-bold mb-2">User Details</h3>
//             <p><strong>Name:</strong> {selectedUserDetails.user?.username || "N/A"}</p>
//             <p><strong>Email:</strong> {selectedUserDetails.user?.email || "N/A"}</p>

//             <h4 className="text-md font-bold mt-4">Cart</h4>
//             {selectedUserDetails.cart?.items?.length > 0 ? (
//               <ul className="list-disc pl-4">
//                 {selectedUserDetails.cart.items.map((item, index) => (
//                   <li key={index}>
//                     Product: {item.product?.name}, Quantity: {item.quantity}, Price: ${item.product?.price}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No items in the cart.</p>
//             )}

//             <h4 className="text-md font-bold mt-4">Orders</h4>
//             {selectedUserDetails.orders?.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full table-auto border-collapse border border-gray-200">
//                   <thead>
//                     <tr>
//                       <th className="px-4 py-2 border-b">Order ID</th>
//                       <th className="px-4 py-2 border-b">Status</th>
//                       <th className="px-4 py-2 border-b">Total</th>
//                       <th className="px-4 py-2 border-b">Order Date</th>
//                       <th className="px-4 py-2 border-b">Cart Items</th>
//                       <th className="px-4 py-2 border-b">Shipping Address</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedUserDetails.orders.map((order, index) => (
//                       <tr key={index}>
//                         <td className="px-4 py-2 border-b">{order._id}</td>
//                         <td className="px-4 py-2 border-b">{order.status}</td>
//                         <td className="px-4 py-2 border-b">
//                           ${order.cartItems.reduce((total, item) => total + item.product?.price * item.quantity, 0).toFixed(2)}
//                         </td>
//                         <td className="px-4 py-2 border-b">
//                           {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
//                         </td>
//                         <td className="px-4 py-2 border-b">
//                           <ul className="list-disc pl-4">
//                             {order.cartItems.map((item, idx) => (
//                               <li key={idx}>
//                                 Product: {item.product?.name}, Quantity: {item.quantity}, Price: ${item.product?.price}
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td className="px-4 py-2 border-b">
//                           {order.shippingAddress ? (
//                             <div>
//                               <p><strong>Name:</strong> {order.shippingAddress.fullName || "N/A"}</p>
//                               <p><strong>Phone No:</strong> {order.shippingAddress.phone || "N/A"}</p>
//                               <p><strong>Street:</strong> {order.shippingAddress.street || "N/A"}</p>
//                               <p><strong>City:</strong> {order.shippingAddress.city || "N/A"}</p>
//                               <p><strong>State:</strong> {order.shippingAddress.state || "N/A"}</p>
//                               <p><strong>Pincode:</strong> {order.shippingAddress.zipCode || "N/A"}</p>
//                             </div>
//                           ) : (
//                             <p>No shipping address provided for this order.</p>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p>No orders placed.</p>
//             )}
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Users;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiShoppingCart, FiPackage, FiMapPin, FiX, FiCheck, FiAlertCircle } from "react-icons/fi";
import { fetchUsers, fetchUserDetails, updateUserBlockStatus } from "../slice/adminSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, selectedUserDetails } = useSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  const filteredUsers = users?.filter(user => 
    (user?.username?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
    (user?.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  ) || [];

  const viewUserDetails = async (userId) => {
    await dispatch(fetchUserDetails(userId));
    setIsModalOpen(true);
  };

  const toggleBlockStatus = async (userId) => {
    const user = users.find((u) => u._id === userId);
    if (!user) return;

    const action = user.isBlocked ? "unblock" : "block";
    const confirmed = window.confirm(`Are you sure you want to ${action} this user?`);
    if (!confirmed) return;

    try {
      await dispatch(updateUserBlockStatus({ userId, isBlocked: !user.isBlocked }));
      dispatch(fetchUsers());
    } catch (error) {
      console.error("Error updating block status:", error);
    }
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
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
        <FiAlertCircle className="inline-block text-2xl mb-2" />
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiUser className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {filteredUsers.map((user) => (
          <motion.li
            key={user._id}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
              <div className="flex items-center mb-3 sm:mb-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  user.isBlocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                }`}>
                  <FiUser />
                </div>
                <div>
                  <h3 className="font-medium">{user.username}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => viewUserDetails(user._id)}
                  className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm flex items-center"
                >
                  <FiPackage className="mr-1" /> Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleBlockStatus(user._id)}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                    user.isBlocked 
                      ? "bg-green-500 text-white" 
                      : "bg-red-500 text-white"
                  }`}
                >
                  {user.isBlocked ? (
                    <>
                      <FiCheck className="mr-1" /> Unblock
                    </>
                  ) : (
                    <>
                      <FiX className="mr-1" /> Block
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>

      <AnimatePresence>
        {isModalOpen && selectedUserDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          >
            <motion.div
              variants={modalVariants}
              className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">User Details</h3>
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
                    <h4 className="font-bold text-lg mb-3 flex items-center">
                      <FiUser className="mr-2" /> Basic Information
                    </h4>
                    <div className="space-y-2">
                      <p><span className="font-medium">Username:</span> {selectedUserDetails.user?.username || "N/A"}</p>
                      <p><span className="font-medium">Email:</span> {selectedUserDetails.user?.email || "N/A"}</p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          selectedUserDetails.user?.isBlocked 
                            ? "bg-red-100 text-red-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {selectedUserDetails.user?.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                    <h4 className="font-bold text-lg mb-3 flex items-center">
                      <FiShoppingCart className="mr-2" /> Cart Summary
                    </h4>
                    {selectedUserDetails.cart?.items?.length > 0 ? (
                      <div>
                        <p className="font-medium mb-2">
                          {selectedUserDetails.cart.items.length} item(s) in cart
                        </p>
                        <ul className="space-y-1">
                          {selectedUserDetails.cart.items.slice(0, 3).map((item, index) => (
                            <li key={index} className="text-sm">
                              {item.product?.name} (x{item.quantity})
                            </li>
                          ))}
                          {selectedUserDetails.cart.items.length > 3 && (
                            <li className="text-sm text-gray-500">
                              +{selectedUserDetails.cart.items.length - 3} more...
                            </li>
                          )}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500">No items in cart</p>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-4 flex items-center">
                    <FiPackage className="mr-2" /> Order History
                  </h4>
                  {selectedUserDetails.orders?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedUserDetails.orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                #{order._id.slice(-6)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === "Delivered" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${order.cartItems.reduce((total, item) => total + (item.product?.price || 0) * (item.quantity || 0), 0).toFixed(2)}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {order.cartItems.length} item(s)
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No orders placed</p>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 flex items-center">
                    <FiMapPin className="mr-2" /> Shipping Addresses
                  </h4>
                  {selectedUserDetails.orders?.some(order => order.shippingAddress) ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedUserDetails.orders
                        .filter(order => order.shippingAddress)
                        .slice(0, 2)
                        .map((order, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-medium mb-2">Order #{order._id.slice(-6)}</h5>
                            <div className="text-sm space-y-1">
                              <p><span className="font-medium">Name:</span> {order.shippingAddress.fullName}</p>
                              <p><span className="font-medium">Phone:</span> {order.shippingAddress.phone}</p>
                              <p><span className="font-medium">Address:</span> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No shipping addresses found</p>
                  )}
                </div>
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
    </motion.div>
  );
};

export default Users;