const Washroom = require('../models/Washroom');

// @desc    Get all washrooms
// @route   GET /api/v1/washrooms
// @access  Public
exports.getAllWashrooms = async (req, res) => {
  try {
    const { type, status, isPublished } = req.query;
    
    let filter = {};
    
    if (type) {
      filter.type = type;
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (isPublished !== undefined) {
      filter.isPublished = isPublished === 'true';
    } else {
      filter.isPublished = true; // Only published washrooms by default
    }

    const washrooms = await Washroom.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      count: washrooms.length,
      data: washrooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single washroom by ID
// @route   GET /api/v1/washrooms/:id
// @access  Public
exports.getWashroomById = async (req, res) => {
  try {
    const washroom = await Washroom.findById(req.params.id);

    if (!washroom) {
      return res.status(404).json({
        success: false,
        message: 'Washroom not found',
      });
    }

    res.json({
      success: true,
      data: washroom,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new washroom
// @route   POST /api/v1/washrooms
// @access  Private (Admin)
exports.createWashroom = async (req, res) => {
  try {
    const washroom = new Washroom(req.body);
    const savedWashroom = await washroom.save();

    res.status(201).json({
      success: true,
      data: savedWashroom,
      message: 'Washroom created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update washroom
// @route   PUT /api/v1/washrooms/:id
// @access  Private (Admin)
exports.updateWashroom = async (req, res) => {
  try {
    const washroom = await Washroom.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!washroom) {
      return res.status(404).json({
        success: false,
        message: 'Washroom not found',
      });
    }

    res.json({
      success: true,
      data: washroom,
      message: 'Washroom updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete washroom
// @route   DELETE /api/v1/washrooms/:id
// @access  Private (Admin)
exports.deleteWashroom = async (req, res) => {
  try {
    const washroom = await Washroom.findByIdAndDelete(req.params.id);

    if (!washroom) {
      return res.status(404).json({
        success: false,
        message: 'Washroom not found',
      });
    }

    res.json({
      success: true,
      message: 'Washroom deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Search washrooms
// @route   GET /api/v1/washrooms/search
// @access  Public
exports.searchWashrooms = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Please provide search query',
      });
    }

    const washrooms = await Washroom.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'location.zone': { $regex: q, $options: 'i' } },
      ],
      isPublished: true,
    });

    res.json({
      success: true,
      count: washrooms.length,
      data: washrooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get washrooms by zone
// @route   GET /api/v1/washrooms/zone/:zoneId
// @access  Public
exports.getWashroomsByZone = async (req, res) => {
  try {
    const washrooms = await Washroom.find({
      'location.zoneId': req.params.zoneId,
      isPublished: true,
    });

    res.json({
      success: true,
      count: washrooms.length,
      data: washrooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get washrooms by type
// @route   GET /api/v1/washrooms/type/:type
// @access  Public
exports.getWashroomsByType = async (req, res) => {
  try {
    const washrooms = await Washroom.find({
      type: req.params.type,
      isPublished: true,
    });

    res.json({
      success: true,
      count: washrooms.length,
      data: washrooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get featured washrooms
// @route   GET /api/v1/washrooms/featured
// @access  Public
exports.getFeaturedWashrooms = async (req, res) => {
  try {
    const washrooms = await Washroom.find({
      isFeatured: true,
      isPublished: true,
    })
      .limit(5)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: washrooms.length,
      data: washrooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};