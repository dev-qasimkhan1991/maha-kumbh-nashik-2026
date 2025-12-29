const express = require('express');
const router = express.Router();
const zoneController = require('../controllers/zoneController');

// Public routes
router.get('/', zoneController.getAllZones);
router.get('/crowd-status/:id', zoneController.getZoneCrowdStatus);
router.get('/:id', zoneController.getZoneById);

// Admin routes
router.post('/', zoneController.createZone);
router.put('/:id', zoneController.updateZone);
router.put('/:id/crowd', zoneController.updateCrowdLevel);
router.delete('/:id', zoneController.deleteZone);

module.exports = router;