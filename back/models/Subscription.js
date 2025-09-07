const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // No duplicate emails
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('subscription', SubscriptionSchema);