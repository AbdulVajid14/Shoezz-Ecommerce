const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const orderController=require('../controllers/orderController')
// const tryCatch=require('../utils/tryCatch')


router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);


router.get('/users/:id', authMiddleware, adminController.getUsers);
router.patch('/users/:id/block', authMiddleware, adminController.updateUserBlockStatus);

router.post('/products/add', authMiddleware,productController.uploadProductImage ,productController.createProduct);
router.put('/products/:id', authMiddleware, productController.uploadProductImage,productController.updateProduct);
router.delete('/products/:id', authMiddleware, productController.deleteProduct);

router.patch("/orders/:orderId/status",authMiddleware,orderController.statusChange)

router.get('/orders',authMiddleware,adminController.getOrdersAdmin)
router.get('/users/:id',authMiddleware,adminController.getUserDetails)
router.get('/order',authMiddleware,adminController.getallOrders)



// router.post('/api/admin/check', tryCatch(async (req, res) => {
//     const { email, password } = req.body;
//     const admin = await admins.findOne({ email });
  
//     if (!admin) {
//       return res.json({ isAdmin: false });
//     }
  
//     const isMatch = await admin.comparePassword(password);
  
//     if (!isMatch) {
//       return res.json({ isAdmin: false });
//     }
  
//     res.json({ isAdmin: true });
//   }));

module.exports = router;