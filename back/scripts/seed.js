// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust path to the User model

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

if (!process.env.MONGO_URI || !ADMIN_PASSWORD || !ADMIN_EMAIL) {
  console.error('FATAL ERROR: MONGO_URI, ADMIN_EMAIL, and ADMIN_PASSWORD must be defined in your .env file.');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedAdminUser = async () => {
  await connectDB();

  try {
    // First, try to delete the user if they already exist
    await User.deleteOne({ email: ADMIN_EMAIL });
    console.log('Previous admin user (if any) removed.');

    // Create the new admin user
    const user = new User({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    console.log('✅ New Admin user created successfully!');
    
  } catch (err) {
    console.error('Error during seeding:', err.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedAdminUser();