const express = require('express');
const authMiddleware = require('../middleware/auth');
const db = require('../config/database');

const router = express.Router();

// Get all profiles (with optional filters)
router.get('/', (req, res) => {
  try {
    const { gender, minAge, maxAge, religion, city } = req.query;
    
    let profiles;
    if (gender || minAge || maxAge || religion || city) {
      const criteria = {};
      if (gender) criteria.gender = gender;
      if (minAge) criteria.minAge = parseInt(minAge);
      if (maxAge) criteria.maxAge = parseInt(maxAge);
      if (religion) criteria.religion = religion;
      if (city) criteria.city = city;
      
      profiles = db.searchProfiles(criteria);
    } else {
      profiles = db.getAllProfiles();
    }
    
    // Remove sensitive information
    const safeProfiles = profiles.map(profile => {
      const { userId, ...safeProfile } = profile;
      return safeProfile;
    });
    
    res.json(safeProfiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

// Get profile by ID
router.get('/:id', (req, res) => {
  try {
    const profile = db.getProfileById(parseInt(req.params.id));
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    const { userId, ...safeProfile } = profile;
    res.json(safeProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Create profile (authenticated)
router.post('/', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Check if profile already exists for this user
    const existingProfile = db.getProfileByUserId(userId);
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists' });
    }
    
    const profileData = {
      userId,
      ...req.body
    };
    
    const profile = db.createProfile(profileData);
    const { userId: _, ...safeProfile } = profile;
    
    res.status(201).json({
      message: 'Profile created successfully',
      profile: safeProfile
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// Update profile (authenticated)
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const profileId = parseInt(req.params.id);
    const userId = req.user.userId;
    
    const profile = db.getProfileById(profileId);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    if (profile.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this profile' });
    }
    
    const updatedProfile = db.updateProfile(profileId, req.body);
    const { userId: _, ...safeProfile } = updatedProfile;
    
    res.json({
      message: 'Profile updated successfully',
      profile: safeProfile
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get my profile (authenticated)
router.get('/me/profile', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = db.getProfileByUserId(userId);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    const { userId: _, ...safeProfile } = profile;
    res.json(safeProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

module.exports = router;
