
// // import React, { useState } from 'react';
// // import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom';

// // function Admin() {
// //   const navigate = useNavigate();

// //   const isAdmin = localStorage.getItem("isAdmin");
// //   if (!isAdmin) {
// //     return <Navigate to="/login" />;
// //   }
// //   const [showModal,setShowModal] = useState(false);
// //   const handleLogoutClick = () => {
// //     setShowModal(true);
// //   };
// //   const handleCancelLogout = () => {
// //     setShowModal(false);
// //   };
// //   const handleConfirmLogout = () => {
// //     localStorage.removeItem("isAdmin");
// //     navigate('/login');
// //   };
// //   return (
// //     <div className="flex min-h-screen">
// //       <div className="w-64 bg-gray-800 text-white p-5 sticky top-0 h-screen flex flex-col">
// //         <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
// //         <ul className="flex-1">
// //           <li className="mb-6">
// //             <Link to="dashboard" className="text-white hover:text-blue-500">
// //               Dashboard
// //             </Link>
// //           </li>
// //           <li className="mb-6">
// //             <Link to="products" className="text-white hover:text-blue-500">
// //               Products
// //             </Link>
// //           </li>
// //           <li className="mb-6">
// //             <Link to="users" className="text-white hover:text-blue-500">
// //               Users
// //             </Link>
// //           </li>
// //           <li className="mb-6">
// //             <Link to="orders" className="text-white hover:text-blue-500">
// //               Orders
// //             </Link>
// //           </li>
// //         </ul>

// //         <div className="mt-auto">
// //           <button
// //             onClick={handleLogoutClick}
// //             className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-500"
// //           >
// //             Logout
// //           </button>
// //         </div>
// //       </div>

// //       <div className="flex-1 p-8 bg-gray-100">
// //         <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
// //         <p>Welcome to the Admin Panel!</p>
// //         <Outlet />
// //       </div>

// //       {showModal && (
// //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
// //   <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-lg w-full sm:w-3/4 md:w-1/3">
// //     <h2 className="text-xl sm:text-2xl font-bold mb-4">Are you sure you want to log out?</h2>
// //     <div className="flex justify-end space-x-4">
// //       <button
// //         onClick={handleCancelLogout}
// //         className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 text-sm sm:text-base"
// //       >
// //         Cancel
// //       </button>
// //       <button
// //         onClick={handleConfirmLogout}
// //         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 text-sm sm:text-base"
// //       >
// //         Confirm
// //       </button>
// //     </div>
// //   </div>
// // </div>

// //       )}
// //     </div>
// //   );
// // }

// // export default Admin;


// // Admin.jsx
// import { useState } from 'react';
// import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiChevronRight, FiBox, FiUsers, FiDollarSign, FiShoppingBag,FiLogOut } from 'react-icons/fi';

// const sidebarVariants = {
//   hidden: { x: -100, opacity: 0 },
//   visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
// };

// const contentVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { delay: 0.2 } }
// };

// const modalVariants = {
//   hidden: { y: 50, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 150 } },
//   exit: { y: 50, opacity: 0 }
// };

// function Admin() {
//   const navigate = useNavigate();
//   const isAdmin = localStorage.getItem("isAdmin");
//   const [showModal, setShowModal] = useState(false);

//   if (!isAdmin) return <Navigate to="/login" />;

//   const menuItems = [
//     { path: 'dashboard', name: 'Dashboard', icon: <FiDollarSign /> },
//     { path: 'products', name: 'Products', icon: <FiBox /> },
//     { path: 'users', name: 'Users', icon: <FiUsers /> },
//     { path: 'orders', name: 'Orders', icon: <FiShoppingBag /> }
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("isAdmin");
//     navigate('/login');
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={sidebarVariants}
//         className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl p-5 sticky top-0 h-screen flex flex-col"
//       >
//         <h2 className="text-2xl font-bold text-white mb-8 ml-2">Admin Panel</h2>
//         <ul className="flex-1 space-y-2">
//           {menuItems.map((item, index) => (
//             <motion.li
//               key={item.path}
//               initial={{ x: -20 }}
//               animate={{ x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Link
//                 to={item.path}
//                 className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-300 group"
//               >
//                 <span className="text-xl mr-3 group-hover:text-blue-400">{item.icon}</span>
//                 <span className="group-hover:text-white">{item.name}</span>
//                 <FiChevronRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
//               </Link>
//             </motion.li>
//           ))}
//         </ul>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setShowModal(true)}
//           className="mt-auto flex items-center justify-center gap-2 p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
//         >
//           <FiLogOut className="text-lg" />
//           Logout
//         </motion.button>
//       </motion.div>

//       <motion.div
//         variants={contentVariants}
//         className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100"
//       >
//         <Outlet />
//       </motion.div>

//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               variants={modalVariants}
//               className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4"
//             >
//               <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
//               <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
//               <div className="flex justify-end gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleLogout}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg"
//                 >
//                   Logout
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default Admin;

import { useState } from 'react';
import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiBox, FiUsers, FiDollarSign, FiShoppingBag, FiLogOut } from 'react-icons/fi';

const sidebarVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } }
};

const modalVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 150 } },
  exit: { y: 50, opacity: 0 }
};

function Admin() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [showModal, setShowModal] = useState(false);

  // Redirect to login if not an admin
  if (role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { path: 'dashboard', name: 'Dashboard', icon: <FiDollarSign /> },
    { path: 'products', name: 'Products', icon: <FiBox /> },
    { path: 'users', name: 'Users', icon: <FiUsers /> },
    { path: 'orders', name: 'Orders', icon: <FiShoppingBag /> }
  ];

  const handleLogout = () => {
    // Clear all relevant localStorage items
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl p-5 sticky top-0 h-screen flex flex-col"
      >
        <h2 className="text-2xl font-bold text-white mb-8 ml-2">Admin Panel</h2>
        <ul className="flex-1 space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-300 group"
              >
                <span className="text-xl mr-3 group-hover:text-blue-400">{item.icon}</span>
                <span className="group-hover:text-white">{item.name}</span>
                <FiChevronRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="mt-auto flex items-center justify-center gap-2 p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <FiLogOut className="text-lg" />
          Logout
        </motion.button>
      </motion.div>

      <motion.div
        variants={contentVariants}
        className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <Outlet />
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              variants={modalVariants}
              className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4"
            >
              <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Admin;