
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import api from '../axiosIntence'


// const Home = () => {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await api.get('/products');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);
 


//   return (
//     <>
//       <div className="relative mt-20 h-[600px] bg-[url('https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
//   <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
//   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-6">
//     <h2 className="text-4xl font-bold">Step Into Comfort & Style</h2>
//     <p className="mt-4 text-xl">Discover our latest collection of shoes designed for both comfort and fashion. Perfect for every occasion.</p>
//     <button className="mt-6 px-8 py-2 bg-yellow-500 text-black font-semibold text-lg rounded-full hover:bg-yellow-400 transition-all duration-300">
//       Shop Now
//     </button>
//   </div>
// </div>
// <div className="flex justify-center my-12 space-x-10 sm:space-x-8 md:space-x-20 flex-wrap">
//   <img src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Nike.png" 
//        alt="Logo 1" className="h-20" />
//   <img src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Adidas.png" 
//        alt="Logo 2" className="h-20" />
//   <img src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Puma.png" 
//        alt="Logo 3" className="h-20" />
//   <img src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Jordan.png" 
//        alt="Logo 4" className="h-20" />
//   <img src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Reebok.png" 
//        alt="Logo 5" className="h-20" />
// </div>


// <div className="my-20 px-6 py-12 bg-gray-100 flex items-center justify-between rounded-lg shadow-lg" id="about" >
//   <div className="flex-1 pr-8">
//     <h2 className="text-3xl font-bold text-gray-800">About Shoezz</h2>
//     <p className="mt-4 text-lg text-gray-600">
//       Shoezz is a brand dedicated to offering high-quality, stylish, and comfortable shoes for every occasion. Our mission is to deliver footwear that combines innovative designs, superior comfort, and lasting durability. Whether you're looking for athletic shoes, formal wear, or casual sneakers, Shoezz has something for everyone.
//     </p>
//     <button className="mt-6 px-8 py-2 bg-blue-500 text-white font-semibold text-lg rounded-full hover:bg-blue-400 transition-all duration-300">
//       Explore Our Collection
//     </button>
//   </div>
//   <div className="flex-1">
//     <img
//       src="https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_640.jpg"
//       alt="Shoe Collection"
//       className="w-full h-auto rounded-lg shadow-lg object-cover"
//     />
//   </div>
// </div>
// <div className="container mx-auto p-4">
//   <h2 className="text-left text-3xl font-semibold mb-6">Top Selling Shoes</h2>

//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//     {products.map((product) => (
//       <Link
//         to={`/productdetails/${product._id}`} 
//         key={product._id}
//         className="product-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
//       >
       
//         <img
//           src={product.images.url}
//           alt={product.name}
//           className="w-full h-[300px] object-cover rounded-t-lg"
//         />
//         <div className="mt-4">
//           <h3 className="text-xl font-semibold">{product.name}</h3>
//           <p className="text-gray-600">Price: ${product.price}</p>
//           <p className="text-gray-600">Stock: {product.stock}</p>
//           <p className="text-gray-600">Category: {product.categories}</p>
//         </div>
//       </Link>
//     ))}
//   </div>
// </div>
//     </>
//   );
// };

// export default Home;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import api from '../axiosIntence';
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant, slideIn } from "../utils/motion";

const Home = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
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
        className="relative mt-20 h-[600px] bg-[url('https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
        <motion.div 
          variants={textVariant(1.2)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-6"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Step Into Comfort & Style</h2>
          <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto">
            Discover our latest collection of shoes designed for both comfort and fashion. Perfect for every occasion.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-10 py-3 bg-yellow-500 text-black font-semibold text-lg rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Brands Section */}
      <motion.div
        variants={fadeIn('up', 'tween', 0.4, 1)}
        className="py-16 bg-gradient-to-r from-gray-50 to-gray-100"
      >
        <div className="container mx-auto px-6">
          <motion.h3 
            variants={textVariant(0.5)}
            className="text-2xl font-bold text-center mb-12 text-gray-800"
          >
            Trusted by the Best Brands
          </motion.h3>
          <div className="flex justify-center items-center flex-wrap gap-12 md:gap-20">
            {[
              "https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Nike.png",
              "https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Adidas.png",
              "https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Puma.png",
              "https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Jordan.png",
              "https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Reebok.png"
            ].map((logo, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                src={logo}
                alt={`Brand ${index + 1}`}
                className="h-12 md:h-16 grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.section
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="my-20 px-6 py-12 bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-xl mx-4 md:mx-12"
        id="about"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <motion.h2 
              variants={textVariant(0.5)}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            >
              About <span className="text-blue-600">Shoezz</span>
            </motion.h2>
            <motion.p 
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Shoezz is a brand dedicated to offering high-quality, stylish, and comfortable shoes for every occasion. Our mission is to deliver footwear that combines innovative designs, superior comfort, and lasting durability. Whether you're looking for athletic shoes, formal wear, or casual sneakers, Shoezz has something for everyone.
            </motion.p>
            <motion.div variants={fadeIn('up', 'tween', 0.4, 1)}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-lg"
              >
                Explore Our Collection
              </motion.button>
            </motion.div>
          </div>
          <motion.div 
            variants={slideIn('right', 'tween', 0.3, 1)}
            className="flex-1 relative"
          >
            <img
              src="https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_640.jpg"
              alt="Shoe Collection"
              className="w-full h-auto rounded-2xl shadow-xl object-cover transform hover:scale-105 transition-all duration-500"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        variants={staggerContainer}
        className="container mx-auto p-8 md:p-12"
      >
        <motion.div variants={textVariant(0.5)}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Top Selling Shoes</h2>
          <div className="w-20 h-1 bg-blue-500 mb-8"></div>
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
                    <span className="text-lg font-semibold text-blue-600">₹{product.price}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      product.category === 'men' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-pink-100 text-pink-800'
                    }`}>
                      {product.category === 'men' ? 'Men' : 'Women'}
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
        className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
      >
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Pair?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of satisfied customers who have already experienced the comfort and style of Shoezz.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-white text-blue-600 font-bold text-lg rounded-full shadow-lg transition-all duration-300"
          >
            Browse All Shoes
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;