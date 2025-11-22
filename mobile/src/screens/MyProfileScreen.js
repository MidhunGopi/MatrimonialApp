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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {getMyProfile} from '../services/api';
import {COLORS} from '../App';

function MyProfileScreen({navigation}) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();
      setProfile(data);
    } catch (error) {
      if (error.response?.status === 404) {
        // No profile exists
        setProfile(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.replace('Login');
        },
      },
    ]);
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
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📝</Text>
        <Text style={styles.emptyTitle}>No Profile Yet</Text>
        <Text style={styles.emptyText}>Create your profile to get started!</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('ProfileForm')}>
          <Text style={styles.createButtonText}>Create Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.locationText}>
            {profile.city}, {profile.state}, {profile.country}
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: COLORS.background,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  logoutButton: {
    backgroundColor: COLORS.error,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MyProfileScreen;
