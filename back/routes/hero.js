// routes/hero.js
const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

// 🟢 GET hero section data
router.get('/', async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({ createdAt: -1 });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 🟢 POST or PUT hero (create or update)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, description,primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink } = req.body;

    const heroData = {
      title,
      subtitle,
      description,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink
    };

    if (req.file) {
      heroData.image = req.file.path;
    }

    let hero = await Hero.findOne();
    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, heroData, { new: true });
    } else {
      hero = new Hero(heroData);
      await hero.save();
    }

    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔴 DELETE hero
router.delete('/:id', async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hero deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
    } = req.body;

    let imageUrl;
    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: 'hero_section',
      });
      imageUrl = uploadRes.secure_url;
    }

    let hero = await Hero.findOne();
    if (hero) {
      hero.title = title;
      hero.subtitle = subtitle;
      hero.description = description;
      hero.primaryButtonText = primaryButtonText;
      hero.primaryButtonLink = primaryButtonLink;
      hero.secondaryButtonText = secondaryButtonText;
      hero.secondaryButtonLink = secondaryButtonLink;
      if (imageUrl) hero.image = imageUrl;
      await hero.save();
    } else {
      hero = await Hero.create({
        title,
        subtitle,
        description,
        image: imageUrl,
        primaryButtonText,
        primaryButtonLink,
        secondaryButtonText,
        secondaryButtonLink,
      });
    }

    res.status(200).json(hero);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update hero section' });
  }
})

module.exports = router;
