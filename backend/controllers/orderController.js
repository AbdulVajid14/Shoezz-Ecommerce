const Order = require('../models/Order');
const tryCatch=require('../utils/tryCatch')
const CustomError=require('../utils/customError')

exports.createOrder = tryCatch(async (req, res) => {
  const { cartItems, shippingAddress, paymentDetails } = req.body;
    const order = new Order({
      user: req.user.id,
      cartItems,
      shippingAddress,
      paymentDetails,
    });
    await order.save();
    res.json({msg:'product ordered'});

});

exports.getOrders = tryCatch(async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: 'cartItems.product',
        select: 'name price images', 
      })
      .sort({ orderDate: -1 }); 
    res.json(orders);
});

exports.getAllOrders = tryCatch(async (req, res) => {
  const orders = await Order.find()
    .populate({
      path: "user",
      select: "name email", 
    })
    .populate({
      path: "cartItems.product",
      select: "name price images", 
    })
    .sort({ orderDate: -1 }); 

  res.json(orders);
});


exports.statusChange = tryCatch(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; 
    const order = await Order.findById(orderId);
    if (!order) throw new CustomError('order not found',404)    
    order.status = status;
    await order.save(); 
    res.json({message:'Order status updated successfully'});
});