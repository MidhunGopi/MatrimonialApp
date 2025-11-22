import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from '../services/api';

function MyProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getMyProfile();
      setProfile(data);
    } catch (error) {
      if (error.response?.status === 404) {
        // Profile doesn't exist, redirect to create
        navigate('/profile/create');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading your profile...</div>;
  }

  if (!profile) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>You haven't created a profile yet</h2>
          <button onClick={() => navigate('/profile/create')} className="btn btn-primary">
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>My Profile</h1>
        
        <div className="card">
          <div style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)', color: 'white', padding: '30px', borderRadius: '10px 10px 0 0', marginBottom: '20px' }}>
            <h2 style={{ color: 'white', margin: 0 }}>{profile.name}</h2>
            <p style={{ fontSize: '18px', marginTop: '10px' }}>{profile.age} years old • {profile.gender}</p>
          </div>

          <div style={{ padding: '20px' }}>
            <h3>Basic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
              <div>
                <strong>Religion:</strong> {profile.religion}
              </div>
              <div>
                <strong>Caste:</strong> {profile.caste || 'Not specified'}
              </div>
              <div>
                <strong>Marital Status:</strong> {profile.maritalStatus}
              </div>
              <div>
                <strong>Height:</strong> {profile.height ? `${profile.height} cm` : 'Not specified'}
              </div>
            </div>

            <h3>Professional Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
              <div>
                <strong>Education:</strong> {profile.education}
              </div>
              <div>
                <strong>Occupation:</strong> {profile.occupation}
              </div>
              <div>
                <strong>Annual Income:</strong> {profile.income || 'Not specified'}
              </div>
            </div>

            <h3>Location</h3>
            <div style={{ marginBottom: '30px' }}>
              <p>{profile.city}, {profile.state}, {profile.country}</p>
            </div>

            {profile.aboutMe && (
              <>
                <h3>About Me</h3>
                <p style={{ lineHeight: '1.6', marginBottom: '30px' }}>{profile.aboutMe}</p>
              </>
            )}

            {profile.hobbies && (
              <>
                <h3>Hobbies & Interests</h3>
                <p style={{ marginBottom: '30px' }}>{profile.hobbies}</p>
              </>
            )}

            {profile.expectations && (
              <>
                <h3>Partner Expectations</h3>
                <p style={{ lineHeight: '1.6', marginBottom: '30px' }}>{profile.expectations}</p>
              </>
            )}

            <div style={{ marginTop: '20px', padding: '15px', background: 'var(--background)', borderRadius: '5px' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                <strong>Note:</strong> Profile editing will be available in future updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
