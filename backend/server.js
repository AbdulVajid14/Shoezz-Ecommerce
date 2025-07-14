const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
const connectDB = require('./config/db'); 
const errorHandler=require("./middleware/errorHandler")

const userRoutes=require('./routes/userRoutes')
const productRoutes=require('./routes/productRoutes')
const cartRoutes=require('./routes/cartRoutes')
const orderRoutes=require('./routes/orderRoutes')
const adminRoutes=require('./routes/adminRoutes')
const authRoutes=require('./routes/authRoutes')
const razorpayRoutes=require('./routes/razorpayRoutes')

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5001;
app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler)
connectDB()
 
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/admin',adminRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/razorpay',razorpayRoutes)


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));