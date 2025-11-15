const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// POST /api/subscribe — Create new subscription
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if already subscribed
    const existing = await Subscription.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'You are already subscribed.' });
    }

    const subscription = new Subscription({ email });
    await subscription.save();

    // Send confirmation to Formspree
    const formspreeResponse = await fetch('https://formspree.io/f/xblqroez', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        message: `New subscriber joined your newsletter: ${email}`
      }),
    });

    if (!formspreeResponse.ok) {
      console.warn('⚠️ Formspree email not sent, but subscription saved.');
    }

    res.status(201).json({ message: 'Subscription successful!' });

  } catch (err) {
    console.error('❌ Error subscribing:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
