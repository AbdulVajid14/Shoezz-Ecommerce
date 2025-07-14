const Cart = require('../models/Cart');
const tryCatch=require('../utils/tryCatch')
const CustomError=require('../utils/customError')

exports.getCart = tryCatch (async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) throw new CustomError('cart not found',404)
    res.json(cart);
  
});

exports.addToCart = tryCatch(async (req, res)=>{
    let cart = await Cart.findOne({user: req.user.id});
    if(!cart){
      cart = new Cart({user: req.user.id,items:[]});
    }
    const { productId, quantity, selectedSize } = req.body;
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if(itemIndex > -1){
      cart.items[itemIndex].quantity += quantity;
    } else{
      cart.items.push({product:productId,quantity,selectedSize});
    }
    await cart.save();
    res.json({msg:'Item added to cart'});
 
});

exports.removeFromCart = tryCatch(async(req,res)=>{
    const cart = await Cart.findOne({user:req.user.id});
    if (!cart) throw new CustomError('cart not found',404)
    cart.items = cart.items.filter(item => item.product.toString() !== req.params.id);
    await cart.save();
    res.json({msg:'selected product is deleted'});
  
});
exports.clearCart = tryCatch(async (req, res) => {
  const { id } = req.params; 

  const cart = await Cart.findOne({ user: id });

  if (!cart) throw new CustomError('cart not found',404)
  cart.items = [];
  await cart.save();
  res.json({ msg: 'Cart cleared successfully' });
});

exports.updateCartItem = tryCatch(async (req,res)=>{
  const {quantity} = req.body;
    const cart = await Cart.findOne({user:req.user.id});
    if (!cart) throw new CustomError('cart not found',404)
    const itemIndex = cart.items.findIndex(item => item.product.toString() === req.params.id);
    if (itemIndex === -1) throw new CustomError('item not found in cart',404)
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.json({msg:'cart is updates'});

});

