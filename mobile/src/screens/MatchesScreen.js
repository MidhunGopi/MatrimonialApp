import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../App';

function MatchesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>💕</Text>
      <Text style={styles.title}>My Matches</Text>
      <Text style={styles.text}>
        Your matches and interest requests will appear here.
      </Text>
      <Text style={styles.subtext}>Coming soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 32,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default MatchesScreen;
