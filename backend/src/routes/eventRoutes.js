const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/search', eventController.searchEvents);
router.get('/filter/by-date', eventController.filterEventsByDate);
router.get('/featured', eventController.getFeaturedEvents);
router.get('/:id', eventController.getEventById);

// Admin routes
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;