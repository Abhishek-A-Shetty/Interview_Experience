const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Google OAuth Setup
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Required for Passport authentication flow
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback Route (Uses Cookies for Token)
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ id: user._id, googleId: user.googleId, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set JWT token in HTTP-Only cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // Secure in production
      sameSite: "Strict",
    });

    res.redirect("http://localhost:3000/dashboard");
  })(req, res, next);
});

// Logout Route - Clears token from cookies
router.get("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: false });
  res.json({ message: "Logged out successfully" });
});

// Delete Account Route - Requires authentication
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ googleId: req.user.googleId });
    res.clearCookie("token", { httpOnly: true, secure: false });

    res.json({ message: "Account deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account", error: error.message });
  }
});

// Get Authenticated User - Requires authentication
router.get("/user", authMiddleware, (req, res) => {
  res.json({ user: req.user }); // Return user data from the decoded JWT
});

module.exports = router; //  Single module export
