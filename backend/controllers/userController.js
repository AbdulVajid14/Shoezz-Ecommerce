const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RefreshToken=require('../models/RefreshTokens')
const tryCatch=require('../utils/tryCatch')
const CustomError=require('../utils/customError')

exports.getUserProfile = tryCatch(async (req,res)=>{
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw new CustomError('user not found',404)
    res.json(user);
});

exports.registerUser = tryCatch(async (req,res)=>{
  const {username,email,password} = req.body;
    let user = await User.findOne({ email });
    if (user) throw new CustomError('user already exist',400)
    user = new User({ username, email, password });
    await user.save();
    const accessToken = jwt.sign({user:{id:user.id }},process.env.JWT_SECRET,{expiresIn:'1h'});
    const refreshToken = jwt.sign({user:{id:user.id}},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'});
    await RefreshToken.create({token:refreshToken,userId:user.id});
    res.json({msg:'User registered successfully'});         
});

exports.loginUser = tryCatch(async (req,res)=>{
  const { email, password } = req.body;
    let user = await User.findOne({email});
    if (!user) throw new CustomError('invalid entering',400)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError('invalid entering',400)
    if (user.isBlocked) throw new CustomError('your account has been blocked. please contact support',403)
      const accessToken = jwt.sign({user:{id: user.id}},process.env.JWT_SECRET,{expiresIn:'1h'});
      const refreshToken = jwt.sign({user:{id:user.id}},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'});
      await RefreshToken.create({ token: refreshToken, userId: user.id });
      res.json({msg:'User logged in successfully',accessToken,refreshToken});
 
});

exports.getAllUsers = tryCatch(async (req,res)=>{
    const users = await User.find().select('-password');
    res.json(users);
});

