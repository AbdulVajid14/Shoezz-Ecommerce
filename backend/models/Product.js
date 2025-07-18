const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name:{type: String, required: true },
  price:{type: Number, required: true },
  stock:{type: Number,  },
  categories:{type: String, required: true },
  images:{public_id: { type: String, required: true },
  url: { type: String, required: true } },
  description:{type: String ,required:true}
});

module.exports = mongoose.model('Product', ProductSchema);