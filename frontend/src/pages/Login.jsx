




// // // import React, { useState } from 'react';
// // // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // // import * as Yup from 'yup';
// // // import axios from 'axios';
// // // import { toast, ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { useDispatch } from 'react-redux';
// // // import { setUser } from '../slice/userSlice';
// // // import api from '../axiosIntence'

// // // const initialValues = {
// // //   email: '',
// // //   password: '',
// // // };

// // // const validationSchema = Yup.object({
// // //   email: Yup.string().email('Invalid email format').required('Email is required!'),
// // //   password: Yup.string().required('Password is required!').min(8, 'Must be at least 8 characters'),
// // // });



// // // function Login() {
// // //   const navigate = useNavigate();
// // //   const dispatch = useDispatch();
// // //   const [isLoading, setIsLoading] = useState(false);

// // // const onSubmit = async (values) => {
// // //   setIsLoading(true);
// // //   try {
// // //     const { email, password } = values;
// // //     try {
// // //       const userLoginResponse = await api.post('/users/login', { email, password }); 

// // //       const { accessToken, refreshToken, msg, isBlocked } = userLoginResponse.data;

// // //       if (isBlocked) {
// // //         toast.error("Your account has been blocked. Please contact support.");
// // //         return;
// // //       }
// // //       localStorage.setItem("accessToken", accessToken);
// // //       localStorage.setItem("refreshToken", refreshToken);
// // //       const userResponse = await api.get('/users/me'); 
// // //       localStorage.setItem("user", JSON.stringify(userResponse.data));
// // //       dispatch(setUser(userResponse.data));
// // //       toast.success("user logged success full");
// // //       navigate('/');
// // //       return;
// // //     } catch (userError) {
// // //       console.log('User login failed, trying admin login...');
// // //     }

// // //     const adminLoginResponse = await api.post('/admin/login', { email, password }); 

// // //     if (adminLoginResponse.data?.accessToken) {
// // //       const { accessToken, refreshToken } = adminLoginResponse.data;

// // //       toast.success("Admin logged in successfully");
// // //       localStorage.setItem("isAdmin", true);
// // //       localStorage.setItem("accessToken", accessToken);
// // //       localStorage.setItem("refreshToken", refreshToken);

// // //       setTimeout(() => {
// // //         navigate("/admin/dashboard");
// // //       }, 1000);
// // //       return;
// // //     }

// // //     toast.error("Invalid email or password");
// // //   } catch (error) {
// // //     console.error('Login error:', error);
// // //     toast.error(error.response?.data?.message || "Invalid email or password");
// // //   } finally {
// // //     setIsLoading(false);
// // //   }
// // // };

// // //   return (
// // //     <div className="flex items-center justify-center min-h-screen bg-white">
// // //       <div className="flex w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden">
// // //         <div className="w-1/2 hidden md:block">
// // //           <img
// // //             src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// // //             alt="Login Illustration"
// // //             className="w-full h-full object-cover"
// // //           />
// // //         </div>
// // //         <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
// // //           <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">LOGIN</h3>
// // //           <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
// // //             <Form>
// // //               <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
// // //                 <Field type="email" placeholder="Email" name="email" className="w-full focus:outline-none ml-2" />
// // //               </div>
// // //               <ErrorMessage name="email" component="div" className="text-red-600 text-sm mb-4" />
// // //               <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
// // //                 <Field type="password" placeholder="Password" name="password" className="w-full focus:outline-none ml-2" />
// // //               </div>
// // //               <ErrorMessage name="password" component="div" className="text-red-600 text-sm mb-4" />
// // //               <button
// // //                 type="submit"
// // //                 className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg"
// // //                 disabled={isLoading}
// // //               >
// // //                 {isLoading ? <span>Loading...</span> : 'Login'}
// // //               </button>
// // //               <p className="mt-4 text-center text-sm text-gray-700">
// // //                 Don't have an account?{' '}
// // //                 <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
// // //               </p>
// // //             </Form>
// // //           </Formik>
// // //           <ToastContainer />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Login;

// // import React, { useState } from "react";
// // import { Formik, Form, Field, ErrorMessage } from "formik";
// // import * as Yup from "yup";
// // import { motion } from "framer-motion";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { setUser } from "../slice/userSlice";
// // import api from "../axiosIntence";

// // const initialValues = {
// //   email: "",
// //   password: "",
// // };

// // const validationSchema = Yup.object({
// //   email: Yup.string().email("Invalid email format").required("Email is required!"),
// //   password: Yup.string().required("Password is required!").min(8, "Must be at least 8 characters"),
// // });

// // function Login() {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const [isLoading, setIsLoading] = useState(false);

// //   const onSubmit = async (values) => {
// //     setIsLoading(true);
// //     try {
// //       const { email, password } = values;
// //       const userLoginResponse = await api.post("/users/login", { email, password });
// //       const { accessToken, refreshToken, msg, isBlocked } = userLoginResponse.data;
// //       if (isBlocked) {
// //         toast.error("Your account has been blocked. Please contact support.");
// //         return;
// //       }
// //       localStorage.setItem("accessToken", accessToken);
// //       localStorage.setItem("refreshToken", refreshToken);
// //       const userResponse = await api.get("/users/me");
// //       localStorage.setItem("user", JSON.stringify(userResponse.data));
// //       dispatch(setUser(userResponse.data));
// //       toast.success("User logged in successfully");
// //       navigate("/");
// //     } catch (error) {
// //       console.error("Login error:", error);
// //       toast.error(error.response?.data?.message || "Invalid email or password");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-900 relative overflow-hidden">
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.5 }}
// //         className="relative bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden p-10 w-96 border border-gray-500"
// //       >
// //         <h3 className="text-2xl font-bold text-center mb-6 text-white">LOGIN</h3>
// //         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
// //           <Form className="flex flex-col space-y-4">
// //             <motion.div
// //               whileFocus={{ scale: 1.05 }}
// //               className="relative border border-gray-300 bg-gray-800 rounded-lg px-3 py-2"
// //             >
// //               <Field type="email" name="email" placeholder="Email" className="w-full bg-transparent focus:outline-none text-white" />
// //             </motion.div>
// //             <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            
// //             <motion.div
// //               whileFocus={{ scale: 1.05 }}
// //               className="relative border border-gray-300 bg-gray-800 rounded-lg px-3 py-2"
// //             >
// //               <Field type="password" name="password" placeholder="Password" className="w-full bg-transparent focus:outline-none text-white" />
// //             </motion.div>
// //             <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               type="submit"
// //               className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg shadow-lg font-semibold"
// //               disabled={isLoading}
// //             >
// //               {isLoading ? "Loading..." : "Login"}
// //             </motion.button>
// //           </Form>
// //         </Formik>
// //         <p className="mt-4 text-center text-sm text-white">
// //           Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
// //         </p>
// //         <ToastContainer />
// //       </motion.div>
// //     </div>
// //   );
// // }

// // export default Login;

// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../slice/userSlice';
// import api from '../axiosIntence';
// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiArrowRight, FiUserPlus } from 'react-icons/fi';

// const initialValues = {
//   email: '',
//   password: '',
// };

// const validationSchema = Yup.object({
//   email: Yup.string().email('Invalid email format').required('Email is required!'),
//   password: Yup.string().required('Password is required!').min(8, 'Must be at least 8 characters'),
// });

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (values) => {
//     setIsLoading(true);
//     try {
//       const { email, password } = values;
//       try {
//         const userLoginResponse = await api.post('/users/login', { email, password }); 
//         const { accessToken, refreshToken, msg, isBlocked } = userLoginResponse.data;

//         if (isBlocked) {
//           toast.error("Your account has been blocked. Please contact support.");
//           return;
//         }
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//         const userResponse = await api.get('/users/me'); 
//         localStorage.setItem("user", JSON.stringify(userResponse.data));
//         dispatch(setUser(userResponse.data));
//         toast.success("Login successful!");
//         navigate('/');
//         return;
//       } catch (userError) {
//         console.log('User login failed, trying admin login...');
//       }

//       const adminLoginResponse = await api.post('/admin/login', { email, password }); 
//       if (adminLoginResponse.data?.accessToken) {
//         const { accessToken, refreshToken } = adminLoginResponse.data;
//         toast.success("Admin login successful!");
//         localStorage.setItem("isAdmin", true);
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//         setTimeout(() => {
//           navigate("/admin/dashboard");
//         }, 1000);
//         return;
//       }
//       toast.error("Invalid email or password");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Invalid email or password");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         when: "beforeChildren"
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const hoverEffect = {
//     scale: 1.02,
//     transition: { duration: 0.3 }
//   };

//   const tapEffect = {
//     scale: 0.98
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
//     >
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="flex w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white"
//         whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
//       >
//         {/* Left Side - Image */}
//         <motion.div
//           className="hidden md:block w-1/2 relative overflow-hidden"
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <img
//             src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt="Login Illustration"
//             className="w-full h-full object-cover"
//           />
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-purple-600/20"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           />
//         </motion.div>

//         {/* Right Side - Form */}
//         <motion.div
//           className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
//           variants={containerVariants}
//         >
//           <motion.div variants={itemVariants}>
//             <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back</h1>
//             <p className="text-center text-gray-500 mb-8">Sign in to access your account</p>
//           </motion.div>

//           <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
//             {({ errors, touched }) => (
//               <Form className="space-y-6">
//                 <motion.div variants={itemVariants}>
//                   <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${errors.email && touched.email ? 'border-red-400' : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500'}`}>
//                     <FiMail className="text-gray-400 text-lg" />
//                     <Field
//                       type="email"
//                       placeholder="Email Address"
//                       name="email"
//                       className="w-full focus:outline-none ml-3 bg-transparent"
//                     />
//                   </div>
//                   <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${errors.password && touched.password ? 'border-red-400' : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500'}`}>
//                     <FiLock className="text-gray-400 text-lg" />
//                     <Field
//                       type="password"
//                       placeholder="Password"
//                       name="password"
//                       className="w-full focus:outline-none ml-3 bg-transparent"
//                     />
//                   </div>
//                   <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
//                 </motion.div>

//                 <motion.div variants={itemVariants} className="flex justify-end">
//                   <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <motion.button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl flex items-center justify-center"
//                     disabled={isLoading}
//                     whileHover={hoverEffect}
//                     whileTap={tapEffect}
//                   >
//                     {isLoading ? (
//                       <span className="flex items-center">
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Processing...
//                       </span>
//                     ) : (
//                       <span className="flex items-center">
//                         Login <FiArrowRight className="ml-2" />
//                       </span>
//                     )}
//                   </motion.button>
//                 </motion.div>

//                 <motion.div variants={itemVariants} className="mt-6 text-center">
//                   <p className="text-gray-600">
//                     Don't have an account?{' '}
//                     <Link to="/register" className="text-blue-600 font-medium hover:underline flex items-center justify-center">
//                       <FiUserPlus className="mr-1" /> Register now
//                     </Link>
//                   </p>
//                 </motion.div>
//               </Form>
//             )}
//           </Formik>
//         </motion.div>
//       </motion.div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </motion.div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../slice/userSlice';
import api from '../axiosIntence';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiUserPlus, FiX, FiCheck, FiAlertTriangle } from 'react-icons/fi';

const Notification = ({ message, type, onClose }) => {
  const bgColor = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  };

  const icon = {
    success: <FiCheck className="text-green-500" />,
    error: <FiAlertTriangle className="text-red-500" />,
    info: <FiAlertTriangle className="text-blue-500" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-4 right-4 border-l-4 ${bgColor[type]} px-4 py-3 rounded shadow-lg max-w-sm z-50 flex items-start`}
      role="alert"
    >
      <div className="py-1 mr-3">
        {icon[type]}
      </div>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
      <button onClick={onClose} className="ml-4 text-lg">
        <FiX />
      </button>
    </motion.div>
  );
};

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required!'),
  password: Yup.string().required('Password is required!').min(8, 'Must be at least 8 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { email, password } = values;
      try {
        const userLoginResponse = await api.post('/users/login', { email, password }); 
        const { accessToken, refreshToken, msg, isBlocked } = userLoginResponse.data;

        if (isBlocked) {
          showNotification("Your account has been blocked. Please contact support.", "error");
          return;
        }
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        const userResponse = await api.get('/users/me'); 
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        dispatch(setUser(userResponse.data));
        showNotification("Login successful!", "success");
        navigate('/');
        return;
      } catch (userError) {
        console.log('User login failed, trying admin login...');
      }

      const adminLoginResponse = await api.post('/admin/login', { email, password }); 
      if (adminLoginResponse.data?.accessToken) {
        const { accessToken, refreshToken } = adminLoginResponse.data;
        showNotification("Admin login successful!", "success");
        localStorage.setItem("isAdmin", true);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
        return;
      }
      showNotification("Invalid email or password", "error");
    } catch (error) {
      showNotification(error.response?.data?.message || "Invalid email or password", "error");
    } finally {
      setIsLoading(false);
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const hoverEffect = {
    scale: 1.02,
    transition: { duration: 0.3 }
  };

  const tapEffect = {
    scale: 0.98
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <AnimatePresence>
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type} 
            onClose={closeNotification}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white"
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      >
        {/* Left Side - Image */}
        <motion.div
          className="hidden md:block w-1/2 relative overflow-hidden"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-purple-600/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back</h1>
            <p className="text-center text-gray-500 mb-8">Sign in to access your account</p>
          </motion.div>

          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ errors, touched }) => (
              <Form className="space-y-6">
                <motion.div variants={itemVariants}>
                  <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${errors.email && touched.email ? 'border-red-400' : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500'}`}>
                    <FiMail className="text-gray-400 text-lg" />
                    <Field
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      className="w-full focus:outline-none ml-3 bg-transparent"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${errors.password && touched.password ? 'border-red-400' : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500'}`}>
                    <FiLock className="text-gray-400 text-lg" />
                    <Field
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="w-full focus:outline-none ml-3 bg-transparent"
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl flex items-center justify-center"
                    disabled={isLoading}
                    whileHover={hoverEffect}
                    whileTap={tapEffect}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Login <FiArrowRight className="ml-2" />
                      </span>
                    )}
                  </motion.button>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 font-medium hover:underline flex items-center justify-center">
                      <FiUserPlus className="mr-1" /> Register now
                    </Link>
                  </p>
                </motion.div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;