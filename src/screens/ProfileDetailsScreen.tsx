import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Text, Title, Divider, Button, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Profile } from '../data/dummyData';
import { useInterests } from '../context/InterestsContext';
import { useLanguage } from '../context/LanguageContext';

const primaryColor = '#901c60';
const accentGreen = '#2e7d32';

export const ProfileDetailsScreen = ({ route, navigation }: any) => {
  const { t, language } = useLanguage();
  const { profile } = route.params as { profile: Profile };
  const { isInterested, isFavorite, toggleInterest, toggleFavorite } = useInterests();

  const interestSent = isInterested(profile.id);
  const isShortlisted = isFavorite(profile.id);

  const handleSendInterest = () => {
    toggleInterest(profile.id);
    if (!interestSent) {
      Alert.alert(
        language === 'mr' ? 'विनंती पाठवली!' : 'Request Sent!',
        language === 'mr' 
          ? `${profile.marathiName || profile.name} यांना तुमची विनंती यशस्वीरीत्या पाठवण्यात आली आहे.`
          : `Your connection request has been sent to ${profile.name}.`
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Full Hero Image */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: profile.imageUrl }} style={styles.image} />
        
        {/* Verification badge */}
        {profile.isVerified && (
          <View style={styles.verifiedBadge}>
            <MaterialCommunityIcons name="check-decagram" size={16} color="#ffffff" />
            <Text style={styles.verifiedText}>{t('verifiedProfile')}</Text>
          </View>
        )}

        {/* Favorite Icon */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(profile.id)}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name={isShortlisted ? 'heart' : 'heart-outline'}
            size={24}
            color={isShortlisted ? '#e91e63' : '#ffffff'}
          />
        </TouchableOpacity>
      </View>
      
      {/* Detail Surface Card */}
      <Surface style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Title style={styles.name}>
            {language === 'en' ? profile.name : (profile.marathiName || profile.name)}, {profile.age} {language === 'mr' ? 'वर्षे' : 'yrs'}
          </Title>
          {language === 'mr' && profile.marathiName && (
            <Text style={styles.englishName}>{profile.name}</Text>
          )}
          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={18} color="#666" />
            <Text style={styles.locationText}>{profile.location}</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* About Section */}
        {profile.bio && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="account-outline" size={20} color={primaryColor} />
              <Title style={styles.sectionTitle}>परिचय (About)</Title>
            </View>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </View>
        )}

        {/* Basic Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="card-account-details-outline" size={20} color={primaryColor} />
            <Title style={styles.sectionTitle}>मूलभूत माहिती (Basic Details)</Title>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>उंची (Height):</Text>
            <Text style={styles.detailValue}>{profile.height}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>जात (Caste):</Text>
            <Text style={styles.detailValue}>{profile.caste}</Text>
          </View>
          {profile.subcaste && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>पोटजात (Subcaste):</Text>
              <Text style={styles.detailValue}>{profile.subcaste}</Text>
            </View>
          )}
          {profile.district && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>जिल्हा (District):</Text>
              <Text style={styles.detailValue}>{profile.district}</Text>
            </View>
          )}
        </View>

        {/* Education & Career */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="briefcase-outline" size={20} color={primaryColor} />
            <Title style={styles.sectionTitle}>शिक्षण व करिअर (Education & Career)</Title>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>शिक्षण:</Text>
            <Text style={styles.detailValue}>{profile.education}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>व्यवसाय/नोकरी:</Text>
            <Text style={styles.detailValue}>{profile.profession}</Text>
          </View>
          {profile.company && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>कंपनी / संस्था:</Text>
              <Text style={styles.detailValue}>{profile.company}</Text>
            </View>
          )}
          {profile.income && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>वार्षिक उत्पन्न:</Text>
              <Text style={styles.detailValue}>{profile.income}</Text>
            </View>
          )}
        </View>

        {/* Horoscope / Kundali */}
        {(profile.rashi || profile.manglik) && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="star-outline" size={20} color={primaryColor} />
              <Title style={styles.sectionTitle}>कुंडली माहिती (Horoscope)</Title>
            </View>
            {profile.rashi && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>रास (Rashi):</Text>
                <Text style={styles.detailValue}>{profile.rashi}</Text>
              </View>
            )}
            {profile.manglik && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>मंगळ (Manglik):</Text>
                <Text style={styles.detailValue}>{profile.manglik}</Text>
              </View>
            )}
          </View>
        )}

        {/* Action Button */}
        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            icon={interestSent ? 'check-circle' : 'heart'}
            onPress={handleSendInterest}
            style={[styles.connectButton, interestSent && { backgroundColor: accentGreen }]}
            contentStyle={{ paddingVertical: 8 }}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            {interestSent 
              ? (language === 'mr' ? 'विनंती पाठवली आहे (Sent)' : 'Request Sent') 
              : (language === 'mr' ? 'रस दाखवा (Send Connection Request)' : 'Send Connection Request')}
          </Button>
        </View>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageWrapper: {
    width: '100%',
    height: 380,
    position: 'relative',
    backgroundColor: '#333333',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 125, 50, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -26,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,
    textAlign: 'center',
  },
  englishName: {
    fontSize: 14,
    color: '#777777',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#555555',
  },
  divider: {
    marginVertical: 18,
    backgroundColor: '#eeeeee',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
  bioText: {
    lineHeight: 22,
    color: '#444444',
    fontSize: 14,
    backgroundColor: '#f9f9fb',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: primaryColor,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  detailLabel: {
    width: 140,
    color: '#666666',
    fontSize: 13,
  },
  detailValue: {
    flex: 1,
    color: '#222222',
    fontWeight: '600',
    fontSize: 13,
  },
  actionContainer: {
    marginTop: 16,
    marginBottom: 30,
  },
  connectButton: {
    borderRadius: 12,
    backgroundColor: primaryColor,
  },
});

export default ProfileDetailsScreen;
