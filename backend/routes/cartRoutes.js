const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

router.get('/',auth,cartController.getCart);
router.post('/',auth,cartController.addToCart);
router.delete('/:id',auth,cartController.removeFromCart);
router.put('/:id',auth,cartController.updateCartItem);
router.patch('/cart/:id',auth,cartController.clearCart);

module.exports = router; 