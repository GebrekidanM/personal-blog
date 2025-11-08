// models/Hero.js
const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
  title: String,           
  subtitle: String,
  description: String, 
  primaryButtonText: String,  
  primaryButtonLink: String,  
  secondaryButtonText: String, 
  secondaryButtonLink: String, 
  image: String               
}, { timestamps: true });

module.exports = mongoose.model('Hero', HeroSchema);
