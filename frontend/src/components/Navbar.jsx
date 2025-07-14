
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { CiShoppingCart } from "react-icons/ci";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../slice/userSlice";
// import { FaUser } from "react-icons/fa"; 
// import { AiOutlineLogout } from "react-icons/ai"; 
// import backgroundImage from "../assets/Untitled design.png"; 
// import axios from "axios";
// import api from '../axiosIntence'

// function Navbar() {
//   const { cart, user } = useSelector((state) => state.user);
//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false); 
//   const dispatch = useDispatch();

  
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await api.get('/products');
//         setProducts(response.data); 
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
  
//     fetchProducts();
//   }, []);

//   const searchProduct = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//     const searched = products.filter((item) =>
//       item.name.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredProducts(searched);
//   };

//   const handleProductClick = (productId) => {
//     setSearch("");
//     setFilteredProducts([]);
//   };

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const handleLogout = () => {
//     dispatch(logoutUser()); 
//     setIsModalOpen(false); 
//   };

//   const handleCancelLogout = () => {
//     setIsModalOpen(false); 
//   };

//   const confirmLogout = () => {
//     setIsModalOpen(true); 
//   };

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const handleDropdownToggle = () => {
//     setIsDropdownOpen((prev) => !prev);
//   }

//   return (
//     <div className="sticky top-0 bg-white shadow-lg z-50">
// <nav 
//   className="p-4 shadow-lg relative"
//   style={{
//     backgroundImage: `linear-gradient(to right, rgba(115, 113, 156, 0.23), rgba(140, 127, 169, 0.3), rgba(25, 4, 15, 0.44)), url(${backgroundImage})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundBlendMode: "multiply"
//   }}
// >        <div className="container mx-auto flex justify-between items-center">
//           <div className="text-4xl font-extrabold tracking-wider text-white">
//             <Link to="/">
//               <span className="italic text-yellow-300">Shoe</span>
//               <span className="text-white transform scale-110">ZZ</span>
//             </Link>
//           </div>

//           <div className="hidden md:flex space-x-8">
//             <Link
//               to="/"
//               className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               Home
//             </Link>
//             <Link
//               to="/men"
//               className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               Men
//             </Link>
//             <Link
//               to="/women"
//               className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               Women
//             </Link>
//             <Link
//               to="/orders"
//               className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               My Orders
//             </Link>
//           </div>

//    <div className="relative hidden md:flex items-center border-2 rounded-full p-2 w-96 bg-white shadow-lg">
//   <input
//     type="text"
//     className="w-full border-none focus:outline-none px-4 py-2 text-gray-800 rounded-full"
//     placeholder="Search for shoes..."
//     value={search}
//     onChange={searchProduct}
//   />
  
//   {search && (
//   <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-[75vh] overflow-y-auto">
//     {filteredProducts.length > 0 ? (
//       filteredProducts.map((product) => (
//         <Link
//           to={`/productdetails/${product._id}`}
//           key={product._id}
//           className="flex items-center justify-between p-2 hover:bg-gray-100 transition duration-200"
//           onClick={() => handleProductClick(product._id)}
//         >
//           <span className="text-gray-700">{product.name}</span>
//           <img
//             src={product.images.url}
//             alt={product.name}
//             className="w-12 h-12 object-cover rounded-md ml-2"
//           />
//         </Link>
//       ))
//     ):(
//       <div className="p-2 text-gray-500">No products found</div>
//     )}
//   </div>
// )}
// </div>
//           <div className="hidden md:flex items-center space-x-6">
//             <Link to="/cart" className="relative text-white">
//               <CiShoppingCart size={30} />
//               {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
//                 {cart.length}
//               </span> */}
//             </Link>
//             {user ? (
//               <>
//                <span className="text-xl text-white font-bold">Welcome, {user.username}</span>
//     <button
//       className="relative flex items-center justify-center bg-red-400 text-white p-2 rounded-full transition duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 h-[50px] w-[50px] sm:h-[50px] sm:w-[50px]"
//       onClick={confirmLogout}
//       title="Logout" 
//     >
//       <span className="flex items-center justify-center bg-white text-red-500 rounded-full p-2">
//         <AiOutlineLogout className="text-xl" />
//       </span>
//     </button>
//               </>
//             ) : (
//               <>
//               <div className="relative">
//       <button
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
//         className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//       >
//         <FaUser className="text-xl text-gray-700" /> 
//       </button>
//       {isDropdownOpen && (
//         <div className="absolute right-0 mt-2 w-48 sm:w-60 md:w-72 lg:w-40 bg-white shadow-lg rounded-lg">
//           <ul className="py-2">
//             <li>
//               <Link
//                 to="/login"
//                 className="block px-4 py-2 text-lg text-blue-500 hover:bg-gray-100 rounded"
//                 onClick={() => setIsDropdownOpen(false)}
//               >
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/register"
//                 className="block px-4 py-2 text-lg text-green-500 hover:bg-gray-100 rounded"
//                 onClick={() => setIsDropdownOpen(false)}
//               >
//                 Register
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//               </>
//             )}
//           </div>

//           <button
//             className="md:hidden text-white"
//             onClick={toggleMenu}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </nav>
//       {isMenuOpen && (
//         <div className="md:hidden flex flex-col space-y-4 bg-teal-500 p-4">
//           <Link
//             to="/"
//             className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
//           >
//             Home
//           </Link>
//           <Link
//             to="/men"
//             className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
//           >
//             Men
//           </Link>
//           <Link
//             to="/women"
//             className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
//           >
//             Women
//           </Link>
//           <Link
//             to="/orders"
//             className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
//           >
//             My Orders
//           </Link>
//           <div className="relative text-white">
//             <Link to="/cart" className="relative text-white">
//               <CiShoppingCart size={30} />
//               <span className="absolute top-0 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
//                 {cart.length}
//               </span>
//             </Link>
//           </div>
//           <div className="relative w-full">
//           <div className="flex items-center border-2 rounded-full p-2 w-full">
//             <input
//               type="text"
//               className="w-full border-none focus:outline-none px-4 py-2 rounded-full"
//               placeholder="Search for shoes..."
//               value={search}
//               onChange={searchProduct}
//             />
//           </div>

//           {search && (
//             <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <Link
//                     to={`/productdetails/${product.id}`}
//                     key={product.id}
//                     className="block p-2 hover:bg-gray-100 transition duration-200"
//                     onClick={() => handleProductClick(product.id)} 
//                   >
//                     {product.name}
//                   </Link>
//                 ))
//               ) : (
//                 <div className="p-2 text-gray-500">No products found</div>
//               )}
//             </div>
//           )}
//           </div>

//           {!user ? (
//             <div className="relative">
//             {/* Button for toggling the dropdown */}
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="flex items-center justify-center p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
//             >
//               <FaUser className="text-xl text-gray-700" />
//             </button>
      
//             {/* Dropdown menu */}
//             {isDropdownOpen && (
//               <div className="absolute left-0 mt-2 w-48 sm:w-60 md:w-72 lg:w-80 bg-white shadow-lg rounded-lg z-10">
//                 <ul className="py-2">
//                   <li>
//                     <Link
//                       to="/login"
//                       className="block px-4 py-2 text-lg text-blue-500 hover:bg-gray-100 rounded"
//                       onClick={() => setIsDropdownOpen(false)}
//                     >
//                       Login
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/register"
//                       className="block px-4 py-2 text-lg text-green-500 hover:bg-gray-100 rounded"
//                       onClick={() => setIsDropdownOpen(false)}
//                     >
//                       Register
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//           ) : (
//             <div className="flex flex-col space-y-2">
//                 <span className="text-xl text-white font-bold">Welcome, {user.username}</span>
                
//               <button
//       className="relative flex items-center justify-center bg-red-400 text-white p-2 rounded-full transition duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 h-[50px] w-[50px] sm:h-[50px] sm:w-[50px]"
//       onClick={confirmLogout}
//       title="Logout" 
//     >
//       <span className="flex items-center justify-center bg-white text-red-500 rounded-full p-2">
//         <AiOutlineLogout className="text-xl" />
//       </span>
//     </button>
//             </div>
//           )}
//         </div>
//       )}

//       {isModalOpen && (
//         <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg w-96">
//             <h3 className="text-lg font-bold">Are you sure you want to logout?</h3>
//             <div className="mt-4 flex justify-between">
//               <button
//                 className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
//                 onClick={handleLogout}
//               >
//                 Yes, Logout
//               </button>
//               <button
//                 className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
//                 onClick={handleCancelLogout}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slice/userSlice";
import { FaUser, FaSearch } from "react-icons/fa"; 
import { AiOutlineLogout } from "react-icons/ai"; 
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import api from '../axiosIntence'

function Navbar() {
  // const { cart, user } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user); 
const cart = useSelector((state) => state.cart?.items) || [];  // ✅ Ensure cart is always an array

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);

  const searchProduct = (e) => {
    const value = e.target.value;
    setSearch(value);
    const searched = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(searched);
  };

  const handleProductClick = (productId) => {
    setSearch("");
    setFilteredProducts([]);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    dispatch(logoutUser()); 
    setIsModalOpen(false); 
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); 
  };

  const confirmLogout = () => {
    setIsModalOpen(true); 
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  }

  // Animation variants
  const navItemVariants = {
    hover: {
      scale: 1.05,
      color: "#3b82f6",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const searchVariants = {
    focused: {
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
      borderColor: "#3b82f6"
    }
  };

  return (
    <div className="sticky top-0 bg-white shadow-md z-50">
      <nav className="p-4 relative bg-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo with animation */}
          <motion.div 
            className="text-4xl font-extrabold tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center">
              <span className="italic text-blue-600">Shoe</span>
              <span className="text-gray-900 transform scale-110">ZZ</span>
              <motion.span 
                className="ml-1 text-xs bg-blue-600 text-white px-2 py-1 rounded-full"
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2 
                }}
              >
                NEW
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
              <Link to="/" className="text-gray-700 font-medium">
                Home
              </Link>
            </motion.div>
            
            <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
              <Link to="/men" className="text-gray-700 font-medium">
                Men
              </Link>
            </motion.div>
            
            <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
              <Link to="/women" className="text-gray-700 font-medium">
                Women
              </Link>
            </motion.div>
            
            <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
              <Link to="/orders" className="text-gray-700 font-medium">
                My Orders
              </Link>
            </motion.div>
          </div>

          {/* Search Bar with animation */}
          <motion.div 
            className="relative hidden md:flex items-center"
            initial={false}
            animate={isSearchFocused ? "focused" : ""}
            variants={searchVariants}
          >
            <div className="flex items-center border-2 border-gray-200 rounded-full px-4 py-2 bg-gray-50 transition-all duration-300 w-64">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                className="w-full bg-transparent focus:outline-none text-gray-700"
                placeholder="Search for shoes..."
                value={search}
                onChange={searchProduct}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
            
            <AnimatePresence>
              {search && (
                <motion.div 
                  className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-[75vh] overflow-y-auto"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Link
                        to={`/productdetails/${product._id}`}
                        key={product._id}
                        className="flex items-center justify-between p-3 hover:bg-blue-50 transition duration-200 border-b border-gray-100 last:border-b-0"
                        onClick={() => handleProductClick(product._id)}
                      >
                        <div>
                          <span className="text-gray-800 font-medium">{product.name}</span>
                          {/* <p className="text-sm text-gray-500">₹{product.price}</p> */}
                        </div>
                        <img
                          src={product.images.url}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md ml-2"
                        />
                      </Link>
                    ))
                  ):(
                    <div className="p-4 text-gray-500 text-center">No products found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Icons Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link to="/cart" className="text-gray-700 hover:text-blue-600">
                <CiShoppingCart size={26} />
                {cart.length > 0 && (
                  <motion.span 
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {cart.length}
                  </motion.span>
                )}
              </Link>
            </motion.div> */}
            <motion.div 
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="relative flex items-center justify-center"
>
  <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
    <CiShoppingCart size={26} />
    {cart.length > 0 && (
      <motion.span 
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        {cart.length}
      </motion.span>
    )}
  </Link>
</motion.div>

            
            {user ? (
              <>
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-gray-700 font-medium">Hi, {user.username}</span>
                  <motion.button
                    className="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 transition-colors duration-300"
                    onClick={confirmLogout}
                    title="Logout"
                    whileHover={{ scale: 1.1, backgroundColor: "#FEE2E2" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AiOutlineLogout className="text-xl" />
                  </motion.button>
                </motion.div>
              </>
            ) : (
              <div className="relative">
                <motion.button
                  onClick={handleDropdownToggle}
                  className="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-blue-500 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUser className="text-xl" />
                </motion.button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul>
                        <motion.li whileHover={{ backgroundColor: "#f0f9ff" }}>
                          <Link
                            to="/login"
                            className="block px-4 py-3 text-gray-700 hover:text-blue-600 font-medium"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <div className="flex items-center">
                              <span className="ml-2">Login</span>
                            </div>
                          </Link>
                        </motion.li>
                        <motion.li whileHover={{ backgroundColor: "#f0f9ff" }}>
                          <Link
                            to="/register"
                            className="block px-4 py-3 text-gray-700 hover:text-blue-600 font-medium"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <div className="flex items-center">
                              <span className="ml-2">Register</span>
                            </div>
                          </Link>
                        </motion.li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden text-gray-700 p-2 rounded-full hover:bg-gray-100"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 space-y-4">
              <motion.div 
                className="border-b border-gray-100 pb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/"
                  className="block py-2 text-gray-700 font-medium hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </motion.div>
              
              <motion.div 
                className="border-b border-gray-100 pb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Link
                  to="/men"
                  className="block py-2 text-gray-700 font-medium hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Men
                </Link>
              </motion.div>
              
              <motion.div 
                className="border-b border-gray-100 pb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/women"
                  className="block py-2 text-gray-700 font-medium hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Women
                </Link>
              </motion.div>
              
              <motion.div 
                className="border-b border-gray-100 pb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  to="/orders"
                  className="block py-2 text-gray-700 font-medium hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  My Orders
                </Link>
              </motion.div>

              <motion.div 
                className="border-b border-gray-100 pb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center border-2 border-gray-200 rounded-full px-4 py-2 bg-gray-50">
                  <FaSearch className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                    placeholder="Search for shoes..."
                    value={search}
                    onChange={searchProduct}
                  />
                </div>

                {search && (
                  <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <Link
                          to={`/productdetails/${product._id}`}
                          key={product._id}
                          className="block p-3 hover:bg-blue-50 transition duration-200 border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            handleProductClick(product._id);
                            toggleMenu();
                          }}
                        >
                          <div className="flex items-center">
                            <img
                              src={product.images.url}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-md mr-3"
                            />
                            <div>
                              <span className="text-gray-800 font-medium">{product.name}</span>
                              <p className="text-xs text-gray-500">${product.price}</p>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-3 text-gray-500 text-center">No products found</div>
                    )}
                  </div>
                )}
              </motion.div>

              <motion.div 
                className="border-b border-gray-100 pb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link
                  to="/cart"
                  className="flex items-center py-2 text-gray-700 font-medium hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  <CiShoppingCart size={24} className="mr-2" />
                  Cart
                  {cart.length > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </motion.div>

              {user ? (
                <motion.div 
                  className="pt-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Welcome, {user.username}</span>
                    <motion.button
                      className="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500"
                      onClick={confirmLogout}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AiOutlineLogout className="text-xl" />
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="pt-4 space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/login"
                    className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-2xl w-96"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end space-x-3">
                <motion.button
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={handleCancelLogout}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
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

export default Navbar;