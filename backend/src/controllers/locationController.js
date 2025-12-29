const Location = require('../models/Location');

// Get all locations
exports.getAllLocations = async (req, res) => {
  try {
    const { type, zoneId } = req.query;

    let filter = {};

    if (type) {
      filter.type = type;
    }

    if (zoneId) {
      filter.zoneId = zoneId;
    }

    const locations = await Location.find(filter);

    res.json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get location by ID
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

    res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create location
exports.createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    const savedLocation = await location.save();

    res.status(201).json({
      success: true,
      data: savedLocation,
      message: 'Location created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update location
exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

    res.json({
      success: true,
      data: location,
      message: 'Location updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete location
exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

    res.json({
      success: true,
      message: 'Location deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get locations by type
exports.getLocationsByType = async (req, res) => {
  try {
    const locations = await Location.find({
      type: req.params.type,
    });

    res.json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get locations by radius
exports.getLocationsByRadius = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude',
      });
    }

    const locations = await Location.find({
      latitude: {
        $gte: parseFloat(latitude) - parseFloat(radius) / 111,
        $lte: parseFloat(latitude) + parseFloat(radius) / 111,
      },
      longitude: {
        $gte: parseFloat(longitude) - parseFloat(radius) / 111,
        $lte: parseFloat(longitude) + parseFloat(radius) / 111,
      },
    });

    res.json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search locations
exports.searchLocations = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Please provide search query',
      });
    }

    const locations = await Location.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { address: { $regex: q, $options: 'i' } },
      ],
    });

    res.json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};