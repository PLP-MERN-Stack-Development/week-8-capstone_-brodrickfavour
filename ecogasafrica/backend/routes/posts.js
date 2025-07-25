// backend/routes/posts.js
const express = require('express');
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // For image uploads

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, admin, upload.single('image'), createPost); // Admin only, with image upload

router.route('/:id')
  .get(getPostById)
  .put(protect, admin, upload.single('image'), updatePost) // Admin only, with image update
  .delete(protect, admin, deletePost); // Admin only

module.exports = router;