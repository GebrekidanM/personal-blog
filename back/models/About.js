const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  description: {
    type: [String],
    required: true
  },
  image: {
    type: String
  },
  link: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('About', AboutSchema);
