import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Title, useTheme, Divider, Button, Surface } from 'react-native-paper';
import { Profile } from '../data/dummyData';

export const ProfileDetailsScreen = ({ route }: any) => {
  const { profile } = route.params as { profile: Profile };
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={{ uri: profile.imageUrl }} style={styles.image} />
      
      <Surface style={[styles.content, { margin: -20, marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30 }]}>
        <View style={styles.header}>
          <Title style={[styles.name, { color: theme.colors.primary }]}>
            {profile.name}, {profile.age}
          </Title>
          <Text variant="titleMedium">{profile.location}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>About</Title>
          <Text variant="bodyLarge" style={styles.bio}>{profile.bio}</Text>
        </View>

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Basic Details</Title>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Height:</Text>
            <Text style={styles.detailValue}>{profile.height}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Caste:</Text>
            <Text style={styles.detailValue}>{profile.caste}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Education & Career</Title>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Education:</Text>
            <Text style={styles.detailValue}>{profile.education}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Profession:</Text>
            <Text style={styles.detailValue}>{profile.profession}</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <Button mode="contained" style={styles.connectButton} contentStyle={{ paddingVertical: 8 }}>
            Send Connection Request
          </Button>
        </View>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: 24,
    minHeight: 500,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  bio: {
    lineHeight: 24,
    color: '#444',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 100,
    color: '#666',
    fontWeight: 'bold',
  },
  detailValue: {
    flex: 1,
    color: '#222',
  },
  actionContainer: {
    marginTop: 16,
    marginBottom: 40,
  },
  connectButton: {
    borderRadius: 30,
  }
});
