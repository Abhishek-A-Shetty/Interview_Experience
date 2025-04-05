const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, trim: true }, // Store Google ID from session
    name: { type: String, required: true, trim: true },
    education: { type: String, required: true, trim: true }, // Added education field
    collegeName: { type: String, trim: true }, // Made optional
    graduationYear: { type: Number, required: true },
    interviewDate: { type: Date, required: true }, // Store full date
    interviewExperience: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Experience", experienceSchema);

