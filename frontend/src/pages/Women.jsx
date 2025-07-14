// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import api from '../axiosIntence'

// function Women() {
//   const [products, setProducts] = useState([]);

  
//   useEffect(() => {
//       const fetchProducts = async () => {
//         try {
//           const response = await api.get('/products/categories/women');
//           setProducts(response.data);
//         } catch (error) {
//           console.error('Error fetching products:', error);
//         }
//       };
  
//       fetchProducts();
//     }, []);

//   return (
//     <>
//       <div className="container mx-auto p-4">
//         <h2 className="text-left text-3xl font-semibold mb-6">#Womens</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <Link
//               to={`/productdetails/${product._id}`}
//               key={product._id}
//               className="product-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
//             >
//               <img
//                 src={product.images.url}
//                 alt={product.name}
//                 className="w-full h-[300px] object-cover rounded-t-lg"
//               />
//               <div className="mt-4">
//                 <h3 className="text-xl font-semibold">{product.name}</h3>
//                 <p className="text-gray-600">Price: ${product.price}</p>
//                 <p className="text-gray-600">Stock: {product.stock}</p>
//                 <p className="text-gray-600">Category: {product.categories}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Women;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from '../axiosIntence';
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant, slideIn } from "../utils/motion";

function Women() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/categories/women');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="overflow-hidden"
    >
      {/* Hero Section */}
      <motion.div 
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="relative mt-20 h-[400px] bg-[url('https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
        <motion.div 
          variants={textVariant(1.2)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Women's Collection</h2>
          <p className="mt-4 text-xl md:text-xl max-w-2xl mx-auto">
            Elegant footwear combining fashion-forward designs with ultimate comfort
          </p>
        </motion.div>
      </motion.div>

      {/* Products Section */}
      <motion.section
        variants={staggerContainer}
        className="container mx-auto p-8 md:p-12"
      >
        <motion.div variants={textVariant(0.5)}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">#Womens</h2>
          <div className="w-20 h-1 bg-pink-500 mb-8"></div>
        </motion.div>

        <motion.div 
          variants={fadeIn('up', 'tween', 0.3, 1)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link
                to={`/productdetails/${product._id}`}
                className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={product.images.url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium">View Details</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-pink-600">₹{product.price}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">
                      Women
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="py-20 bg-gradient-to-r from-pink-600 to-purple-700 text-white"
      >
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Discover Your Perfect Style</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Let us help you find footwear that matches your unique personality and lifestyle.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-white text-pink-600 font-bold text-lg rounded-full shadow-lg transition-all duration-300"
          >
            Get Styled
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default Women;