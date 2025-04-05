const express = require("express");
const Experience = require("../models/experience");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * GET all experiences (Public) - with filters & pagination
 */
router.get("/", async (req, res) => {
  const { role, companyName, graduationYear, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (role) filter.role = role;
  if (companyName) filter.companyName = new RegExp(companyName, "i"); // Case-insensitive search
  if (graduationYear) filter.graduationYear = parseInt(graduationYear, 10) || undefined;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  if (pageNum < 1 || limitNum < 1) {
    return res.status(400).json({ message: "Invalid pagination parameters" });
  }

  try {
    const experiences = await Experience.find(filter)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

/**
 * GET experiences by a specific user (Public)
 */


/**
 * GET logged-in user's experiences (Private)
 */
router.get("/my-experiences", authMiddleware, async (req, res) => {
  try {
    if (!req.user.googleId) {
      return res.status(401).json({ message: "Unauthorized: Google ID missing" });
    }

    const userExperiences = await Experience.find({ googleId: req.user.googleId }).sort({ createdAt: -1 });

    res.json(userExperiences);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user experiences", error: err.message });
  }
});

/**
 * POST a new experience (Private)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, education, collegeName, graduationYear, interviewDate, interviewExperience, role, companyName } = req.body;

    if (!name || !education || !graduationYear || !interviewDate || !interviewExperience || !role || !companyName) {
      return res.status(400).json({ message: "All required fields must be filled!" });
    }

    const newExperience = new Experience({
      googleId: req.user.googleId, // Get googleId securely from authenticated user
      name,
      education,
      collegeName,
      graduationYear: parseInt(graduationYear, 10),
      interviewDate,
      interviewExperience,
      role,
      companyName,
    });

    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(500).json({ message: "Error saving experience", error: err.message });
  }
});

/**
 * UPDATE an experience by ID (Only the owner can update)
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (!req.user.googleId) {
      return res.status(401).json({ message: "Unauthorized: Google ID missing" });
    }

    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (experience.googleId.toString() !== req.user.googleId.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this experience" });
    }

    const { interviewExperience, role, companyName } = req.body;
    if (interviewExperience) experience.interviewExperience = interviewExperience;
    if (role) experience.role = role;
    if (companyName) experience.companyName = companyName;

    await experience.save();
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: "Error updating experience", error: err.message });
  }
});

/**
 * DELETE an experience by ID (Only the owner can delete)
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.googleId) {
      return res.status(401).json({ message: "Unauthorized: Google ID missing" });
    }

    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Ensure only the owner can delete their experience
    if (experience.googleId !== req.user.googleId) {
      return res.status(403).json({ message: "Unauthorized to delete this experience" });
    }

    await experience.deleteOne();
    res.json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting experience", error: err.message });
  }
});



module.exports = router;
