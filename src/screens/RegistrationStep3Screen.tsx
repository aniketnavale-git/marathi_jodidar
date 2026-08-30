import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button, Appbar, Portal, Dialog, RadioButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const primaryColor = '#901c60';
const accentColor = '#4caf50';

const DropdownInput = ({ label, value, onPress, error }: { label: string, value?: string, onPress?: () => void, error?: boolean }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <View pointerEvents="none">
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        style={styles.input}
        outlineStyle={[styles.inputOutline, error ? { borderColor: 'red' } : undefined]}
        right={<TextInput.Icon icon="chevron-down" color="#888" />}
        editable={false}
        theme={{ colors: { primary: primaryColor } }}
      />
    </View>
  </TouchableOpacity>
);

export const RegistrationStep3Screen = ({ route, navigation }: any) => {
  const previousData = route.params || {};

  const [educationLevel, setEducationLevel] = useState('');
  const [eduLevelVisible, setEduLevelVisible] = useState(false);

  const [educationField, setEducationField] = useState('');
  const [eduFieldVisible, setEduFieldVisible] = useState(false);

  const [workingWith, setWorkingWith] = useState('');
  const [workingWithVisible, setWorkingWithVisible] = useState(false);

  const [occupation, setOccupation] = useState('');

  const [annualIncome, setAnnualIncome] = useState('');
  const [incomeVisible, setIncomeVisible] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const eduLevelOptions = [
    { label: 'High School', value: 'high_school' },
    { label: 'Diploma', value: 'diploma' },
    { label: 'Bachelors', value: 'bachelors' },
    { label: 'Masters', value: 'masters' },
    { label: 'Doctorate', value: 'doctorate' }
  ];

  const eduFieldOptions = [
    { label: 'Engineering / Technology', value: 'engineering' },
    { label: 'Medical / Healthcare', value: 'medical' },
    { label: 'Arts / Design', value: 'arts' },
    { label: 'Commerce / Finance', value: 'commerce' },
    { label: 'Science', value: 'science' },
    { label: 'Management', value: 'management' },
    { label: 'Law', value: 'law' },
    { label: 'Other', value: 'other' }
  ];

  const workingWithOptions = [
    { label: 'Private Company', value: 'private' },
    { label: 'Government / Public Sector', value: 'government' },
    { label: 'Defense / Civil Services', value: 'defense' },
    { label: 'Business / Self-Employed', value: 'business' },
    { label: 'Not Working', value: 'not_working' }
  ];

  const incomeOptions = [
    { label: 'No Income', value: '0' },
    { label: 'Upto 1 Lakh', value: '1' },
    { label: '1 to 3 Lakhs', value: '3' },
    { label: '3 to 5 Lakhs', value: '5' },
    { label: '5 to 7 Lakhs', value: '7' },
    { label: '7 to 10 Lakhs', value: '10' },
    { label: '10 to 15 Lakhs', value: '15' },
    { label: '15 to 20 Lakhs', value: '20' },
    { label: '20+ Lakhs', value: '20+' }
  ];

  const handleNext = () => {
    let newErrors: any = {};
    if (!educationLevel) newErrors.educationLevel = true;
    if (!educationField) newErrors.educationField = true;
    if (!workingWith) newErrors.workingWith = true;
    if (!occupation && workingWith !== 'not_working') newErrors.occupation = true;
    if (!annualIncome) newErrors.annualIncome = true;
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Alert.alert('Required Fields', 'Please fill all the required details.');
      return;
    }

    const step3Data = {
      ...previousData,
      educationLevel,
      educationField,
      workingWith,
      occupation,
      annualIncome
    };

    console.log('Step 3 Data:', step3Data);
    // TODO: Navigate to RegistrationStep4 when ready
    // navigation.navigate('RegistrationStep4', step3Data);
    
    // Temporarily go to login until Step 4 is built
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f4f4f6' }]}>
      <StatusBar style="light" />
      <Appbar.Header style={{ backgroundColor: primaryColor, elevation: 0 }}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content 
          title="Education & Career" 
          subtitle="Step 3 of 4"
          titleStyle={{ color: '#ffffff', fontSize: 18, fontWeight: '600' }} 
          subtitleStyle={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}
        />
      </Appbar.Header>

      {/* Modern Segmented Progress - 3 segments filled */}
      <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#f4f4f6' }}>
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: '#e0e0e0' }} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            <View style={styles.card}>
            
              <DropdownInput 
                label="Education Level" 
                value={eduLevelOptions.find(o => o.value === educationLevel)?.label || ''}
                onPress={() => setEduLevelVisible(true)} 
                error={errors.educationLevel}
              />

              <DropdownInput 
                label="Education Field" 
                value={eduFieldOptions.find(o => o.value === educationField)?.label || ''}
                onPress={() => setEduFieldVisible(true)} 
                error={errors.educationField}
              />

              <DropdownInput 
                label="Working With" 
                value={workingWithOptions.find(o => o.value === workingWith)?.label || ''}
                onPress={() => setWorkingWithVisible(true)} 
                error={errors.workingWith}
              />

              {workingWith !== 'not_working' && (
                <TextInput
                  label="Occupation / Designation"
                  value={occupation}
                  onChangeText={(text) => {
                    setOccupation(text);
                    setErrors({...errors, occupation: false});
                  }}
                  mode="outlined"
                  style={styles.input}
                  outlineStyle={[styles.inputOutline, errors.occupation ? { borderColor: 'red' } : undefined]}
                  theme={{ colors: { primary: primaryColor } }}
                  placeholder="e.g. Software Engineer"
                />
              )}

              <DropdownInput 
                label="Annual Income" 
                value={incomeOptions.find(o => o.value === annualIncome)?.label || ''}
                onPress={() => setIncomeVisible(true)} 
                error={errors.annualIncome}
              />

              <Button 
                mode="contained" 
                onPress={handleNext} 
                style={[styles.submitButton, { backgroundColor: primaryColor }]}
                contentStyle={styles.submitButtonContent}
                labelStyle={styles.submitButtonText}
              >
                Next
              </Button>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Portal>
        {/* Education Level Dialog */}
        <Dialog visible={eduLevelVisible} onDismiss={() => setEduLevelVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Education Level</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView>
              <RadioButton.Group onValueChange={val => { setEducationLevel(val); setEduLevelVisible(false); setErrors({...errors, educationLevel: false}); }} value={educationLevel}>
                {eduLevelOptions.map(opt => (
                  <RadioButton.Item key={opt.value} label={opt.label} value={opt.value} color={primaryColor} labelStyle={styles.radioLabel} />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        {/* Education Field Dialog */}
        <Dialog visible={eduFieldVisible} onDismiss={() => setEduFieldVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Education Field</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView>
              <RadioButton.Group onValueChange={val => { setEducationField(val); setEduFieldVisible(false); setErrors({...errors, educationField: false}); }} value={educationField}>
                {eduFieldOptions.map(opt => (
                  <RadioButton.Item key={opt.value} label={opt.label} value={opt.value} color={primaryColor} labelStyle={styles.radioLabel} />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        {/* Working With Dialog */}
        <Dialog visible={workingWithVisible} onDismiss={() => setWorkingWithVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Working With</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView>
              <RadioButton.Group onValueChange={val => { setWorkingWith(val); setWorkingWithVisible(false); setErrors({...errors, workingWith: false}); }} value={workingWith}>
                {workingWithOptions.map(opt => (
                  <RadioButton.Item key={opt.value} label={opt.label} value={opt.value} color={primaryColor} labelStyle={styles.radioLabel} />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        {/* Annual Income Dialog */}
        <Dialog visible={incomeVisible} onDismiss={() => setIncomeVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Annual Income</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView>
              <RadioButton.Group onValueChange={val => { setAnnualIncome(val); setIncomeVisible(false); setErrors({...errors, annualIncome: false}); }} value={annualIncome}>
                {incomeOptions.map(opt => (
                  <RadioButton.Item key={opt.value} label={opt.label} value={opt.value} color={primaryColor} labelStyle={styles.radioLabel} />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
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
    marginTop: 8,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  }
});
