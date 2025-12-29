const Accommodation = require('../models/Accommodation');

// @desc    Get all accommodations
// @route   GET /api/v1/accommodations
// @access  Public
exports.getAllAccommodations = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, isPublished } = req.query;

    let filter = {};

    if (type) {
      filter.type = type;
    }

    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = parseInt(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = parseInt(maxPrice);
    }

    if (isPublished !== undefined) {
      filter.isPublished = isPublished === 'true';
    } else {
      filter.isPublished = true;
    }

    const accommodations = await Accommodation.find(filter)
      .sort({ rating: -1 })
      .limit(100);

    res.json({
      success: true,
      count: accommodations.length,
      data: accommodations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get accommodation by ID
// @route   GET /api/v1/accommodations/:id
// @access  Public
exports.getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found',
      });
    }

    res.json({
      success: true,
      data: accommodation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create accommodation
// @route   POST /api/v1/accommodations
// @access  Private (Admin)
exports.createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation(req.body);
    const savedAccommodation = await accommodation.save();

    res.status(201).json({
      success: true,
      data: savedAccommodation,
      message: 'Accommodation created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update accommodation
// @route   PUT /api/v1/accommodations/:id
// @access  Private (Admin)
exports.updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found',
      });
    }

    res.json({
      success: true,
      data: accommodation,
      message: 'Accommodation updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete accommodation
// @route   DELETE /api/v1/accommodations/:id
// @access  Private (Admin)
exports.deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found',
      });
    }

    res.json({
      success: true,
      message: 'Accommodation deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Search accommodations
// @route   GET /api/v1/accommodations/search
// @access  Public
exports.searchAccommodations = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Please provide search query',
      });
    }

    const accommodations = await Accommodation.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { address: { $regex: q, $options: 'i' } },
      ],
      isPublished: true,
    });

    res.json({
      success: true,
      count: accommodations.length,
      data: accommodations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get featured accommodations
// @route   GET /api/v1/accommodations/featured
// @access  Public
exports.getFeaturedAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find({
      isFeatured: true,
      isPublished: true,
    })
      .limit(5)
      .sort({ rating: -1 });

    res.json({
      success: true,
      count: accommodations.length,
      data: accommodations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get accommodations by type
// @route   GET /api/v1/accommodations/type/:type
// @access  Public
exports.getAccommodationsByType = async (req, res) => {
  try {
    const accommodations = await Accommodation.find({
      type: req.params.type,
      isPublished: true,
    }).sort({ rating: -1 });

    res.json({
      success: true,
      count: accommodations.length,
      data: accommodations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};