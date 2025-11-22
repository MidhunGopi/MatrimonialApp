const express = require('express');
const authMiddleware = require('../middleware/auth');
const db = require('../config/database');

const router = express.Router();

// Get matches for current user
router.get('/', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    const matches = db.getMatchesByUserId(userId);
    
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Create a match request
router.post('/', authMiddleware, (req, res) => {
  try {
    const userId1 = req.user.userId;
    const { profileId } = req.body;
    
    if (!profileId) {
      return res.status(400).json({ error: 'Profile ID is required' });
    }
    
    const targetProfile = db.getProfileById(profileId);
    if (!targetProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    const match = db.createMatch({
      userId1,
      userId2: targetProfile.userId,
      profileId,
      status: 'pending'
    });
    
    res.status(201).json({
      message: 'Match request sent successfully',
      match
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create match' });
  }
});

module.exports = router;
