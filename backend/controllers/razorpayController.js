const Razorpay =require('razorpay')
const crypto=require('crypto')
const tryCatch = require('../utils/tryCatch')
const CustomError=require('../utils/customError')


const razorpay= new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})


exports.createOrder=tryCatch(async(req,res)=>{
    const {amount,currency,receipt}=req.body;
    const options={
        amount:amount*100,
        currency,
        receipt,
        payment_capture:1,
    }

    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });

})

exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;
  
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${order_id}|${payment_id}`)
      .digest('hex');
  
    if (generatedSignature === signature) {
      res.json({ success: true, message: 'Payment verified successfully' });
    } else throw new CustomError('payment verification failed',400)
    // {
    //   res.status(400).json({ success: false, message: 'Payment verification failed' });
    // }
  };