const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage });

// @route   POST api/upload
// @desc    Upload an image for a blog post
// @access  Private
router.post('/', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded.' });
    }
    // req.file contains the info from Cloudinary, including the secure URL
    res.json({ imageUrl: req.file.path });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;