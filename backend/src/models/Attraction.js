const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide attraction name'],
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      enum: ['religious', 'historical', 'scenic', 'museum', 'natural', 'monument'],
      required: [true, 'Please provide category'],
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      maxlength: 2000,
    },
    history: {
      type: String,
      maxlength: 3000,
    },
    mythology: {
      type: String,
      maxlength: 3000,
    },
    culturalSignificance: {
      type: String,
      maxlength: 2000,
    },
    address: {
      type: String,
      required: [true, 'Please provide address'],
    },
    phone: String,
    email: String,
    website: String,
    location: {
      latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
      },
    },
    openingHours: {
      open: String,
      close: String,
    },
    entryFee: {
      adult: Number,
      child: Number,
      senior: Number,
      currency: {
        type: String,
        default: 'INR',
      },
    },
    bestTimeToVisit: String,
    estimatedDuration: {
      type: Number,
      default: 60,
    },
    crowdLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'very high'],
      default: 'medium',
    },
    facilities: {
      type: [String],
      default: [],
    },
    accessibility: {
      wheelchair: Boolean,
      parking: Boolean,
      restrooms: Boolean,
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for faster queries
attractionSchema.index({ category: 1 });
attractionSchema.index({ location: '2dsphere' });
attractionSchema.index({ isPublished: 1 });
attractionSchema.index({ rating: -1 });

module.exports = mongoose.model('Attraction', attractionSchema);