import React from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Card, Text, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { dummyProfiles, Profile } from '../data/dummyData';

export const HomeScreen = ({ navigation }: any) => {
  const theme = useTheme();

  const renderItem = ({ item }: { item: Profile }) => (
    <Card 
      style={styles.card}
      onPress={() => navigation.navigate('ProfileDetails', { profile: item })}
    >
      <Card.Cover source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <Card.Content style={styles.cardContent}>
        <Title style={{ color: theme.colors.primary }}>{item.name}, {item.age}</Title>
        <Paragraph>{item.profession} • {item.location}</Paragraph>
        <Text variant="bodySmall" style={{ marginTop: 4, color: '#666' }}>
          {item.height} | {item.caste} | {item.education}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text" onPress={() => {}}>Shortlist</Button>
        <Button mode="contained" onPress={() => {}}>Connect</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={dummyProfiles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  cardImage: {
    height: 250,
  },
  cardContent: {
    paddingTop: 12,
  },
});
