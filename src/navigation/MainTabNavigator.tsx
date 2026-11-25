import React from 'react';
import { Text as NativeText, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { MatchesScreen } from '../screens/MatchesScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { PlanScreen } from '../screens/PlanScreen';
import { Icon, useTheme } from 'react-native-paper';
import { useLanguage } from '../context/LanguageContext';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const hasOffer = false; // Set to true when an offer is active.

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
          else if (route.name === 'Matches') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Chat') iconName = focused ? 'message-text' : 'message-text-outline';
          else if (route.name === 'Plan') iconName = focused ? 'crown' : 'crown-outline';
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
        name="Plan"
        component={PlanScreen}
        options={{
          title: t('tabPlan'),
          tabBarLabel: ({ color }) => (
            <View style={{ alignItems: 'center', height: hasOffer ? 30 : 18 }}>
              {hasOffer && (
                <View style={{ backgroundColor: '#e91e63', borderRadius: 7, paddingHorizontal: 4, paddingVertical: 1 }}>
                  <NativeText style={{ color: '#ffffff', fontSize: 8, fontWeight: '800' }}>OFFER</NativeText>
                </View>
              )}
              <NativeText style={{ color, fontSize: 11, fontWeight: '600' }}>{t('tabPlan')}</NativeText>
            </View>
          ),
        }}
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
