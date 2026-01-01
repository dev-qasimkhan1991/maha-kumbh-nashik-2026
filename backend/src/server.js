const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import config
const config = require('./config/env');
const connectDB = require('./config/database');

// Import routes
const eventRoutes = require('./routes/eventRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const attractionRoutes = require('./routes/attractionRoutes');
const locationRoutes = require('./routes/locationRoutes');
const zoneRoutes = require('./routes/zoneRoutes');
const parkingRoutes = require('./routes/parkingRoutes');     // NEW
const washroomRoutes = require('./routes/washroomRoutes');   // NEW

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/accommodations', accommodationRoutes);
app.use('/api/v1/attractions', attractionRoutes);
app.use('/api/v1/locations', locationRoutes);
app.use('/api/v1/zones', zoneRoutes);
app.use('/api/v1/parking', parkingRoutes);              // NEW
app.use('/api/v1/washrooms', washroomRoutes);          // NEW

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: config.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// Start Server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Maha Kumbh Mela 2026 Backend API     ║
╚════════════════════════════════════════╝

✓ Server running on http://localhost:${PORT}
✓ Environment: ${config.NODE_ENV}
✓ MongoDB connected

API Endpoints:
  GET  /api/v1/events
  POST /api/v1/events
  GET  /api/v1/accommodations
  POST /api/v1/accommodations
  GET  /api/v1/attractions
  POST /api/v1/attractions
  GET  /api/v1/locations
  POST /api/v1/locations
  GET  /api/v1/zones
  POST /api/v1/zones
  GET  /api/v1/parking
  POST /api/v1/parking
  GET  /api/v1/washrooms
  POST /api/v1/washrooms

Health Check:
  GET  /api/v1/health
  `);
});