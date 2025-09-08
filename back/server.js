require('dotenv').config(); 
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Atrsaw Form API is running!');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts')); 
app.use('/api/upload', require('./routes/upload'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
