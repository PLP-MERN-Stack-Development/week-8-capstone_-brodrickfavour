// backend/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  imageUrl: {
    type: String,
    default: 'no-photo.jpg', // Placeholder
  },
  author: { // Optional: to link to a User
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false, // Set to true if posts must be linked to a user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);