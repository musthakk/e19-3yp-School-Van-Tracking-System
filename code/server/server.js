const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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
  isVerified: {type: Boolean, default: false},
  ChildAddRequest: { type: Number, default: -1 },
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
    console.error('Error validating email:', error);
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
    // console.log('Received signup data:', { fullName, username, contactNumber, email, hashedPassword });


    // Generate a verification token
    const verificationToken = generateVerificationToken(newUser._id);

    // Send verification email
    sendVerificationEmail(newUser.email, verificationToken);

    res.json({ success: true, message: 'Registration successful. Check your email for verification.' });

  }
  catch(error){
    console.error('Error during reigstration:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Function to generate a JWT token
const generateVerificationToken = (userId) => {
  const secretKey = '21fb95d2a90a577450501e2f1bf8528b5c2fe54f067006c9b30c9d4a4fa79e54270dabb53621602f0df02bf8f390075feba92209f78ebbbf13d8b84d8807590f';
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to send an email using Nodemailer
const sendEmail = async (to, subject, html) => {
  // Replace with your actual email configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'e19247@eng.pdn.ac.lk',
      pass: 'Mke19247',
    },
  });

  const mailOptions = {
    from: 'e19247@eng.pdn.ac.lk',
    to,
    subject,
    html,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

// Function to send a verification email
const sendVerificationEmail = (userEmail, verificationToken) => {
  const subject = 'Verify Your Email';
  const verificationLink = `http://52.66.141.134:3000/verify-email?token=${verificationToken}`;

  const htmlContent = `
    <h3>SureWay..</h3>
    <p>Thank you for registering. Please click the link below to verify your email:</p>
    <a href="${verificationLink}">${verificationLink}</a>
  `;

  // Call the sendEmail function
  sendEmail(userEmail, subject, htmlContent);
};

// verify-email route
app.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, '21fb95d2a90a577450501e2f1bf8528b5c2fe54f067006c9b30c9d4a4fa79e54270dabb53621602f0df02bf8f390075feba92209f78ebbbf13d8b84d8807590f'); // Use the same secret key used for token generation
    const userId = decodedToken.userId;

    // Update user's verification status in the database
    const user = await User.findById(userId);
    if (!user) {
      console.log("Not found");
      return res.status(404).json({ success: false, message: 'User not found.' });
      
    }

    if (user.isVerified) {
      console.log("Already Verified");
      return res.status(400).json({ success: false, message: 'Email already verified.' });
    }

    user.isVerified = true;
    await user.save();

    console.log("Verified.")
    res.json({ success: true, message: 'Email verification successful.' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


app.listen(port, '0.0.0.0',() => {
  console.log(`Server is running on http://localhost:${port}`);
});
