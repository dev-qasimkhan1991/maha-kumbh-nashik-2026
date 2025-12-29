const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController');

// Public routes
router.get('/', accommodationController.getAllAccommodations);
router.get('/search', accommodationController.searchAccommodations);
router.get('/featured', accommodationController.getFeaturedAccommodations);
router.get('/type/:type', accommodationController.getAccommodationsByType);
router.get('/:id', accommodationController.getAccommodationById);

// Admin routes
router.post('/', accommodationController.createAccommodation);
router.put('/:id', accommodationController.updateAccommodation);
router.delete('/:id', accommodationController.deleteAccommodation);

module.exports = router;