const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide accommodation name'],
      trim: true,
      maxlength: 100,
    },
    type: {
      type: String,
      enum: ['hotel', 'lodge', 'hostel', 'camp', 'ashram', 'dharamshala'],
      required: [true, 'Please provide accommodation type'],
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      maxlength: 2000,
    },
    address: {
      type: String,
      required: [true, 'Please provide address'],
    },
    city: {
      type: String,
      default: 'Nashik',
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      match: [/^[0-9]{10}$/, 'Please provide valid phone number'],
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email'],
    },
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
    pricePerNight: {
      type: Number,
      required: [true, 'Please provide price'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    totalRooms: {
      type: Number,
      required: [true, 'Please provide number of rooms'],
      min: 1,
    },
    totalCapacity: {
      type: Number,
      required: [true, 'Please provide total capacity'],
      min: 1,
    },
    amenities: {
      type: [String],
      default: [],
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
accommodationSchema.index({ type: 1 });
accommodationSchema.index({ location: '2dsphere' });
accommodationSchema.index({ pricePerNight: 1 });
accommodationSchema.index({ isPublished: 1 });
accommodationSchema.index({ rating: -1 });

module.exports = mongoose.model('Accommodation', accommodationSchema);