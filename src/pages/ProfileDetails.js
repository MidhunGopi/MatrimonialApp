import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileById, sendMatchRequest } from '../services/api';

function ProfileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfileById(id);
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setMessage('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async () => {
    try {
      setSending(true);
      await sendMatchRequest(parseInt(id, 10));
      setMessage('Interest sent successfully!');
    } catch (error) {
      setMessage('Failed to send interest. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!profile) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Profile not found</h2>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ marginBottom: '20px' }}>
          ← Back to Search
        </button>
        
        <div className="card">
          <div style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)', color: 'white', padding: '30px', borderRadius: '10px 10px 0 0', marginBottom: '20px' }}>
            <h1 style={{ color: 'white', margin: 0 }}>{profile.name}</h1>
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

            {message && (
              <div className={message.includes('success') ? 'success' : 'error'} style={{ marginBottom: '20px' }}>
                {message}
              </div>
            )}

            <button
              onClick={handleSendRequest}
              className="btn btn-primary"
              disabled={sending}
              style={{ width: '100%' }}
            >
              {sending ? 'Sending...' : 'Send Interest'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
