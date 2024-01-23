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

// Define a schema for the children collection
// This childSchema will get data when user add children to his account..
const DetailedChildSchema = new mongoose.Schema({
  name: {type: String, required: true},
  isVerified: {type: Boolean, default: false},
  parent_username: {type: String, required: true},
  age: {type: Number, required: true},
  school: {type: String, required: true},
  pickupAddress: {type: String, required: true},
  vehicleID: {type: String, default: ""},
  travellingStatus: { type: Number, default: 0},
  Agency: {type: String},
  profileAvatar: {type: String},
});

// Define a children schema to contain few details about a particular student added under a user.. 
// this Schema will come under userSchema..
const childSchema = new mongoose.Schema({
  name : {type: String, required: true},
  isVerified: {type: Boolean, default: false},
});


// Define a schema for the user collection
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  isVerified: {type: Boolean, default: false},
  children: [childSchema], // An array of children objects
});

// Define a shema for the driver collection.
const driverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true , unique: true},
  hashedPassword: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  NIC: { type: String, required: true , unique: true},
  licenseNumber: { type: String, required: true , unique: true},
  assignedVehicle: { type: String},
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema, 'Users');

// Create a Driver model based on the schema
const Driver = mongoose.model('Driver', driverSchema, 'Drivers');

// Create a Children model based on the schema
const Children = mongoose.model('Children', DetailedChildSchema, 'Children');

// Endpoint: Validate userName
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

// Endpoint: Validate email
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


// Endpoint: Handles Registration.. When register button is pressed, data is sent to the mongoDb Atlas
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
    console.log("Email has been sent");

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

// Endpoint: verify-email route
app.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, '21fb95d2a90a577450501e2f1bf8528b5c2fe54f067006c9b30c9d4a4fa79e54270dabb53621602f0df02bf8f390075feba92209f78ebbbf13d8b84d8807590f'); // Use the same secret key used for token generation
    const userId = decodedToken.userId;

    // Update user's verification status in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
      
    }

    user.isVerified = true;
    await user.save();

    res.json({ success: true, message: 'Email verification successful.' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("requested username and password for login:"+username+" "+password);
  // Find the user in your database (replace with a database query)
  const user = await User.findOne({ username });

  if (!user) {

    // If username is not in the User collection check it in the Driver collection..
    const driver = await Driver.findOne({username: username});

    if(!driver){
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, driver.hashedPassword )

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ driverId: driver.id }, '21fb95d2a90a577450501e2f1bf8528b5c2fe54f067006c9b30c9d4a4fa79e54270dabb53621602f0df02bf8f390075feba92209f78ebbbf13d8b84d8807590f', { expiresIn: '2d' });
  
    // get the driver details to the front end
    const driver_first_name = driver.firstName;
    const driver_last_name = driver.lastName;
    const driver_contact_number = driver.contactNumber;
    const driver_email = driver.email;
    const driver_assigned_vehicle = driver.assignedVehicle;

    return res.json({ token, identification: "driver", driver_first_name, driver_last_name, driver_contact_number, driver_email, driver_assigned_vehicle});
  }

  // Compare the entered password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  else if (passwordMatch && user.isVerified == false){
    return res.status(401).json({ message: 'User is not verified' });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id }, '21fb95d2a90a577450501e2f1bf8528b5c2fe54f067006c9b30c9d4a4fa79e54270dabb53621602f0df02bf8f390075feba92209f78ebbbf13d8b84d8807590f', { expiresIn: '2d' });

  // get the user details to the front end
  const user_fullName = user.fullName;
  const user_contactNumber = user.contactNumber;
  const user_email = user.email;
  const user_numberOfChildren = user.children.length;

  res.json({ token, identification: "user", user_fullName, user_contactNumber, user_email, user_numberOfChildren});
});


// End-point for get the children data of a user..
app.post('/getChildrenInfo', async (req, res) => {
  const { username } = req.body;

  try {
    // Find children with the specific username
    const children = await Children.find({ parent_username: username });

    // Map the children array to only include the name, agency, and profileAvatar fields
    const childrenDetails = children.map(child => ({
      name: child.name,
      agency: child.Agency,
      vehicleID: child.vehicleID,
      profileAvatar: child.profileAvatar,
      verifiedStatus: child.isVerified,
      travellingStatus: child.travellingStatus,
    }));

    res.json(childrenDetails);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }

});

app.listen(port, '0.0.0.0',() => {
  console.log(`Server is running on http://localhost:${port}`);
});
