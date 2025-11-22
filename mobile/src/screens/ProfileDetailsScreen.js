import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getProfileById, sendMatchRequest} from '../services/api';
import {COLORS} from '../App';

function ProfileDetailsScreen({route, navigation}) {
  const {profileId} = route.params;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [profileId]);

  const fetchProfile = async () => {
    try {
      const data = await getProfileById(profileId);
      setProfile(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSendInterest = async () => {
    setSending(true);
    try {
      await sendMatchRequest(profileId);
      Alert.alert('Success', 'Interest sent successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send interest');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Text>Profile not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.header}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.ageGender}>{profile.age} years • {profile.gender}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Religion:</Text>
            <Text style={styles.infoValue}>{profile.religion}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Marital Status:</Text>
            <Text style={styles.infoValue}>{profile.maritalStatus}</Text>
          </View>
          {profile.height && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Height:</Text>
              <Text style={styles.infoValue}>{profile.height} cm</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Education:</Text>
            <Text style={styles.infoValue}>{profile.education}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Occupation:</Text>
            <Text style={styles.infoValue}>{profile.occupation}</Text>
          </View>
          {profile.income && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Income:</Text>
              <Text style={styles.infoValue}>{profile.income}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.locationText}>
            {profile.city}, {profile.state}, {profile.country}
          </Text>
        </View>

        {profile.aboutMe && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>{profile.aboutMe}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.interestButton, sending && styles.buttonDisabled]}
          onPress={handleSendInterest}
          disabled={sending}>
          {sending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Icon name="favorite" size={20} color="#FFFFFF" />
              <Text style={styles.interestButtonText}>Send Interest</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ageGender: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
    width: 120,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.text,
  },
  aboutText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  interestButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  interestButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileDetailsScreen;
