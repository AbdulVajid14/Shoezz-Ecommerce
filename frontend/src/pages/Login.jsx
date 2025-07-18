
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
      const response = await api.post('/users/login', values);
      const { accessToken, refreshToken, msg, role } = response.data;

      console.log('Login response:', response.data); // Debug: Log response data

      if (response.data.isBlocked) {
        showNotification("Your account has been blocked. Please contact support.", "error");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);

      const userResponse = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      localStorage.setItem("user", JSON.stringify(userResponse.data));
      dispatch(setUser(userResponse.data));

      console.log('User role:', role); // Debug: Log role before navigation

      showNotification(msg, "success");

      // Navigate immediately based on role
      if (role === 'admin') {
        console.log('Navigating to /admin/dashboard'); // Debug: Confirm navigation
        navigate('/admin/dashboard');
      } else {
        console.log('Navigating to /'); // Debug: Confirm navigation
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message); // Debug: Log error
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