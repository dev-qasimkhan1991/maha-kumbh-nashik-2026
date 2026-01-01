const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

// Public routes
router.get('/', parkingController.getAllParking);
router.get('/search', parkingController.searchParking);
router.get('/featured', parkingController.getFeaturedParking);
router.get('/type/:type', parkingController.getAllParking);
router.get('/zone/:zoneId', parkingController.getParkingByZone);
router.get('/status/:status', parkingController.getParkingByStatus);
router.get('/:id', parkingController.getParkingById);

// Admin routes
router.post('/', parkingController.createParking);
router.put('/:id', parkingController.updateParking);
router.delete('/:id', parkingController.deleteParking);

module.exports = router;