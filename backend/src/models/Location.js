const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide location name"],
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "event",
        "accommodation",
        "attraction",
        "parking",
        "washroom",
        "emergency",
      ], // Add them here
      required: [true, "Please provide location type"],
    },
    latitude: {
      type: Number,
      required: [true, "Please provide latitude"],
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: [true, "Please provide longitude"],
      min: -180,
      max: 180,
    },
    address: String,
    phone: String,
    email: String,
    zoneId: mongoose.Schema.Types.ObjectId,
    relatedEntityId: mongoose.Schema.Types.ObjectId,
    relatedEntityType: String,
    description: String,
    markerIcon: {
      type: String,
      default: "default",
    },
    markerColor: {
      type: String,
      default: "#3388ff",
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

// Index for geographic queries
locationSchema.index({ latitude: 1, longitude: 1 });
locationSchema.index({ type: 1 });
locationSchema.index({ zoneId: 1 });

module.exports = mongoose.model("Location", locationSchema);
