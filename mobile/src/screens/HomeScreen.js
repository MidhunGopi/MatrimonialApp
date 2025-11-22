import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import {getProfiles} from '../services/api';
import {COLORS} from '../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

function HomeScreen({navigation}) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    minAge: '',
    maxAge: '',
    religion: '',
    city: '',
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

  const handleSearch = () => {
    setShowFilters(false);
    fetchProfiles();
  };

  const handleReset = () => {
    setFilters({
      gender: '',
      minAge: '',
      maxAge: '',
      religion: '',
      city: '',
    });
    fetchProfiles();
  };

  const renderProfile = ({item}) => (
    <TouchableOpacity
      style={styles.profileCard}
      onPress={() => navigation.navigate('ProfileDetails', {profileId: item.id})}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.cardHeader}>
        <View>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardAge}>{item.age} years</Text>
        </View>
        <View style={styles.cardIcon}>
          <Icon name="favorite-border" size={24} color="#FFFFFF" />
        </View>
      </LinearGradient>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Icon name="person" size={16} color={COLORS.primary} />
          <Text style={styles.infoText}>{item.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="school" size={16} color={COLORS.primary} />
          <Text style={styles.infoText}>{item.education}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="work" size={16} color={COLORS.primary} />
          <Text style={styles.infoText}>{item.occupation}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="location-on" size={16} color={COLORS.primary} />
          <Text style={styles.infoText}>
            {item.city}, {item.state}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="temple-hindu" size={16} color={COLORS.accent} />
          <Text style={styles.infoText}>{item.religion}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Full Profile</Text>
          <Icon name="arrow-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading && profiles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading profiles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filter Toggle Button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setShowFilters(!showFilters)}>
        <Icon name="filter-list" size={20} color="#FFFFFF" />
        <Text style={styles.filterButtonText}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Text>
      </TouchableOpacity>

      {/* Filters Panel */}
      {showFilters && (
        <ScrollView style={styles.filtersPanel}>
          <Text style={styles.filtersTitle}>Search Filters</Text>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Religion</Text>
            <TextInput
              style={styles.filterInput}
              placeholder="e.g., Hindu, Muslim, Christian"
              placeholderTextColor={COLORS.textLight}
              value={filters.religion}
              onChangeText={text => setFilters({...filters, religion: text})}
            />
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>City</Text>
            <TextInput
              style={styles.filterInput}
              placeholder="e.g., Mumbai, Delhi"
              placeholderTextColor={COLORS.textLight}
              value={filters.city}
              onChangeText={text => setFilters({...filters, city: text})}
            />
          </View>

          <View style={styles.filterRow}>
            <View style={{flex: 1, marginRight: 8}}>
              <Text style={styles.filterLabel}>Min Age</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="18"
                placeholderTextColor={COLORS.textLight}
                value={filters.minAge}
                onChangeText={text => setFilters({...filters, minAge: text})}
                keyboardType="numeric"
              />
            </View>
            <View style={{flex: 1, marginLeft: 8}}>
              <Text style={styles.filterLabel}>Max Age</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="50"
                placeholderTextColor={COLORS.textLight}
                value={filters.maxAge}
                onChangeText={text => setFilters({...filters, maxAge: text})}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}>
              <Icon name="search" size={20} color="#FFFFFF" />
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Profiles List */}
      {profiles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>No profiles found</Text>
          <Text style={styles.emptyText}>
            Try adjusting your search filters or create your profile!
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('ProfileForm')}>
            <Text style={styles.createButtonText}>Create Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={profiles}
          renderItem={renderProfile}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshing={loading}
          onRefresh={fetchProfiles}
        />
      )}
    </View>
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
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.textLight,
    fontSize: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 12,
    gap: 8,
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  filtersPanel: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    maxHeight: 300,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  searchButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    flex: 1,
    backgroundColor: COLORS.textLight,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cardName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardAge: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 12,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  viewButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
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
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
