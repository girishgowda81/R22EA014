const express = require("express");
const router = express.Router();

// Example URL shortener route
router.post("/shorten", (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "URL required" });

  const shortId = Math.random().toString(36).substring(2, 8);
  const shortUrl = `http://localhost:5000/${shortId}`;

  // Normally you'd save to DB, here just respond
  res.json({ originalUrl, shortUrl });
});

module.exports = router;
