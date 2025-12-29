const Attraction = require('../models/Attraction');

// Get all attractions
exports.getAllAttractions = async (req, res) => {
  try {
    const { category, isPublished } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (isPublished !== undefined) {
      filter.isPublished = isPublished === 'true';
    } else {
      filter.isPublished = true;
    }

    const attractions = await Attraction.find(filter)
      .sort({ rating: -1 })
      .limit(100);

    res.json({
      success: true,
      count: attractions.length,
      data: attractions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single attraction
exports.getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);

    if (!attraction) {
      return res.status(404).json({
        success: false,
        message: 'Attraction not found',
      });
    }

    res.json({
      success: true,
      data: attraction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create attraction
exports.createAttraction = async (req, res) => {
  try {
    const attraction = new Attraction(req.body);
    const savedAttraction = await attraction.save();

    res.status(201).json({
      success: true,
      data: savedAttraction,
      message: 'Attraction created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update attraction
exports.updateAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!attraction) {
      return res.status(404).json({
        success: false,
        message: 'Attraction not found',
      });
    }

    res.json({
      success: true,
      data: attraction,
      message: 'Attraction updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete attraction
exports.deleteAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndDelete(req.params.id);

    if (!attraction) {
      return res.status(404).json({
        success: false,
        message: 'Attraction not found',
      });
    }

    res.json({
      success: true,
      message: 'Attraction deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search attractions
exports.searchAttractions = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Please provide search query',
      });
    }

    const attractions = await Attraction.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
      isPublished: true,
    });

    res.json({
      success: true,
      count: attractions.length,
      data: attractions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get featured attractions
exports.getFeaturedAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find({
      isFeatured: true,
      isPublished: true,
    })
      .limit(5)
      .sort({ rating: -1 });

    res.json({
      success: true,
      count: attractions.length,
      data: attractions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get attractions by category
exports.getAttractionsByCategory = async (req, res) => {
  try {
    const attractions = await Attraction.find({
      category: req.params.category,
      isPublished: true,
    }).sort({ rating: -1 });

    res.json({
      success: true,
      count: attractions.length,
      data: attractions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};