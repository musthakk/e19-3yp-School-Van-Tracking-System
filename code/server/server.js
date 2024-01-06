const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(express.json()); // Enable parsing of JSON in requests

app.post('/signup', async(req, res) => {
  const { fullName, username, contactNumber, email, password } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // You can print the data to the console, including the hashed password
  console.log('Received signup data:', { fullName, username, contactNumber, email, hashedPassword });

  // Send a response to the client
  res.json({ success: true, message: 'Signup successful' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
