// server.js

const express = require('express');
const cors = require('cors');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 4000; // The server will run on port 4000

// --- Middleware ---
// 1. CORS (Cross-Origin Resource Sharing)
// This is essential! It allows your Next.js frontend to make requests to this server.
app.use(cors({
  origin: 'http://localhost:3000' // Only allow requests from your frontend's address
}));

// 2. Body Parser
// This allows our server to understand JSON data sent from the frontend forms.
app.use(express.json());


// --- API Endpoints (Our Routes) ---

// A simple test route to make sure the server is working
app.get('/', (req, res) => {
  res.send('Atrsaw Form API is running!');
});

// 1. Endpoint for the Newsletter Signup
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  // Basic validation
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }

  // --- What to do with the email? ---
  // For now, we will just log it to the console.
  // LATER, you could add code here to:
  // - Save it to a database (MongoDB, etc.)
  // - Add it to an email marketing service (like Mailchimp)
  console.log(`New Newsletter Subscription: ${email}`);
  // ---

  // Send a success response back to the frontend
  res.status(200).json({ message: 'Thank you for subscribing!' });
});


// 2. Endpoint for the Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // --- What to do with the contact data? ---
  // For now, we will just log it.
  // LATER, you could add code here to:
  // - Send an email notification to Atrsaw (using a library like Nodemailer)
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