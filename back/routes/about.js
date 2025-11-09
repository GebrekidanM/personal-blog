const express = require('express');
const router = express.Router();
const About = require('../models/About');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


// ------------------- CREATE or UPDATE -------------------
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, title, description } = req.body;

    // ✅ Check if About info already exists
    const existing = await About.findOne();

    const updateData = {
      ...(name && { name: name.trim() }),
      ...(title && { title: title.trim() }),
      ...(description && { description: description.trim() }),
      ...(req.file && { image: req.file.path }),
    };

    if (existing) {
      // ✅ Update existing About info
      const updatedAbout = await About.findByIdAndUpdate(
        existing._id,
        updateData,
        { new: true, runValidators: true }
      );

      return res.json({
        message: "About info updated successfully",
        about: updatedAbout,
      });
    } else {
      // ✅ Create new About info
      const newAbout = new About(updateData);
      await newAbout.save();

      return res.status(201).json({
        message: "About info created successfully",
        about: newAbout,
      });
    }
  } catch (err) {
    console.error("❌ Error saving About info:", err);
    res.status(500).json({ message: "Failed to save About info" });
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