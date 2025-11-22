import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {createProfile} from '../services/api';
import {COLORS} from '../App';

function ProfileFormScreen({navigation}) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    religion: '',
    caste: '',
    education: '',
    occupation: '',
    income: '',
    height: '',
    maritalStatus: '',
    city: '',
    state: '',
    country: 'India',
    aboutMe: '',
    hobbies: '',
    expectations: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.age || !formData.gender || !formData.religion || 
        !formData.education || !formData.occupation || !formData.maritalStatus || 
        !formData.city || !formData.state) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await createProfile(formData);
      Alert.alert('Success', 'Profile created successfully!', [
        {text: 'OK', onPress: () => navigation.replace('MainTabs')},
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={text => updateField('name', text)}
          placeholder="Enter your full name"
        />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Age *</Text>
            <TextInput
              style={styles.input}
              value={formData.age}
              onChangeText={text => updateField('age', text)}
              placeholder="Age"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Gender *</Text>
            <Picker
              selectedValue={formData.gender}
              style={styles.picker}
              onValueChange={value => updateField('gender', value)}>
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Religion *</Text>
        <TextInput
          style={styles.input}
          value={formData.religion}
          onChangeText={text => updateField('religion', text)}
          placeholder="e.g., Hindu, Muslim, Christian"
        />

        <Text style={styles.sectionTitle}>Professional Details</Text>

        <Text style={styles.label}>Education *</Text>
        <TextInput
          style={styles.input}
          value={formData.education}
          onChangeText={text => updateField('education', text)}
          placeholder="e.g., B.Tech, MBA, MBBS"
        />

        <Text style={styles.label}>Occupation *</Text>
        <TextInput
          style={styles.input}
          value={formData.occupation}
          onChangeText={text => updateField('occupation', text)}
          placeholder="e.g., Software Engineer"
        />

        <Text style={styles.label}>Marital Status *</Text>
        <Picker
          selectedValue={formData.maritalStatus}
          style={styles.picker}
          onValueChange={value => updateField('maritalStatus', value)}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Never Married" value="Never Married" />
          <Picker.Item label="Divorced" value="Divorced" />
          <Picker.Item label="Widowed" value="Widowed" />
        </Picker>

        <Text style={styles.sectionTitle}>Location</Text>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>City *</Text>
            <TextInput
              style={styles.input}
              value={formData.city}
              onChangeText={text => updateField('city', text)}
              placeholder="City"
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>State *</Text>
            <TextInput
              style={styles.input}
              value={formData.state}
              onChangeText={text => updateField('state', text)}
              placeholder="State"
            />
          </View>
        </View>

        <Text style={styles.label}>About Me</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.aboutMe}
          onChangeText={text => updateField('aboutMe', text)}
          placeholder="Tell us about yourself..."
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>Create Profile</Text>
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
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.card,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.card,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileFormScreen;
