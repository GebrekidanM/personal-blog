const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

// --- PUBLIC ROUTES (Anyone can access these) ---

// @route   GET api/posts
// @desc    Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ publishedAt: -1 }); // Get newest first
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:slug
// @desc    Get a single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/by-id/:id
// @desc    Get a single post by its ID (for the edit page)
router.get('/by-id/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// --- PRIVATE / PROTECTED ROUTES (Only a logged-in user can access) ---

// @route   POST api/posts
// @desc    Create a new post
router.post('/', auth, async (req, res) => {
  const { title, slug, excerpt, content, featuredImageUrl, category } = req.body;
  try {
    const newPost = new Post({
      title,
      slug,
      excerpt,
      content,
      featuredImageUrl,
      category,
      author: req.user.id,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/:id
// @desc    Update a post
router.put('/:id', auth, async (req, res) => {

    let post = await Post.findById(req.params.id);
  // Logic to update a post
  try {
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    
    // Check user
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    post = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/posts/:id
// @desc    Delete a post
router.delete('/:id', auth, async (req, res) => {

  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // Check user
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;