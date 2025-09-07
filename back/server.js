const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const connectDB = require('./config/db');
const Subscription = require('./models/Subscription');
const ContactMessage = require('./models/ContactMessage');

connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Atrsaw Form API is running!');
});

app.post('/api/subscribe', async (req, res) => { // <-- Make it an async function
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }
  
  try {
    // Check if the email already exists
    let subscription = await Subscription.findOne({ email });
    if (subscription) {
      return res.status(400).json({ message: 'You are already subscribed!' });
    }
    
    // Create a new subscription and save it to the DB
    subscription = new Subscription({ email });
    await subscription.save();

    console.log(`New Subscription SAVED to DB: ${email}`);
    res.status(200).json({ message: 'Thank you for subscribing!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 2. Endpoint for the Contact Form
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await ContactMessage.create({ name, email, subject, message });

    console.log('--- New Contact Form Submission SAVED to DB ---');
    // In a real app, you would also trigger an email to Atrsaw here.
    
    res.status(201).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while saving message.' });
  }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
