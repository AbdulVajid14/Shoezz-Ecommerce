

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../axiosIntence';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight, FiLogIn } from 'react-icons/fi';

const initialValues = {
  username: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required!'),
  email: Yup.string().email('Invalid email format').required('Email is required!'),
  password: Yup.string().required('Password is required!').min(8, 'Must be at least 8 characters'),
});

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (values, { resetForm }) => {
    try {
      const res = await api.post('/users/register', { ...values, role: 'user' });
      toast.success(res.data.msg);
      resetForm();
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong. Try again!');
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
            alt="Register Illustration"
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
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Create Account</h1>
            <p className="text-center text-gray-500 mb-8">Join us to get started</p>
          </motion.div>

          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ errors, touched }) => (
              <Form className="space-y-6">
                <motion.div variants={itemVariants}>
                  <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${errors.username && touched.username ? 'border-red-400' : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500'}`}>
                    <FiUser className="text-gray-400 text-lg" />
                    <Field
                      type="text"
                      placeholder="Username"
                      name="username"
                      className="w-full focus:outline-none ml-3 bg-transparent"
                    />
                  </div>
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </motion.div>

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

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl flex items-center justify-center"
                    whileHover={hoverEffect}
                    whileTap={tapEffect}
                  >
                    <span className="flex items-center">
                      Register <FiArrowRight className="ml-2" />
                    </span>
                  </motion.button>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline flex items-center justify-center">
                      <FiLogIn className="mr-1" /> Login now
                    </Link>
                  </p>
                </motion.div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};

export default Register;