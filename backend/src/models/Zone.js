const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide zone name'],
      trim: true,
      unique: true,
    },
    displayName: String,
    description: String,
    centerLatitude: Number,
    centerLongitude: Number,
    maxCapacity: {
      type: Number,
      required: [true, 'Please provide max capacity'],
      min: 0,
    },
    currentCrowdCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    crowdLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'very high', 'overcrowded'],
      default: 'low',
    },
    facilities: {
      type: [String],
      default: [],
    },
    color: {
      type: String,
      default: '#3388ff',
      match: [/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Please provide valid hex color'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Zone', zoneSchema);