// backend/routes/contact.js
const express = require('express');
const { submitContactForm, getContactMessages, deleteContactMessage } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(submitContactForm)
  .get(protect, admin, getContactMessages); // Admin only to view messages

router.route('/:id')
  .delete(protect, admin, deleteContactMessage); // Admin only to delete messages

module.exports = router;