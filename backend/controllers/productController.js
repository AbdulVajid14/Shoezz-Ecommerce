
const Product = require('../models/Product');
const mongoose = require('mongoose');
const tryCatch = require('../utils/tryCatch');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const CustomError=require('../utils/customError')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:{
    folder:'products',
    allowed_formats:['jpg','jpeg','png','webp'],
    transformation:[{width:800,height:800,crop:'limit'}]
  }
});

const upload = multer({storage:storage});

exports.uploadProductImage = upload.single('images');

exports.getProducts = tryCatch(async (req,res)=>{
  const products = await Product.find().sort({createdAt:-1});
  res.json(products);
});

exports.getProductsByCategory = tryCatch(async (req,res)=>{
  const category = req.params.categories;
  const products = await Product.find({categories:category});
  if (!products.length) throw new CustomError('no products found for this category',404)  
  res.json(products);
});

exports.getProductById = tryCatch(async (req,res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({msg:'Invalid product ID format'});
  }
  const product = await Product.findById(req.params.id);
  if(!product) throw new CustomError('product not found',404)
  res.json(product);
});

exports.createProduct = tryCatch(async (req,res)=>{
  console.log(req.body); 
  if(!req.file) throw new CustomError('please uplaod a product image',400)  
  const result = await cloudinary.uploader.upload(req.file.path);
  const newProduct = new Product({...req.body,images:{
      public_id: result.public_id,
      url: result.secure_url
    }
  });
  await newProduct.save();
  res.status(201).json({ msg:'Product added successfully' });
});


exports.updateProduct = tryCatch(async (req, res) => {
  console.log('req.file:', req.file); 
  console.log('req.body:', req.body); 
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw new CustomError('invalid product Id format',400)  
  const product = await Product.findById(req.params.id);
  if (!product) throw new CustomError('product not found',404)
   
  const { name, price, stock, categories, description } = req.body;
  if (!name || !price || !stock || !categories || !description) throw new CustomError('missing required fields',400)   
  if (req.file) {
    if (product.images && product.images.public_id) {
      try {
        await cloudinary.uploader.destroy(product.images.public_id);
      } catch (error) {
        console.error('Error deleting old image from Cloudinary:', error);
        return res.status(500).json({ message: 'Failed to delete old image' });
      }
    }
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.images = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } catch (error) {
      console.error('Error uploading new image to Cloudinary:', error);
      return res.status(500).json({ message: 'Failed to upload new image' });
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({ msg: 'Product updated successfully' });
});


exports.deleteProduct = tryCatch(async (req,res)=>{
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw new CustomError('invalid product Id format',400)  
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new CustomError('product not found',404)
  await cloudinary.uploader.destroy(product.images.public_id);
  res.json({msg:'Product deleted successfully'});
});