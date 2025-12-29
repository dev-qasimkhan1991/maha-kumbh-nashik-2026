const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Please provide event description'],
      maxlength: 2000,
    },
    date: {
      type: Date,
      required: [true, 'Please provide event date'],
    },
    time: {
      type: String,
      required: [true, 'Please provide event time'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time (HH:MM)'],
    },
    category: {
      type: String,
      enum: ['ritual', 'cultural', 'sport', 'ceremony', 'other'],
      default: 'other',
    },
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
      address: String,
      zoneId: mongoose.Schema.Types.ObjectId,
    },
    capacity: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
      default: 'scheduled',
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
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ isPublished: 1 });
eventSchema.index({ 'location.zoneId': 1 });

module.exports = mongoose.model('Event', eventSchema);