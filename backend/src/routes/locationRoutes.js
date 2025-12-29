const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Public routes
router.get('/', locationController.getAllLocations);
router.get('/search', locationController.searchLocations);
router.get('/type/:type', locationController.getLocationsByType);
router.get('/nearby', locationController.getLocationsByRadius);
router.get('/:id', locationController.getLocationById);

// Admin routes
router.post('/', locationController.createLocation);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;