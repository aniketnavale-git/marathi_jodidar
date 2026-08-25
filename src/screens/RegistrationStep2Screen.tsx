import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Appbar, Portal, Dialog, RadioButton, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const primaryColor = '#901c60';
const accentColor = '#4caf50'; // Vibrant Green for progress

const DropdownInput = ({ label, value, onPress, textStyle }: { label: string, value?: string, onPress?: () => void, textStyle?: any }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <View pointerEvents="none">
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        style={[styles.input, textStyle]}
        outlineStyle={styles.inputOutline}
        right={<TextInput.Icon icon="chevron-down" color="#888" />}
        editable={false}
        theme={{ colors: { primary: primaryColor } }}
      />
    </View>
  </TouchableOpacity>
);

export const RegistrationStep2Screen = ({ route, navigation }: any) => {
  // Data passed from Step 1
  const { name, gender, dob, maritalStatus, children, childrenLivingWithMe } = route.params || {};

  const [religion, setReligion] = useState('');
  const [religionVisible, setReligionVisible] = useState(false);
  const [caste, setCaste] = useState('');

  const religionOptions = [
    { label: 'Hindu', value: 'hindu' },
    { label: 'Muslim', value: 'muslim' },
    { label: 'Christian', value: 'christian' },
    { label: 'Sikh', value: 'sikh' },
    { label: 'Buddhist', value: 'buddhist' },
    { label: 'Jain', value: 'jain' },
    { label: 'Other', value: 'other' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#f4f4f6' }]}>
      <StatusBar style="light" />
      <Appbar.Header style={{ backgroundColor: primaryColor, elevation: 0 }}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content 
          title="Background Details" 
          subtitle="Step 2 of 4"
          titleStyle={{ color: '#ffffff', fontSize: 18, fontWeight: '600' }} 
          subtitleStyle={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}
        />
      </Appbar.Header>

      {/* Modern Segmented Progress */}
      <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#f4f4f6' }}>
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: '#e0e0e0' }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: '#e0e0e0' }} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            
            <DropdownInput 
              label="Religion" 
              value={religionOptions.find(o => o.value === religion)?.label || ''}
              onPress={() => setReligionVisible(true)} 
            />

            <TextInput
              label="Caste (Optional)"
              value={caste}
              onChangeText={setCaste}
              mode="outlined"
              style={styles.input}
              outlineStyle={styles.inputOutline}
              theme={{ colors: { primary: primaryColor } }}
            />

            <Button 
              mode="contained" 
              onPress={() => {
                // Here we would typically make an API call or dispatch to Context
                console.log('Registration Data:', { name, gender, dob, maritalStatus, children, childrenLivingWithMe, religion, caste });
                // For now, navigate back to login or home after complete
                navigation.navigate('Login');
              }} 
              style={[styles.submitButton, { backgroundColor: primaryColor }]}
              contentStyle={styles.submitButtonContent}
              labelStyle={styles.submitButtonText}
            >
              Submit
            </Button>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <Portal>
        <Dialog visible={religionVisible} onDismiss={() => setReligionVisible(false)} style={{ backgroundColor: '#ffffff' }}>
          <Dialog.Title style={styles.dialogTitle}>Select Religion</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={newValue => {
                setReligion(newValue);
                setReligionVisible(false);
              }} value={religion}>
              {religionOptions.map(option => (
                <RadioButton.Item 
                  key={option.value} 
                  label={option.label} 
                  value={option.value} 
                  color={primaryColor}
                  labelStyle={styles.radioLabel}
                />
              ))}
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    height: 56,
  },
  inputOutline: {
    borderColor: '#d0d0d0',
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 16,
    borderRadius: 8,
    elevation: 3,
  },
  submitButtonContent: {
    height: 56,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
});
