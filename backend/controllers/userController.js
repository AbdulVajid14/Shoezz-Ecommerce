
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshTokens');
const tryCatch = require('../utils/tryCatch');
const CustomError = require('../utils/customError');

exports.getUserProfile = tryCatch(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw new CustomError('User not found', 404);
    res.json(user);
});

exports.registerUser = tryCatch(async (req, res) => {
  const { username, email, password, role } = req.body;
  let user = await User.findOne({ email });
  if (user) throw new CustomError('User already exists', 400);
  
  user = new User({ 
    username, 
    email, 
    password,
    role: 'user'
  });
  
  await user.save();
  const accessToken = jwt.sign({ user: { id: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ user: { id: user.id, role: user.role } }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  await RefreshToken.create({ token: refreshToken, userId: user.id });
  res.json({ msg: ` User registered successfully` });
});

exports.loginUser = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) throw new CustomError('Invalid credentials', 400);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new CustomError('Invalid credentials', 400);
  if (user.isBlocked) throw new CustomError('Your account has been blocked. Please contact support', 403);
  
  const accessToken = jwt.sign({ user: { id: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ user: { id: user.id, role: user.role } }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  await RefreshToken.create({ token: refreshToken, userId: user.id });
  
  res.json({
    msg: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} logged in successfully`,
    accessToken,
    refreshToken,
    role: user.role
  });
});

exports.getAllUsers = tryCatch(async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});