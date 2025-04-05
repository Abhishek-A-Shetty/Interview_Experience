const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, required: true, trim: true }, // Google OAuth ID
    email: { type: String, unique: true, required: true, trim: true }, // Ensures unique email
    name: { type: String, required: true, trim: true }, // User's full name
  },
  { timestamps: true } // Tracks user creation & updates
);

module.exports = mongoose.model("User", userSchema);

