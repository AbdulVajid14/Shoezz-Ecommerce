
const CustomError=require('../utils/customError')

const errorHandler =(err,req,res,next)=>{
  console.error(`Error:${err.message}`);

  const statusCode=err.statusCode||500;
  const message=err.message||'Internal Server Error';
  res.status(statusCode).json({success:false,message});

  res.status(err.statusCode).json({
    status:err.status,
    message:err.message
  })
  
};

module.exports = errorHandler;
