import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';

const { width } = Dimensions.get('window');

export const BuntingFlags = () => {
  const gold = '#F9CB8F';
  const purple = '#A45B82';
  
  return (
    <View style={styles.container} pointerEvents="none">
      <Svg width={width} height={120} viewBox="0 0 400 120" preserveAspectRatio="none">
        {/* The string curve from top-left to top-right */}
        <Path 
          d="M -10 -10 Q 200 100 410 -10" 
          stroke="#E6C8A6" 
          strokeWidth="2" 
          fill="none" 
        />
        
        {/* Flags following the string curve from left to right */}
        {/* Left descending */}
        <Polygon points="10,0 25,45 40,5" fill={purple} />
        <Polygon points="55,10 70,55 85,15" fill={gold} />
        <Polygon points="100,22 115,67 130,27" fill={purple} />
        <Polygon points="145,33 160,78 175,37" fill={gold} />
        
        {/* Middle valley */}
        <Polygon points="190,41 200,86 210,41" fill={purple} />
        
        {/* Right ascending */}
        <Polygon points="225,37 240,78 255,33" fill={gold} />
        <Polygon points="270,27 285,67 300,22" fill={purple} />
        <Polygon points="315,15 330,55 345,10" fill={gold} />
        <Polygon points="360,5 375,45 390,0" fill={purple} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
