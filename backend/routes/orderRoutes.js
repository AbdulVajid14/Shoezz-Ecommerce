
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.post('/', auth, orderController.createOrder);
router.get('/:id', auth, orderController.getOrders);
router.get('/orders',auth,orderController.getAllOrders)

module.exports = router;