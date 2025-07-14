// import React from 'react'

// function Footer() {
//   return (
//    <>
//     <footer className="bg-gray-800 text-white py-12 mt-auto">
//       <div className="container mx-auto px-6">
//         <div className="flex flex-wrap justify-between items-center">
//           <div className="flex flex-col mb-6 sm:mb-0">
//             <h3 className="text-2xl font-bold text-yellow-500">Shoezz</h3>
//             <p className="mt-2 text-gray-400">
//               Step into style and comfort with our premium footwear collection.
//               Quality and design, all in one place.
//             </p>
//           </div>

//           <div className="flex flex-wrap space-x-12 mb-6 sm:mb-0">
//             <div>
//               <h4 className="font-semibold text-gray-300">Quick Links</h4>
//               <ul className="mt-4 space-y-2">
//                 <li>
//                   <a href="/" className="text-gray-400 hover:text-white">
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a href="" className="text-gray-400 hover:text-white">
//                     Shop
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#about" className="text-gray-400 hover:text-white">
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a href="tel:+918590362596" className="text-gray-400 hover:text-white">
//                     Contact
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold text-gray-300">Follow Us</h4>
//               <div className="mt-4 flex space-x-4">
//                 <a href="" className="text-gray-400 hover:text-white">
//                   <i className="fab fa-facebook-f"></i>
//                 </a>
//                 <a href="" className="text-gray-400 hover:text-white">
//                   <i className="fab fa-twitter"></i>
//                 </a>
//                 <a
//                   href="https://www.instagram.com/abdul__vajid_k/"
//                   target="blank"
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <i className="fab fa-instagram"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 border-t border-gray-600 pt-6">
//           <p className="text-center text-gray-400">
//             &copy; {new Date().getFullYear()} Shoezz. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//    </>
//   )
// }

// export default Footer

import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FiMail, FiPhone } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    scale: 1.05,
    transition: { duration: 0.2 }
  };

  const tapEffect = {
    scale: 0.95
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Brand Info */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="flex items-center mb-4"
              whileHover={{ x: 5 }}
            >
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl font-bold text-gray-900">S</span>
              </div>
              <h3 className="text-2xl font-bold text-yellow-400">Shoezz</h3>
            </motion.div>
            <p className="text-gray-400 mb-4">
              Step into style and comfort with our premium footwear collection. 
              Quality and design, all in one place.
            </p>
            <div className="flex space-x-4 mt-6">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP].map((Icon, index) => (
                <motion.a 
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:bg-yellow-500"
                  whileHover={hoverEffect}
                  whileTap={tapEffect}
                >
                  <Icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-yellow-500">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'Shop', 'New Arrivals', 'Best Sellers', 'Sale'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-yellow-500">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {['Contact Us', 'FAQs', 'Shipping Policy', 'Returns & Exchanges', 'Size Guide'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-yellow-500">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <HiOutlineLocationMarker className="text-yellow-500 text-xl mr-3 mt-1" />
                <span className="text-gray-400">123 Shoe Street, Fashion District, New York, NY 10001</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <FiPhone className="text-yellow-500 text-xl mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <FiMail className="text-yellow-500 text-xl mr-3" />
                <span className="text-gray-400">info@shoezz.com</span>
              </motion.li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="text-white mb-3">Subscribe to our newsletter</h5>
              <motion.div 
                className="flex"
                whileHover={{ scale: 1.02 }}
              >
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-l"
                />
                <motion.button 
                  className="bg-yellow-500 text-gray-900 px-4 py-2 font-medium rounded-r hover:bg-yellow-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Shoezz. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-yellow-400 text-sm"
              whileHover={hoverEffect}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-yellow-400 text-sm"
              whileHover={hoverEffect}
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-yellow-400 text-sm"
              whileHover={hoverEffect}
            >
              Cookies Policy
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.a
        href="#"
        className="fixed bottom-6 right-6 w-12 h-12 bg-yellow-500 rounded-full shadow-lg flex items-center justify-center text-gray-900 hover:bg-yellow-600 transition-colors"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.a>
    </footer>
  );
}

export default Footer;