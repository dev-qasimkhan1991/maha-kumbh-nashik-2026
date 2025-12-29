const Zone = require('../models/Zone');

// Get all zones
exports.getAllZones = async (req, res) => {
  try {
    const zones = await Zone.find();

    res.json({
      success: true,
      count: zones.length,
      data: zones,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get zone by ID
exports.getZoneById = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found',
      });
    }

    res.json({
      success: true,
      data: zone,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create zone
exports.createZone = async (req, res) => {
  try {
    const zone = new Zone(req.body);
    const savedZone = await zone.save();

    res.status(201).json({
      success: true,
      data: savedZone,
      message: 'Zone created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update zone
exports.updateZone = async (req, res) => {
  try {
    const zone = await Zone.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found',
      });
    }

    res.json({
      success: true,
      data: zone,
      message: 'Zone updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete zone
exports.deleteZone = async (req, res) => {
  try {
    const zone = await Zone.findByIdAndDelete(req.params.id);

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found',
      });
    }

    res.json({
      success: true,
      message: 'Zone deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update crowd level
exports.updateCrowdLevel = async (req, res) => {
  try {
    const { currentCrowdCount } = req.body;
    const zone = await Zone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found',
      });
    }

    zone.currentCrowdCount = currentCrowdCount;
    
    // Calculate crowd level percentage
    const crowdPercentage = (currentCrowdCount / zone.maxCapacity) * 100;
    
    if (crowdPercentage >= 100) {
      zone.crowdLevel = 'overcrowded';
    } else if (crowdPercentage >= 80) {
      zone.crowdLevel = 'very high';
    } else if (crowdPercentage >= 60) {
      zone.crowdLevel = 'high';
    } else if (crowdPercentage >= 40) {
      zone.crowdLevel = 'medium';
    } else {
      zone.crowdLevel = 'low';
    }

    const updatedZone = await zone.save();

    res.json({
      success: true,
      data: updatedZone,
      message: 'Crowd level updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get zone crowd status
exports.getZoneCrowdStatus = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found',
      });
    }

    const crowdPercentage = (zone.currentCrowdCount / zone.maxCapacity) * 100;

    res.json({
      success: true,
      data: {
        zoneName: zone.name,
        currentCrowdCount: zone.currentCrowdCount,
        maxCapacity: zone.maxCapacity,
        crowdPercentage: crowdPercentage.toFixed(2),
        crowdLevel: zone.crowdLevel,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};