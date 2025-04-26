import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/kwikcommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  storeName: String,
  businessCategory: String,
});

const User = mongoose.model('User', userSchema);

// UserDetails schema and model
const userDetailsSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  storeName: String,
  category: String,
  ARR: String,
  averageOrderValue: Number,
  storeType: String,
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

// Register route
app.post('/register', async (req, res) => {
  const { email, password, storeName, businessCategory } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, storeName, businessCategory });
  await user.save();
  res.status(201).send('User registered');
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Route to save user details
app.post('/user-details', async (req, res) => {
  const { email, storeName, category, ARR, averageOrderValue, storeType } = req.body;
  try {
    const existingUserDetails = await UserDetails.findOne({ email });
    if (existingUserDetails) {
      // Update existing user details
      existingUserDetails.storeName = storeName;
      existingUserDetails.category = category;
      existingUserDetails.ARR = ARR;
      existingUserDetails.averageOrderValue = averageOrderValue;
      existingUserDetails.storeType = storeType;
      await existingUserDetails.save();
      res.status(200).send('User details updated');
    } else {
      // Create new user details
      const userDetails = new UserDetails({ email, storeName, category, ARR, averageOrderValue, storeType });
      await userDetails.save();
      res.status(201).send('User details saved');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
import OpenAI from 'openai';

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: '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',
});

// Route to generate landing page using OpenAI
app.post('/generate-landing-page', async (req, res) => {
  const { goal, product, offer, style } = req.body;
  const prompt = `Generate a landing page for a product. Goal: ${goal}, Product: ${product}, Offer: ${offer}, Style: ${style}.`;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
    });

    const generatedText = response.data.choices[0].text.trim();
    res.json({ generatedText });
  } catch (error) {
    console.error('Error generating landing page:', error);
    res.status(500).json({ error: 'Error generating landing page' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});