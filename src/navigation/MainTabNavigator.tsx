import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { MatchesScreen } from '../screens/MatchesScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Icon, useTheme } from 'react-native-paper';
import { useLanguage } from '../context/LanguageContext';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#777777',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'help';

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = 'magnify';
          else if (route.name === 'Matches') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Chat') iconName = focused ? 'message-text' : 'message-text-outline';
          else if (route.name === 'Profile') iconName = focused ? 'account' : 'account-outline';

          return <Icon source={iconName} size={size || 24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t('tabHome') }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: t('tabSearch') }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ title: t('tabMatches') }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: t('tabChat') }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t('tabProfile') }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
