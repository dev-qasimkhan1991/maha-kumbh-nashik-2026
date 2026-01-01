const Parking = require('../models/Parking');

// @desc    Get all parking
// @route   GET /api/v1/parking
// @access  Public
exports.getAllParking = async (req, res) => {
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
      filter.isPublished = true; // Only published parking by default
    }

    const parking = await Parking.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      count: parking.length,
      data: parking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single parking by ID
// @route   GET /api/v1/parking/:id
// @access  Public
exports.getParkingById = async (req, res) => {
  try {
    const parking = await Parking.findById(req.params.id);

    if (!parking) {
      return res.status(404).json({
        success: false,
        message: 'Parking not found',
      });
    }

    res.json({
      success: true,
      data: parking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new parking
// @route   POST /api/v1/parking
// @access  Private (Admin)
exports.createParking = async (req, res) => {
  try {
    const parking = new Parking(req.body);
    const savedParking = await parking.save();

    res.status(201).json({
      success: true,
      data: savedParking,
      message: 'Parking created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update parking
// @route   PUT /api/v1/parking/:id
// @access  Private (Admin)
exports.updateParking = async (req, res) => {
  try {
    const parking = await Parking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!parking) {
      return res.status(404).json({
        success: false,
        message: 'Parking not found',
      });
    }

    res.json({
      success: true,
      data: parking,
      message: 'Parking updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete parking
// @route   DELETE /api/v1/parking/:id
// @access  Private (Admin)
exports.deleteParking = async (req, res) => {
  try {
    const parking = await Parking.findByIdAndDelete(req.params.id);

    if (!parking) {
      return res.status(404).json({
        success: false,
        message: 'Parking not found',
      });
    }

    res.json({
      success: true,
      message: 'Parking deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Search parking
// @route   GET /api/v1/parking/search
// @access  Public
exports.searchParking = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Please provide search query',
      });
    }

    const parking = await Parking.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'location.zone': { $regex: q, $options: 'i' } },
      ],
      isPublished: true,
    });

    res.json({
      success: true,
      count: parking.length,
      data: parking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get parking by zone
// @route   GET /api/v1/parking/zone/:zoneId
// @access  Public
exports.getParkingByZone = async (req, res) => {
  try {
    const parking = await Parking.find({
      'location.zoneId': req.params.zoneId,
      isPublished: true,
    });

    res.json({
      success: true,
      count: parking.length,
      data: parking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get parking by status
// @route   GET /api/v1/parking/status/:status
// @access  Public
exports.getParkingByStatus = async (req, res) => {
  try {
    const parking = await Parking.find({
      status: req.params.status,
      isPublished: true,
    });

    res.json({
      success: true,
      count: parking.length,
      data: parking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get featured parking
// @route   GET /api/v1/parking/featured
// @access  Public
exports.getFeaturedParking = async (req, res) => {
  try {
    const parking = await Parking.find({
      isFeatured: true,
      isPublished: true,
    })
      .limit(5)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: parking.length,
      data: parking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};