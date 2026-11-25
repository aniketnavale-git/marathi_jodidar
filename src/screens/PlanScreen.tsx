import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { useLanguage } from '../context/LanguageContext';

export const PlanScreen = () => {
  const theme = useTheme();
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const plans = isMr
    ? [
        { name: 'मूलभूत', price: 'मोफत', features: ['प्रोफाइल ब्राउझ करा', 'मर्यादित कनेक्शन'] },
        { name: 'प्रीमियम', price: '₹९९९ / महिना', features: ['अमर्यादित कनेक्शन', 'तुमचे प्रोफाइल अधिक लोकांपर्यंत पोहोचवा'] },
      ]
    : [
        { name: 'Basic', price: 'Free', features: ['Browse profiles', 'Limited connections'] },
        { name: 'Premium', price: '₹999 / month', features: ['Unlimited connections', 'Reach more compatible profiles'] },
      ];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text variant="headlineSmall" style={styles.title}>{isMr ? 'तुमच्यासाठी योग्य प्लॅन निवडा' : 'Choose the right plan for you'}</Text>
      <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
        {isMr ? 'अधिक चांगल्या जुळण्या आणि कनेक्शन मिळवा.' : 'Get more meaningful matches and connections.'}
      </Text>
      {plans.map((plan, index) => (
        <Card key={plan.name} mode="outlined" style={[styles.card, index === 1 && { borderColor: theme.colors.primary }]}>
          <Card.Content>
            <Text variant="titleLarge">{plan.name}</Text>
            <Text variant="headlineSmall" style={[styles.price, { color: theme.colors.primary }]}>{plan.price}</Text>
            <View style={styles.features}>{plan.features.map((feature) => <Text key={feature} variant="bodyMedium">• {feature}</Text>)}</View>
            <Button mode={index === 1 ? 'contained' : 'outlined'} onPress={() => {}}>
              {index === 1 ? (isMr ? 'प्रीमियम निवडा' : 'Choose Premium') : (isMr ? 'सध्याचा प्लॅन' : 'Current plan')}
            </Button>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },
  title: { fontWeight: '700' },
  subtitle: { marginTop: -8 },
  card: { borderRadius: 14 },
  price: { marginTop: 8, fontWeight: '700' },
  features: { gap: 8, marginVertical: 18 },
});

export default PlanScreen;
