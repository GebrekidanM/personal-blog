const express = require('express');
const router = express.Router();
const About = require('../models/About');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

// ------------------- CREATE / POST -------------------
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, title, description} = req.body;
    const existing = await About.findOne();
    if (existing) {
      return res.status(400).json({ message: "About info already exists. Use PUT to update." });
    }

    const about = new About({
      name,
      title,
      description: description,
      image: req.file ? req.file.path : null
    });

    await about.save();
    res.status(201).json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create About info' });
  }
});

// ------------------- READ / GET -------------------
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: 'No About info found' });
    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ------------------- UPDATE / PUT -------------------
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, title, description} = req.body;
    const updateData = {
      name,
      title,
      description: description,
    };
    if (req.file) updateData.image = req.file.path; // Cloudinary URL

    const about = await About.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!about) return res.status(404).json({ message: 'About info not found' });
    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update About info' });
  }
});

// ------------------- DELETE -------------------
router.delete('/:id', async (req, res) => {
  try {
    const about = await About.findByIdAndDelete(req.params.id);
    if (!about) return res.status(404).json({ message: 'About info not found' });
    res.json({ message: 'About info deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete About info' });
  }
});

module.exports = router;