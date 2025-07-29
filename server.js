const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const Product = require('./models/Products');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/products', async (req, res) => {
  const productData = req.body;

  try {
    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);

    if (error.code === 11000 && error.keyPattern && error.keyPattern.id) {
      return res.status(409).json({ message: 'Product with this ID already exists.', details: error.message });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', details: error.message });
    }

    res.status(500).json({ message: 'Failed to add product', details: error.message });
  }
});

// 3️⃣ ერთი პროდუქტის წამოღება ID-ით (შესწორებული)
app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);

        if (isNaN(productId)) {
            return res.status(400).json({ message: 'Invalid Product ID format: ID must be a number.' });
        }

        const product = await Product.findOne({ id: productId }); // იპოვეთ თქვენი 'id' ველით

        if (!product) {
            return res.status(404).json({ message: 'Product not found with ID: ' + productId });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching single product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// 4️⃣ პროდუქტის განახლება ID-ით (შესწორებული)
app.put('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);

        if (isNaN(productId)) {
            return res.status(400).json({ message: 'Invalid Product ID format: ID must be a number.' });
        }

        const updatedProduct = await Product.findOneAndUpdate( // გამოიყენეთ findOneAndUpdate
            { id: productId }, // მოძებნეთ თქვენი 'id' ველით
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found with ID: ' + productId });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
});

// 5️⃣ პროდუქტის წაშლა ID-ით (უკვე შესწორებული იყო)
app.delete('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);

        if (isNaN(productId)) {
            return res.status(400).json({ message: 'Invalid Product ID format: ID must be a number.' });
        }

        const deletedProduct = await Product.findOneAndDelete({ id: productId });

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found with ID: ' + productId });
        }

        res.json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
