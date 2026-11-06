import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start(() => {
      onFinish();
    });
  }, [fadeAnim, onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image 
        source={require('../../assets/logo-transparent.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', marginTop: 30 }}>
        <Text style={styles.tagline}>तुमच्या आयुष्याचा योग्य साथीदार</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Changed to white background
  },
  logo: {
    width: 200,
    height: 200,
  },
  tagline: {
    fontSize: 22,
    color: '#874086',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});

export default SplashScreen;
