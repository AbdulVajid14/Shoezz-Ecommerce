
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/me', auth, userController.getUserProfile);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', auth, userController.getAllUsers);


router.get('/:userId/latest-address', async (req, res) => {
  try {
    const userId = req.params.userId;
    const latestOrder = await Order.findOne({ user: userId })
      .sort({ orderDate:-1}) 
      .select('shippingAddress');

    if (latestOrder && latestOrder.shippingAddress) {
      return res.json(latestOrder.shippingAddress);
    }
    const user = await User.findById(userId).select('shippingAddress');
    if (user.shippingAddress) {
      return res.json(user.shippingAddress);
    }

    res.status(404).json({message:'No shipping address found'});
  } catch (error) {
    res.status(500).json({message:'Server error',error});
  }
});



module.exports = router;