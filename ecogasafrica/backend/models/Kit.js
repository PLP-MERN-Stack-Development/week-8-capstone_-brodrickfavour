// backend/models/Kit.js
const mongoose = require('mongoose');

const KitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a kit name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative'],
  },
  imageUrl: {
    type: String,
    default: 'no-photo.jpg', // Placeholder
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Kit', KitSchema);