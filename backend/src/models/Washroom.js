const mongoose = require('mongoose');

const washroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide washroom name'],
      trim: true,
      maxlength: 100,
    },
    type: {
      type: String,
      enum: ['male', 'female', 'mixed', 'handicap', 'family'],
      required: [true, 'Please provide washroom type'],
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    totalUnits: {
      type: Number,
      required: [true, 'Please provide total units'],
      min: 1,
    },
    maleUnits: {
      type: Number,
      default: 0,
      min: 0,
    },
    femaleUnits: {
      type: Number,
      default: 0,
      min: 0,
    },
    handicapUnits: {
      type: Number,
      default: 0,
      min: 0,
    },
    availability: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ['operational', 'closed', 'maintenance'],
      default: 'operational',
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
      zone: String,
      zoneId: mongoose.Schema.Types.ObjectId,
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, 'Please provide valid phone number'],
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email'],
    },
    cleaningSchedule: {
      type: String,
      enum: ['hourly', 'every2hours', 'every3hours', 'every6hours', 'daily'],
      default: 'every2hours',
    },
    lastCleanedAt: {
      type: Date,
    },
    facilities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
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
washroomSchema.index({ type: 1 });
washroomSchema.index({ status: 1 });
washroomSchema.index({ location: '2dsphere' });
washroomSchema.index({ isPublished: 1 });
washroomSchema.index({ 'location.zoneId': 1 });

module.exports = mongoose.model('Washroom', washroomSchema);