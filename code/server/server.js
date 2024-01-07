const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Enable parsing of JSON in requests

// Connect to MongoDB
mongoose.connect('mongodb+srv://musthak:Mk741300@cluster0.zl8gzee.mongodb.net/SureWay2024');
const db = mongoose.connection;

// Define a schema for the children
// This childSchema will get data when user add children to his account..
const childSchema = new mongoose.Schema({
  name: String,
  age: Number,
  school: String,
  pickupAddress: String,
  dropAddress: String,
  vehicleID: String,
  travellingStatus: { type: Number},
});

// Define a schema for the user collection
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  verified: { type: Number, default: -1 },
  children: [childSchema], // An array of children objects
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema, 'Users');

// Validate userName
app.get('/validate-username', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username parameter is missing.' });
  }

  try {
    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });

    const isUsernameExists = !!existingUser;

    res.json({ exists: isUsernameExists });
  } catch (error) {
    console.error('Error validating username:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Validate email
app.get('/validate-email', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email parameter is missing.' });
  }

  try {
    // Check if the username already exists in the database
    const existingUser = await User.findOne({ email });

    const isEmailExists = !!existingUser;

    res.json({ exists: isEmailExists });
  } catch (error) {
    console.error('Error validating username:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Handles Registration.. When register button is pressed, data is sent to the mongoDb Atlas
app.post('/signup', async(req, res) => {
  const { fullName, username, contactNumber, email, password } = req.body;

  try{
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user Document..
    const newUser = new User({
      fullName,
      username,
      contactNumber,
      email,
      hashedPassword,
    });

    // Save the User document to the database
    await newUser.save();

    // You can print the data to the console, including the hashed password
    console.log('Received signup data:', { fullName, username, contactNumber, email, hashedPassword });

    // Send a response to the client
    res.json({ success: true, message: 'Signup successful' });
  }
  catch(error){
    console.error('Error during signup:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});




app.listen(port, '0.0.0.0',() => {
  console.log(`Server is running on http://localhost:${port}`);
});
