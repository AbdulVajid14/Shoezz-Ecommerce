
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshTokens');
// const tryCatch=require('../utils/tryCatch')
const CustomError=require('../utils/customError')

exports.refreshToken = async (req,res)=>{
    const {refreshToken}=req.body;
  
    if(!refreshToken) throw new CustomError('no refresh token provided',401)
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await RefreshToken.findOne({ token: refreshToken });
      if (!storedToken) throw new CustomError('invalid refresh toke',403)
        const accessToken = jwt.sign({user:{id:decoded.user.id}},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({accessToken});
    } catch(err){
      console.error(err.message);
      res.status(403).json({msg:'Invalid refresh token'});
    }
  };


 
  









  