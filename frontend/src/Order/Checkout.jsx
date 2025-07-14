
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import { setCart } from '../slice/userSlice';
// import 'react-toastify/dist/ReactToastify.css';
// import api from '../axiosIntence'

// const CreditCardIcon = () => (
//   <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//   </svg>
// );


// const CashIcon = () => (
//   <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//   </svg>
// );

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, cart } = useSelector((state) => state.user);
//   const [address, setAddress] = useState({
//     fullName: '',
//     phone: '',
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//   });
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     paymentMethod: '',
//   });
//   const [isAddressSet, setIsAddressSet] = useState(false);
//   const [isEditingAddress, setIsEditingAddress] = useState(false);

//   useEffect(() => {
//     if (user) {
//       api
//         .get(`/admin/users/${user._id}`)
//         .then((response) => {
//           const userData = response.data;
//           if (userData.shippingAddress) {
//             setAddress(userData.shippingAddress);
//             setIsAddressSet(true);
//           }
//           if (userData.paymentDetails) {
//             setPaymentDetails(userData.paymentDetails);
//           }
//         })
//         .catch((error) => console.error('Error fetching user data:', error));
//     }
//   }, [user]);

//   const handleInputChange = (e, field, section) => {
//     const value = e.target.value;
//     if (section === 'address') {
//       setAddress((prev) => ({ ...prev, [field]: value }));
//     } else {
//       setPaymentDetails((prev) => ({ ...prev, [field]: value }));
//     }
//   };

//   const validateInputs = () => {
//     if (
//       !address.fullName ||
//       !address.phone ||
//       !address.street ||
//       !address.city ||
//       !address.state ||
//       !address.zipCode ||
//       !paymentDetails.paymentMethod
//     ) {
//       toast.error('Please fill in all required fields.');
//       return false;
//     }
//     return true;
//   };

//   const handleRazorpayPayment = async () => {
//     if (!validateInputs()) return;

//     const totalAmount = cart.reduce((total, item) => total + item.product?.price * item.quantity, 0);

//     try {
//       const response = await api.post('/razorpay/create-order', {
//         amount: totalAmount,
//         currency: 'INR',
//       });

//       const { id, currency, amount } = response.data;

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
//         amount: amount.toString(),
//         currency,
//         name: 'Shoezz store',
//         description: 'Payment for your order',
//         order_id: id,
//         handler: async (response) => {
//           try {
//             const verifyResponse = await api.post('/razorpay/verify-payment', {
//               order_id: id,
//               payment_id: response.razorpay_payment_id,
//               signature: response.razorpay_signature,
//             });

//             if (verifyResponse.data.success) {
//               toast.success('Payment successful!');
//               handleConfirmOrder();
//             } else {
//               toast.error('Payment verification failed.');
//             }
//           } catch (error) {
//             console.error('Error verifying payment:', error);
//             toast.error('Payment verification failed.');
//           }
//         },
//         prefill: {
//           name: address.fullName,
//           email: user.email,
//           contact: address.phone,
//         },
//         theme: {
//           color: '#3399cc',
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error('Error creating Razorpay order:', error);
//       toast.error('Failed to initiate payment.');
//     }
//   };

//   const handleConfirmOrder = async () => {
//     if (!cart || cart.length === 0) {
//       toast.error('Your cart is empty. Please add items to your cart.');
//       return;
//     }

//     const orderData = {
//       cartItems: cart.map((item) => ({
//         product: item.product._id,
//         quantity: item.quantity,
//         selectedSize: item.selectedSize,
//       })),
//       shippingAddress: address,
//       paymentDetails,
//     };

//     try {
//       const orderResponse = await api.post('/orders', orderData);

//       if (orderResponse.data.msg === 'product ordered') {
//         await api.patch(`/cart/cart/${user._id}`, { cart: [] });

//         dispatch(setCart([]));
//         toast.success('Order confirmed! Thank you for shopping.');
//         // navigate('/orders');
//         setTimeout(() => {
//           navigate('/orders');
//         }, 1000);
//       }
//     } catch (error) {
//       console.error('Error confirming order:', error);
//       toast.error('Failed to confirm the order. Please try again.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 lg:p-8">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h2>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="space-y-8">
//           {isAddressSet && !isEditingAddress && (
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-xl font-bold text-gray-800">Shipping Address</h3>
//                 <button
//                   className="text-blue-600 hover:text-blue-800 flex items-center"
//                   onClick={() => setIsEditingAddress(true)}
//                 >
//                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                   </svg>
//                   Edit
//                 </button>
//               </div>
//               <div className="space-y-2 text-gray-600">
//                 <p className="flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   {address.fullName}
//                 </p>
//                 <p className="flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                   {address.phone}
//                 </p>
//                 <p className="flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   {`${address.street},${address.city}, ${address.state} ${address.zipCode}`}
//                 </p>
//               </div>
//             </div>
//           )}

//           {(isEditingAddress || !isAddressSet) && (
//             <div className="bg-white p-6 rounded-xl shadow-lg">
//               <h3 className="text-xl font-bold mb-6 text-gray-800">Shipping Details</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                   <input
//                     type="text"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={address.fullName}
//                     onChange={(e) => handleInputChange(e, 'fullName', 'address')}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={address.phone}
//                     onChange={(e) => handleInputChange(e, 'phone', 'address')}
//                   />
//                 </div>
//                 <div className="space-y-2 md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700">Street Address</label>
//                   <input
//                     type="text"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={address.street}
//                     onChange={(e) => handleInputChange(e, 'street', 'address')}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">City</label>
//                   <input
//                     type="text"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={address.city}
//                     onChange={(e) => handleInputChange(e, 'city', 'address')}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">State</label>
//                   <input
//                     type="text"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={address.state}
//                     onChange={(e) => handleInputChange(e, 'state', 'address')}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">PIN Code</label>
//                   <input
//                     type="text"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={address.zipCode}
//                     onChange={(e) => handleInputChange(e, 'zipCode', 'address')}
//                   />
//                 </div>
//               </div>
//               {/* <button
//                 className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
//                 onClick={() => setIsEditingAddress(false)}
//               >
//                 Save Address
//               </button> */}
//             </div>
//           )}

//           <div className="bg-white p-6 rounded-xl shadow-lg">
//             <h3 className="text-xl font-bold mb-6 text-gray-800">Payment Method</h3>
//             <div className="space-y-4">
//               <div
//                 className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                   paymentDetails.paymentMethod === 'Cash on Delivery'
//                     ? 'border-blue-500 bg-blue-50'
//                     : 'border-gray-200 hover:border-blue-300'
//                 }`}
//                 onClick={() => setPaymentDetails((prev) => ({ ...prev, paymentMethod: 'Cash on Delivery' }))}
//               >
//                 <div className="flex items-center">
//                   <CashIcon />
//                   <div>
//                     <h4 className="font-medium text-gray-800">Cash on Delivery</h4>
//                     <p className="text-sm text-gray-600">Pay when you receive your order</p>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                   paymentDetails.paymentMethod === 'Razorpay'
//                     ? 'border-blue-500 bg-blue-50'
//                     : 'border-gray-200 hover:border-blue-300'
//                 }`}
//                 onClick={() => setPaymentDetails((prev) => ({ ...prev, paymentMethod: 'Razorpay' }))}
//               >
//                 <div className="flex items-center">
//                   <CreditCardIcon />
//                   <div>
//                     <h4 className="font-medium text-gray-800">Razorpay</h4>
//                     <p className="text-sm text-gray-600">Pay using Razorpay</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-8">
//           <h3 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h3>
//           <div className="space-y-4">
//             {cart.map((item) => {
//               const itemPrice = item.product?.price ? Number(item.product.price) : 0;

//               return (
//                 <div key={item.id} className="flex justify-between items-center border-b pb-4">
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={item.product.images.url}
//                       alt={item.product.name}
//                       className="w-12 h-12 object-cover rounded-lg"
//                     />
//                     <div>
//                       <p className="font-medium text-gray-800">{item.name}</p>
//                       <p className="text-sm text-gray-500">
//                         {item.quantity} x ₹{itemPrice}
//                       </p>
//                       {item.selectedSize && (
//                         <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
//                       )}
//                     </div>
//                   </div>
//                   <p className="font-medium text-gray-800">₹{itemPrice.toFixed(2)}</p>
//                 </div>
//               );
//             })}
//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal:</span>
//                 <span className="font-medium">
//                   ₹{cart.reduce((total, item) => total + item.product?.price * item.quantity, 0).toFixed(2)}
//                 </span>
//               </div>
             
//               <div className="border-t pt-4 flex justify-between">
//                 <span className="text-lg font-bold text-gray-800">Total:</span>
//                 <span className="text-lg font-bold text-gray-800">
//                   ₹{(cart.reduce((total, item) => total + item.product?.price * item.quantity, 0) ).toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <button
//             className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold transition-colors shadow-md hover:shadow-lg"
//             onClick={paymentDetails.paymentMethod === 'Razorpay' ? handleRazorpayPayment : handleConfirmOrder}
//           >
//             {paymentDetails.paymentMethod === 'Razorpay' ? 'Pay with Razorpay' : 'Confirm Order'}
//           </button>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { setCart } from '../slice/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import api from '../axiosIntence';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant, slideIn } from "../utils/motion";

// Animated Icons
const CreditCardIcon = () => (
  <motion.svg 
    className="w-6 h-6 mr-2" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    whileHover={{ scale: 1.1 }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </motion.svg>
);

const CashIcon = () => (
  <motion.svg 
    className="w-6 h-6 mr-2" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    whileHover={{ scale: 1.1 }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </motion.svg>
);

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => state.user);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: '',
  });
  const [isAddressSet, setIsAddressSet] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    if (user) {
      api
        .get(`/admin/users/${user._id}`)
        .then((response) => {
          const userData = response.data;
          if (userData.shippingAddress) {
            setAddress(userData.shippingAddress);
            setIsAddressSet(true);
          }
          if (userData.paymentDetails) {
            setPaymentDetails(userData.paymentDetails);
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [user]);

  const handleInputChange = (e, field, section) => {
    const value = e.target.value;
    if (section === 'address') {
      setAddress((prev) => ({ ...prev, [field]: value }));
    } else {
      setPaymentDetails((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateInputs = () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode ||
      !paymentDetails.paymentMethod
    ) {
      toast.error('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleRazorpayPayment = async () => {
    if (!validateInputs()) return;

    const totalAmount = cart.reduce((total, item) => total + item.product?.price * item.quantity, 0);

    try {
      const response = await api.post('/razorpay/create-order', {
        amount: totalAmount,
        currency: 'INR',
      });

      const { id, currency, amount } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: amount.toString(),
        currency,
        name: 'Shoezz store',
        description: 'Payment for your order',
        order_id: id,
        handler: async (response) => {
          try {
            const verifyResponse = await api.post('/razorpay/verify-payment', {
              order_id: id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              toast.success('Payment successful!');
              handleConfirmOrder();
            } else {
              toast.error('Payment verification failed.');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            toast.error('Payment verification failed.');
          }
        },
        prefill: {
          name: address.fullName,
          email: user.email,
          contact: address.phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      toast.error('Failed to initiate payment.');
    }
  };

  const handleConfirmOrder = async () => {
    if (!cart || cart.length === 0) {
      toast.error('Your cart is empty. Please add items to your cart.');
      return;
    }

    const orderData = {
      cartItems: cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
      })),
      shippingAddress: address,
      paymentDetails,
    };

    try {
      const orderResponse = await api.post('/orders', orderData);

      if (orderResponse.data.msg === 'product ordered') {
        await api.patch(`/cart/cart/${user._id}`, { cart: [] });

        dispatch(setCart([]));
        toast.success('Order confirmed! Thank you for shopping.');
        setTimeout(() => {
          navigate('/orders');
        }, 1000);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      toast.error('Failed to confirm the order. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 lg:p-8 bg-gradient-to-br from-gray-50 to-white"
    >
      <motion.h2 
        variants={textVariant(0.5)}
        className="text-3xl font-bold mb-8 text-gray-800"
      >
        Checkout
      </motion.h2>
      
      <motion.div 
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <motion.div variants={fadeIn('right', 'tween', 0.2, 1)} className="space-y-8">
          <AnimatePresence>
            {isAddressSet && !isEditingAddress && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Shipping Address</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                    onClick={() => setIsEditingAddress(true)}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </motion.button>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {address.fullName}
                  </p>
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {address.phone}
                  </p>
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {`${address.street},${address.city}, ${address.state} ${address.zipCode}`}
                  </p>
                </div>
              </motion.div>
            )}

            {(isEditingAddress || !isAddressSet) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold mb-6 text-gray-800">Shipping Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries({
                    fullName: 'Full Name',
                    phone: 'Phone Number',
                    street: 'Street Address',
                    city: 'City',
                    state: 'State',
                    zipCode: 'PIN Code'
                  }).map(([field, label]) => (
                    <motion.div
                      key={field}
                      variants={fadeIn('up', 'tween', 0.2, 1)}
                      className={`space-y-2 ${field === 'street' ? 'md:col-span-2' : ''}`}
                    >
                      <label className="block text-sm font-medium text-gray-700">{label}</label>
                      <motion.input
                        type={field === 'phone' ? 'tel' : 'text'}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={address[field]}
                        onChange={(e) => handleInputChange(e, field, 'address')}
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
                  onClick={() => {
                    setIsEditingAddress(false);
                    setIsAddressSet(true);
                  }}
                >
                  Save Address
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            variants={fadeIn('right', 'tween', 0.4, 1)}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6 text-gray-800">Payment Method</h3>
            <div className="space-y-4">
              {[
                {
                  method: 'Cash on Delivery',
                  icon: <CashIcon />,
                  description: 'Pay when you receive your order'
                },
                {
                  method: 'Razorpay',
                  icon: <CreditCardIcon />,
                  description: 'Pay using Razorpay'
                }
              ].map((option) => (
                <motion.div
                  key={option.method}
                  whileHover={{ y: -5 }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentDetails.paymentMethod === option.method
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setPaymentDetails((prev) => ({ ...prev, paymentMethod: option.method }))}
                >
                  <div className="flex items-center">
                    {option.icon}
                    <div>
                      <h4 className="font-medium text-gray-800">{option.method}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={fadeIn('left', 'tween', 0.3, 1)}
          className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-8 border border-gray-100"
        >
          <h3 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h3>
          <div className="space-y-4">
            {cart.map((item, index) => {
              const itemPrice = item.product?.price ? Number(item.product.price) : 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <motion.img
                      src={item.product.images.url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ₹{itemPrice}
                      </p>
                      {item.selectedSize && (
                        <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                      )}
                    </div>
                  </div>
                  <p className="font-medium text-gray-800">₹{(itemPrice * item.quantity).toFixed(2)}</p>
                </motion.div>
              );
            })}
            <motion.div 
              variants={fadeIn('up', 'tween', 0.4, 1)}
              className="space-y-3"
            >
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  ₹{cart.reduce((total, item) => total + item.product?.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="border-t pt-4 flex justify-between"
              >
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-lg font-bold text-gray-800">
                  ₹{(cart.reduce((total, item) => total + item.product?.price * item.quantity, 0)).toFixed(2)}
                </span>
              </motion.div>
            </motion.div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-lg font-bold transition-all shadow-lg"
            onClick={paymentDetails.paymentMethod === 'Razorpay' ? handleRazorpayPayment : handleConfirmOrder}
          >
            {paymentDetails.paymentMethod === 'Razorpay' ? 'Pay with Razorpay' : 'Confirm Order'}
          </motion.button>
        </motion.div>
      </motion.div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </motion.div>
  );
};

export default Checkout;