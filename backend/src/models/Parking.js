const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide parking name'],
      trim: true,
      maxlength: 100,
    },
    type: {
      type: String,
      enum: ['paid', 'free', 'valet', 'handicap', 'bike'],
      required: [true, 'Please provide parking type'],
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    totalSpaces: {
      type: Number,
      required: [true, 'Please provide total spaces'],
      min: 1,
    },
    availableSpaces: {
      type: Number,
      required: [true, 'Please provide available spaces'],
      min: 0,
    },
    handicapSpaces: {
      type: Number,
      default: 0,
      min: 0,
    },
    hourlyRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['available', 'full', 'closed', 'maintenance'],
      default: 'available',
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
parkingSchema.index({ type: 1 });
parkingSchema.index({ status: 1 });
parkingSchema.index({ location: '2dsphere' });
parkingSchema.index({ isPublished: 1 });
parkingSchema.index({ 'location.zoneId': 1 });

module.exports = mongoose.model('Parking', parkingSchema);