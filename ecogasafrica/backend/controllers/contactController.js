// backend/controllers/contactController.js
const Contact = require('../models/Contact');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = await Contact.create({
      name,
      email,
      message,
    });
    res.status(201).json({ message: 'Message sent successfully!', contact: newContact });
  } catch (error) {
    res.status(400).json({ message: 'Error sending message', error: error.message });
  }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a contact message (Admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContactMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (message) {
      await Contact.deleteOne({ _id: req.params.id });
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};