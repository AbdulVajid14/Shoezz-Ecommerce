const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const RefreshToken=require('../models/RefreshTokens')
const tryCatch=require("../utils/tryCatch")
const Cart=require('../models/Cart')
const CustomError=require('../utils/customError')



exports.getUsers = tryCatch(async (req, res) => {
  const userId = req.params.id; 
  const user = await User.findById(userId).select('-password'); 
  if(!user) throw new CustomError('user not foung',404)
  
  const cart = await Cart.findOne({user:userId}).populate({
    path: 'items.product',
    model: 'Product'
  });
  const orders = await Order.find({user:userId}).populate({
    path: 'cartItems.product',
    model: 'Product'
  });
  const response = {
    user,
    cart,
    orders
  };
  res.json(response); 
});

exports.updateUserBlockStatus =tryCatch(async (req,res)=>{
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {isBlocked:req.body.isBlocked},
      {new:true}
    ).select('-password');
    if (!user) throw new CustomError('user not found',404)
    res.json({msg:'user have bolocked/unblocked'});
  
});
 


exports.getOrdersAdmin = tryCatch(async (req, res) => {
  const orders = await Order.find({})
    .populate({
      path: 'cartItems.product',
      select: 'name price images id', 
    })
    .populate({
      path: 'user', 
      select: 'username email', 
    })
    .sort({ orderDate: -1 }); 
  res.json(orders); 
});

exports.getallOrders = tryCatch(async (req,res)=>{
    const orders = await Order.find()
      .populate('user', 'username email') 
      .populate('cartItems.product', 'name price')  
      .sort({ orderDate: -1 });  
    res.json(orders);
  
});


exports.getUserDetails = tryCatch(async (req,res)=>{
  const { userId } = req.params;
  const user = await User.findById(userId)
    .select('-password') 
    .populate({
      path: 'cart',
      select: 'name price images', 
    })
    .populate({
      path: 'orders',
      populate: {
        path: 'cartItems.product',
        select: 'name price images', 
      },
    });

  if(!user){
    throw new CustomError('user not found',404)  }
  res.json(user);
});
