// backend/controllers/kitController.js
const Kit = require('../models/Kit');

// @desc    Get all kits
// @route   GET /api/kits
// @access  Public
exports.getKits = async (req, res) => {
  try {
    const kits = await Kit.find({});
    res.json(kits);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single kit
// @route   GET /api/kits/:id
// @access  Public
exports.getKitById = async (req, res) => {
  try {
    const kit = await Kit.findById(req.params.id);
    if (kit) {
      res.json(kit);
    } else {
      res.status(404).json({ message: 'Kit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a kit
// @route   POST /api/kits
// @access  Private/Admin
exports.createKit = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    const kit = new Kit({
      name,
      description,
      price,
      imageUrl,
    });
    const createdKit = await kit.save();
    res.status(201).json(createdKit);
  } catch (error) {
    res.status(400).json({ message: 'Invalid kit data', error: error.message });
  }
};

// @desc    Update a kit
// @route   PUT /api/kits/:id
// @access  Private/Admin
exports.updateKit = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    const kit = await Kit.findById(req.params.id);

    if (kit) {
      kit.name = name || kit.name;
      kit.description = description || kit.description;
      kit.price = price || kit.price;
      kit.imageUrl = imageUrl || kit.imageUrl;

      const updatedKit = await kit.save();
      res.json(updatedKit);
    } else {
      res.status(404).json({ message: 'Kit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a kit
// @route   DELETE /api/kits/:id
// @access  Private/Admin
exports.deleteKit = async (req, res) => {
  try {
    const kit = await Kit.findById(req.params.id);

    if (kit) {
      await Kit.deleteOne({ _id: req.params.id }); // Use deleteOne
      res.json({ message: 'Kit removed' });
    } else {
      res.status(404).json({ message: 'Kit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};