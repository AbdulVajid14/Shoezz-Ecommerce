const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems:[{
    product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity:{ type: Number, required: true },
    selectedSize:{ type: Number }
  }],
  shippingAddress:{
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  paymentDetails:{
    cardNumber: String,
    expiryDate: String,
    cvv: String,
    paymentMethod: String
  },
  status:{ type: String, default: 'Pending' },
  orderDate:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);