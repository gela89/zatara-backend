const mongoose = require('mongoose');

// სქემა
const productSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    unique: true, 
    default: () => Math.floor(Date.now() / 1000) // უნიკალური რიცხვი წამებში
  },
  title: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  details: {
    material: { type: String, required: true },
    producer: { type: String, required: true },
    dimensions: {
      general: { type: String, required: true }
    },
    colors: [{ type: String, required: true }],
    features: [{ type: String }],
  },
});

// მოდელი
const Product = mongoose.model('Product', productSchema);

module.exports = Product;