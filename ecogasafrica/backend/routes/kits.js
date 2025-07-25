// backend/routes/kits.js
const express = require('express');
const { getKits, getKitById, createKit, updateKit, deleteKit } = require('../controllers/kitController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // For image uploads

const router = express.Router();

router.route('/')
  .get(getKits)
  .post(protect, admin, upload.single('image'), createKit); // Admin only, with image upload

router.route('/:id')
  .get(getKitById)
  .put(protect, admin, upload.single('image'), updateKit) // Admin only, with image update
  .delete(protect, admin, deleteKit); // Admin only

module.exports = router;