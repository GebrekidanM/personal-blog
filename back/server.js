const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 4000; // The server will run on port 4000

app.use(cors({
  origin: 'http://localhost:3000' // Only allow requests from your frontend's address
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Atrsaw Form API is running!');
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }
  console.log(`New Newsletter Subscription: ${email}`);
  // ---
  res.status(200).json({ message: 'Thank you for subscribing!' });
});

// 2. Endpoint for the Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  console.log('--- New Contact Form Submission ---');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  console.log('---------------------------------');
  // ---

  // Send a success response
  res.status(200).json({ message: 'Your message has been sent successfully!' });
});


// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`✅ Form API server is running at http://localhost:${PORT}`);
});