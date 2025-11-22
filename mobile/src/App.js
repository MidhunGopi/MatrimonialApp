import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileFormScreen from './screens/ProfileFormScreen';
import ProfileDetailsScreen from './screens/ProfileDetailsScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import MatchesScreen from './screens/MatchesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Theme colors inspired by Indian matrimonial apps
export const COLORS = {
  primary: '#E91E63',      // Pink/Magenta - auspicious color
  secondary: '#9C27B0',    // Purple
  accent: '#FF6F00',       // Orange - traditional Indian color
  gold: '#FFD700',         // Gold - prosperity
  background: '#FFF8F0',   // Warm off-white
  card: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  border: '#E0E0E0',
  success: '#4CAF50',
  error: '#F44336',
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Browse') {
            iconName = 'search';
          } else if (route.name === 'Matches') {
            iconName = 'favorite';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      })}>
      <Tab.Screen 
        name="Browse" 
        component={HomeScreen} 
        options={{title: '🕉️ Find Your Match'}}
      />
      <Tab.Screen 
        name="Matches" 
        component={MatchesScreen}
        options={{title: '💕 My Matches'}}
      />
      <Tab.Screen 
        name="Profile" 
        component={MyProfileScreen}
        options={{title: '👤 My Profile'}}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProfileForm"
              component={ProfileFormScreen}
              options={{
                title: 'Create Profile',
                headerStyle: {backgroundColor: COLORS.primary},
                headerTintColor: '#FFFFFF',
              }}
            />
            <Stack.Screen
              name="ProfileDetails"
              component={ProfileDetailsScreen}
              options={{
                title: 'Profile Details',
                headerStyle: {backgroundColor: COLORS.primary},
                headerTintColor: '#FFFFFF',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
