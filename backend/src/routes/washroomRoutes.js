const express = require('express');
const router = express.Router();
const washroomController = require('../controllers/washroomController');

// Public routes
router.get('/', washroomController.getAllWashrooms);
router.get('/search', washroomController.searchWashrooms);
router.get('/featured', washroomController.getFeaturedWashrooms);
router.get('/type/:type', washroomController.getWashroomsByType);
router.get('/zone/:zoneId', washroomController.getWashroomsByZone);
router.get('/:id', washroomController.getWashroomById);

// Admin routes
router.post('/', washroomController.createWashroom);
router.put('/:id', washroomController.updateWashroom);
router.delete('/:id', washroomController.deleteWashroom);

module.exports = router;