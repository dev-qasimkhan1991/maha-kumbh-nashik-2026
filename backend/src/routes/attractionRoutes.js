const express = require('express');
const router = express.Router();
const attractionController = require('../controllers/attractionController');

// Public routes
router.get('/', attractionController.getAllAttractions);
router.get('/search', attractionController.searchAttractions);
router.get('/featured', attractionController.getFeaturedAttractions);
router.get('/category/:category', attractionController.getAttractionsByCategory);
router.get('/:id', attractionController.getAttractionById);

// Admin routes
router.post('/', attractionController.createAttraction);
router.put('/:id', attractionController.updateAttraction);
router.delete('/:id', attractionController.deleteAttraction);

module.exports = router;