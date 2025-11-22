import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfiles } from '../services/api';

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    gender: '',
    minAge: '',
    maxAge: '',
    religion: '',
    city: ''
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const data = await getProfiles(filters);
      setProfiles(data);
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProfiles();
  };

  const handleReset = () => {
    setFilters({
      gender: '',
      minAge: '',
      maxAge: '',
      religion: '',
      city: ''
    });
    setTimeout(() => fetchProfiles(), 100);
  };

  if (loading) {
    return <div className="loading">Loading profiles...</div>;
  }

  return (
    <div className="page-container">
      <h1>Find Your Perfect Match</h1>
      
      <div className="filters">
        <h3>Search Filters</h3>
        <form onSubmit={handleSearch}>
          <div className="filters-row">
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="minAge">Min Age</label>
              <input
                type="number"
                id="minAge"
                name="minAge"
                value={filters.minAge}
                onChange={handleFilterChange}
                min="18"
                max="100"
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxAge">Max Age</label>
              <input
                type="number"
                id="maxAge"
                name="maxAge"
                value={filters.maxAge}
                onChange={handleFilterChange}
                min="18"
                max="100"
              />
            </div>
            <div className="form-group">
              <label htmlFor="religion">Religion</label>
              <input
                type="text"
                id="religion"
                name="religion"
                value={filters.religion}
                onChange={handleFilterChange}
                placeholder="e.g., Hindu, Muslim, Christian"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="e.g., Mumbai, Delhi"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            <button type="button" onClick={handleReset} className="btn btn-secondary">
              Reset Filters
            </button>
          </div>
        </form>
      </div>

      {profiles.length === 0 ? (
        <div className="empty-state">
          <h2>No profiles found</h2>
          <p>Try adjusting your search filters or create your profile to get started!</p>
          <Link to="/profile/create" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
            Create Profile
          </Link>
        </div>
      ) : (
        <div className="profiles-grid">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              to={`/profile/${profile.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="profile-card">
                <div className="profile-card-header">
                  <h2>{profile.name}</h2>
                  <p>{profile.age} years old</p>
                </div>
                <div className="profile-card-body">
                  <div className="profile-info">
                    <span className="profile-info-label">Gender:</span>
                    {profile.gender}
                  </div>
                  <div className="profile-info">
                    <span className="profile-info-label">Religion:</span>
                    {profile.religion}
                  </div>
                  <div className="profile-info">
                    <span className="profile-info-label">Education:</span>
                    {profile.education}
                  </div>
                  <div className="profile-info">
                    <span className="profile-info-label">Occupation:</span>
                    {profile.occupation}
                  </div>
                  <div className="profile-info">
                    <span className="profile-info-label">Location:</span>
                    {profile.city}, {profile.state}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
