require('dotenv').config(); 
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');


const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Auto-create one admin if none exists
(async () => {
  try {
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
      console.log("✅ Admin already exists");
    }
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
})();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts')); 
app.use('/api/upload', require('./routes/upload'));
app.use('/api/about', require('./routes/about'));
app.use('/api/hero', require('./routes/hero'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));