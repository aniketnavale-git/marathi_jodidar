import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Button, Appbar, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const primaryColor = '#901c60';
const accentColor = '#4caf50';

export const RegistrationStep4Screen = ({ route, navigation }: any) => {
  const { t } = useLanguage();
  const previousData = route.params || {};
  const [image, setImage] = useState<string | null>(null);
  const { registerUser, login } = useAuth();

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(t('permissionRequired'), t('galleryPermissionMsg'));
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  const handleFinish = () => {
    const finalData = {
      ...previousData,
      profilePhoto: image
    };

    console.log('Final Registration Data:', finalData);

    if (previousData.mobileNumber) {
      registerUser(previousData.mobileNumber);
    }
    
    Alert.alert(
      t('finishRegistration'),
      t('regSuccess'),
      [
        { text: "OK", onPress: () => login(previousData.mobileNumber) }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f4f4f6' }]}>
      <StatusBar style="light" />
      <Appbar.Header style={{ backgroundColor: primaryColor, elevation: 0 }}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content 
          title={t('step4Title')} 
          subtitle={t('step4Subtitle')}
          titleStyle={{ color: '#ffffff', fontSize: 18, fontWeight: '600' }} 
          subtitleStyle={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}
        />
      </Appbar.Header>

      {/* Modern Segmented Progress - 4 segments filled */}
      <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#f4f4f6' }}>
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
      </View>

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 16, alignItems: 'center' }}>
          <View style={styles.card}>
            <Text style={styles.title}>{t('addPhotoTitle')}</Text>
            <Text style={styles.subtitle}>{t('addPhotoSub')}</Text>

            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View style={styles.placeholder}>
                  <MaterialCommunityIcons name="camera-plus" size={50} color="#888" />
                  <Text style={styles.placeholderText}>{t('tapToUpload')}</Text>
                </View>
              )}
            </TouchableOpacity>

            <Button 
              mode="contained" 
              onPress={handleFinish} 
              style={[styles.submitButton, { backgroundColor: primaryColor }]}
              contentStyle={styles.submitButtonContent}
              labelStyle={styles.submitButtonText}
            >
              {t('finishRegistration')}
            </Button>
            
            <Button 
              mode="text" 
              onPress={handleFinish} 
              style={styles.skipButton}
              textColor={primaryColor}
            >
              {t('skipForNow')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    width: '100%',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center'
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    color: '#888',
    fontSize: 14,
  },
  submitButton: {
    width: '100%',
    borderRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  submitButtonContent: {
    height: 56,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  skipButton: {
    width: '100%',
  }
});

export default RegistrationStep4Screen;
