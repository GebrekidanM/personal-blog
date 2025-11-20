require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

// MongoDB Connection + Admin Setup
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    const existingAdmin = await User.findOne();
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
      const admin = new User({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });
      await admin.save();
      console.log("👑 Admin account created:", process.env.ADMIN_EMAIL);
    } else {
      console.log("✅ Admin already exists local");
    }
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/about', require('./routes/about'));
app.use('/api/hero', require('./routes/hero'));
app.use('/api/subscribe', require('./routes/subscription'));
app.use('/api/catagory', require('./routes/catagory'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🌍 CORS allowed from: ${process.env.CORS_ORIGIN}`);
});
