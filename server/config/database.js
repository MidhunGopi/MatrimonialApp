// In-memory database for demonstration
// In production, use MongoDB, PostgreSQL, or other databases

class Database {
  constructor() {
    this.users = [];
    this.profiles = [];
    this.matches = [];
    this.nextUserId = 1;
    this.nextProfileId = 1;
    this.nextMatchId = 1;
  }

  // User operations
  createUser(userData) {
    const user = {
      id: this.nextUserId++,
      ...userData,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  getUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  // Profile operations
  createProfile(profileData) {
    const profile = {
      id: this.nextProfileId++,
      ...profileData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.profiles.push(profile);
    return profile;
  }

  getProfileById(id) {
    return this.profiles.find(profile => profile.id === id);
  }

  getProfileByUserId(userId) {
    return this.profiles.find(profile => profile.userId === userId);
  }

  getAllProfiles() {
    return this.profiles;
  }

  updateProfile(id, updates) {
    const index = this.profiles.findIndex(profile => profile.id === id);
    if (index !== -1) {
      this.profiles[index] = {
        ...this.profiles[index],
        ...updates,
        updatedAt: new Date()
      };
      return this.profiles[index];
    }
    return null;
  }

  searchProfiles(criteria) {
    return this.profiles.filter(profile => {
      let matches = true;
      
      if (criteria.gender && profile.gender !== criteria.gender) {
        matches = false;
      }
      
      if (criteria.minAge && profile.age < criteria.minAge) {
        matches = false;
      }
      
      if (criteria.maxAge && profile.age > criteria.maxAge) {
        matches = false;
      }
      
      if (criteria.religion && profile.religion && profile.religion.toLowerCase() !== criteria.religion.toLowerCase()) {
        matches = false;
      }
      
      if (criteria.city && profile.city && profile.city.toLowerCase() !== criteria.city.toLowerCase()) {
        matches = false;
      }
      
      return matches;
    });
  }

  // Match operations
  createMatch(matchData) {
    const match = {
      id: this.nextMatchId++,
      ...matchData,
      createdAt: new Date()
    };
    this.matches.push(match);
    return match;
  }

  getMatchesByUserId(userId) {
    return this.matches.filter(match => 
      match.userId1 === userId || match.userId2 === userId
    );
  }
}

const db = new Database();

module.exports = db;
