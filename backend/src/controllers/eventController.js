const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/v1/events
// @access  Public
exports.getAllEvents = async (req, res) => {
  try {
    const { category, isPublished } = req.query;
    
    let filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (isPublished !== undefined) {
      filter.isPublished = isPublished === 'true';
    } else {
      filter.isPublished = true; // Only published events by default
    }

    const events = await Event.find(filter)
      .sort({ date: 1 })
      .limit(100);

    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single event by ID
// @route   GET /api/v1/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new event
// @route   POST /api/v1/events
// @access  Private (Admin)
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();

    res.status(201).json({
      success: true,
      data: savedEvent,
      message: 'Event created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update event
// @route   PUT /api/v1/events/:id
// @access  Private (Admin)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.json({
      success: true,
      data: event,
      message: 'Event updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/v1/events/:id
// @access  Private (Admin)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Search events
// @route   GET /api/v1/events/search
// @access  Public
exports.searchEvents = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Please provide search query',
      });
    }

    const events = await Event.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
      isPublished: true,
    });

    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Filter events by date range
// @route   GET /api/v1/events/filter/by-date
// @access  Public
exports.filterEventsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide startDate and endDate',
      });
    }

    const events = await Event.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      isPublished: true,
    }).sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get featured events
// @route   GET /api/v1/events/featured
// @access  Public
exports.getFeaturedEvents = async (req, res) => {
  try {
    const events = await Event.find({
      isFeatured: true,
      isPublished: true,
    })
      .limit(5)
      .sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};