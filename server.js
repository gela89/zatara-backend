const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const Product = require('./models/Products'); // დარწმუნდით, რომ ეს გზა სწორია

app.use(cors());
app.use(express.json());

// MongoDB კავშირი
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// --- API მარშრუტები იწყება აქ ---

// API მარშრუტი ყველა პროდუქტის წამოსაღებად
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API მარშრუტი ახალი პროდუქტის დასამატებლად (ეს არის ის, რაც დაამატეთ)
app.post('/api/products', async (req, res) => {
  const productData = req.body; // Postman-იდან მიღებული მონაცემები

  // აქ შეგიძლიათ დაამატოთ დამატებითი ვალიდაცია, სანამ მონაცემთა ბაზაში შეინახავთ
  // მაგალითად, შეამოწმოთ, რომ ყველა საჭირო ველი არსებობს და სწორი ტიპისაა.

  try {
    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct); // წარმატების სტატუსი (Created) და შექმნილი ობიექტი
  } catch (error) {
    console.error('Error adding product:', error);

    // MongoDB-ის დუბლიკატი გასაღების შეცდომის დამუშავება (თუ id უკვე არსებობს)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.id) {
      return res.status(409).json({ message: 'Product with this ID already exists.', details: error.message });
    }
    
    // სხვა ვალიდაციის შეცდომების დამუშავება (მაგალითად, required ველის არარსებობა)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', details: error.message });
    }

    res.status(500).json({ message: 'Failed to add product', details: error.message }); // ზოგადი შეცდომა სერვერზე
  }
});

// API მარშრუტი ერთი პროდუქტის _id-ის მიხედვით წამოსაღებად
app.get('/api/products/:id', async (req, res) => {
    try {
        const { ObjectId } = mongoose.Types; // ObjectId-ის იმპორტი

        const productId = req.params.id;

        // შეამოწმეთ, არის თუ არა მოცემული ID ვალიდური MongoDB ObjectId ფორმატისთვის
        if (!ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid Product ID format' });
        }

        const product = await Product.findById(productId); // მოძებნა _id ველით

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching single product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// --- სერვერის გაშვება (მხოლოდ ერთხელ უნდა იყოს) ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
