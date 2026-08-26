import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button, Text, Appbar, SegmentedButtons, Portal, Dialog, RadioButton, Switch } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const primaryColor = '#901c60';
const accentColor = '#4caf50'; // Vibrant Green for progress

// Helper for actual dropdowns (City, Religion)
const DropdownInput = ({ label, value, onPress, textStyle, error }: { label: string, value?: string, onPress?: () => void, textStyle?: any, error?: boolean }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <View pointerEvents="none">
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        style={[styles.input, textStyle]}
        outlineStyle={[styles.inputOutline, error ? { borderColor: 'red' } : undefined]}
        right={<TextInput.Icon icon="chevron-down" color="#888" />}
        editable={false}
        theme={{ colors: { primary: primaryColor } }}
      />
    </View>
  </TouchableOpacity>
);

export const RegistrationScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [maritalStatusVisible, setMaritalStatusVisible] = useState(false);
  
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [dobDayVisible, setDobDayVisible] = useState(false);
  const [dobMonthVisible, setDobMonthVisible] = useState(false);
  const [dobYearVisible, setDobYearVisible] = useState(false);

  const [children, setChildren] = useState('');
  const [childrenVisible, setChildrenVisible] = useState(false);
  const [childrenLivingWithMe, setChildrenLivingWithMe] = useState('');
  const [childrenLivingVisible, setChildrenLivingVisible] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const maritalOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Divorced', value: 'divorced' },
    { label: 'Widowed', value: 'widowed' },
    { label: 'Separated', value: 'separated' }
  ];

  const childrenOptions = [
    { label: 'No children', value: 'none' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3+', value: '3+' }
  ];

  const livingOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ];

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${(i + 1).toString().padStart(2, '0')}` }));
  const monthOptions = [
    { label: 'Jan', value: '01' }, { label: 'Feb', value: '02' }, { label: 'Mar', value: '03' },
    { label: 'Apr', value: '04' }, { label: 'May', value: '05' }, { label: 'Jun', value: '06' },
    { label: 'Jul', value: '07' }, { label: 'Aug', value: '08' }, { label: 'Sep', value: '09' },
    { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' }
  ];
  
  const minAge = gender === 'male' ? 21 : 18;
  const maxAge = gender === 'male' ? 65 : 60; // You can easily change these max age limits!
  
  const currentYear = new Date().getFullYear();
  const totalYears = maxAge - minAge + 1;
  const yearOptions = Array.from({ length: totalYears }, (_, i) => ({ 
    label: `${currentYear - minAge - i}`, 
    value: `${currentYear - minAge - i}` 
  }));

  return (
    <View style={[styles.container, { backgroundColor: '#f4f4f6' }]}>
      <StatusBar style="light" />
      <Appbar.Header style={{ backgroundColor: primaryColor, elevation: 0 }}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content 
          title="Create Account" 
          subtitle="Step 1 of 4"
          titleStyle={{ color: '#ffffff', fontSize: 18, fontWeight: '600' }} 
          subtitleStyle={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}
        />
      </Appbar.Header>

      {/* Modern Segmented Progress */}
      <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#f4f4f6' }}>
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: '#e0e0e0' }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: '#e0e0e0' }} />
        <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: '#e0e0e0' }} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={(t) => { setName(t); setErrors({...errors, name: false}); }}
              mode="outlined"
              maxLength={30}
              style={styles.input}
              outlineStyle={[styles.inputOutline, errors.name ? { borderColor: 'red' } : undefined]}
              right={<TextInput.Icon icon="account-outline" color={primaryColor} />}
              theme={{ colors: { primary: primaryColor } }}
            />

            <Text style={styles.fieldLabel}>Gender</Text>
            <SegmentedButtons
              value={gender}
              onValueChange={(v) => { setGender(v); setErrors({...errors, gender: false}); }}
              buttons={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
              style={styles.segmentedGroup}
              theme={{ colors: { secondaryContainer: '#f0e6ed', onSecondaryContainer: primaryColor, outline: errors.gender ? 'red' : undefined } }}
            />

            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              <View style={{ flex: 0.3 }}>
                <DropdownInput 
                  label="Day" 
                  value={dobDay}
                  onPress={() => setDobDayVisible(true)} 
                  textStyle={{ marginBottom: 0 }}
                  error={errors.dobDay}
                />
              </View>
              <View style={{ flex: 0.35 }}>
                <DropdownInput 
                  label="Month" 
                  value={monthOptions.find(o => o.value === dobMonth)?.label || ''}
                  onPress={() => setDobMonthVisible(true)} 
                  textStyle={{ marginBottom: 0 }}
                  error={errors.dobMonth}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <DropdownInput 
                  label="Year" 
                  value={dobYear}
                  onPress={() => setDobYearVisible(true)} 
                  textStyle={{ marginBottom: 0 }}
                  error={errors.dobYear}
                />
              </View>
            </View>
            
            <DropdownInput 
              label="Marital Status" 
              value={maritalOptions.find(o => o.value === maritalStatus)?.label || ''}
              onPress={() => setMaritalStatusVisible(true)} 
              error={errors.maritalStatus}
            />

            {maritalStatus !== '' && maritalStatus !== 'single' && (
              <>
                <DropdownInput 
                  label="Children" 
                  value={
                    children === 'none' ? 'No children' :
                    children === '1' ? 'I have 1 child' :
                    children === '2' ? 'I have 2 children' :
                    children === '3+' ? 'I have 3+ children' : ''
                  }
                  onPress={() => setChildrenVisible(true)}
                  error={errors.children}
                />
                
                {children !== '' && children !== 'none' && (
                  <DropdownInput 
                    label="Children living with you?" 
                    value={
                      childrenLivingWithMe === 'yes' ? 'Children living with me' :
                      childrenLivingWithMe === 'no' ? 'Children not living with me' : ''
                    }
                    onPress={() => setChildrenLivingVisible(true)}
                    error={errors.childrenLivingWithMe}
                  />
                )}
              </>
            )}
            
            <Button 
              mode="contained" 
              onPress={() => {
                let newErrors: any = {};
                if (name.trim().length < 2) newErrors.name = true;
                if (!gender) newErrors.gender = true;
                if (!dobDay) newErrors.dobDay = true;
                if (!dobMonth) newErrors.dobMonth = true;
                if (!dobYear) newErrors.dobYear = true;
                if (!maritalStatus) newErrors.maritalStatus = true;
                if (maritalStatus !== 'single') {
                  if (!children) newErrors.children = true;
                  if (children !== 'none' && !childrenLivingWithMe) newErrors.childrenLivingWithMe = true;
                }

                setErrors(newErrors);

                if (newErrors.name) {
                  Alert.alert('Full Name', 'Please enter your Full Name.');
                  return;
                }
                if (newErrors.gender) {
                  Alert.alert('Gender', 'Please select your Gender.');
                  return;
                }
                if (newErrors.dobDay || newErrors.dobMonth || newErrors.dobYear) {
                  Alert.alert('Date of Birth', 'Please complete your Date of Birth.');
                  return;
                }
                if (newErrors.maritalStatus) {
                  Alert.alert('Marital Status', 'Please select your Marital Status.');
                  return;
                }
                if (newErrors.children) {
                  Alert.alert('Children Information', 'Please select the Number of Children.');
                  return;
                }
                if (newErrors.childrenLivingWithMe) {
                  Alert.alert('Living Arrangement', 'Please specify if Children are living with you.');
                  return;
                }
                
                navigation.navigate('RegistrationStep2', {
                  name,
                  gender,
                  dob: `${dobDay}/${dobMonth}/${dobYear}`,
                  maritalStatus,
                  children,
                  childrenLivingWithMe
                });
              }} 
              style={[styles.submitButton, { backgroundColor: primaryColor }]}
              contentStyle={styles.submitButtonContent}
              labelStyle={styles.submitButtonText}
            >
              Next
            </Button>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <Portal>
        <Dialog visible={dobDayVisible} onDismiss={() => setDobDayVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Day</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => { setDobDay(newValue); setDobDayVisible(false); setErrors({...errors, dobDay: false}); }} value={dobDay}>
                {dayOptions.map(option => (
                  <RadioButton.Item key={option.value} label={option.label} value={option.value} color={primaryColor} labelStyle={styles.radioLabel} />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        <Dialog visible={dobMonthVisible} onDismiss={() => setDobMonthVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Month</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => { setDobMonth(newValue); setDobMonthVisible(false); setErrors({...errors, dobMonth: false}); }} value={dobMonth}>
                {monthOptions.map(option => (
                  <RadioButton.Item key={option.value} label={option.label} value={option.value} color={primaryColor} labelStyle={styles.radioLabel} />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        <Dialog visible={dobYearVisible} onDismiss={() => setDobYearVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Year</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => { setDobYear(newValue); setDobYearVisible(false); setErrors({...errors, dobYear: false}); }} value={dobYear}>
                {yearOptions.map(option => (
                  <RadioButton.Item key={option.value} label={option.label} value={option.value} color={primaryColor} labelStyle={styles.radioLabel} />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        <Dialog visible={maritalStatusVisible} onDismiss={() => setMaritalStatusVisible(false)} style={{ backgroundColor: '#ffffff' }}>
          <Dialog.Title style={styles.dialogTitle}>Select Marital Status</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={newValue => {
                setMaritalStatus(newValue);
                setMaritalStatusVisible(false);
                setErrors({...errors, maritalStatus: false});
              }} value={maritalStatus}>
              {maritalOptions.map(option => (
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

        <Dialog visible={childrenVisible} onDismiss={() => setChildrenVisible(false)} style={{ backgroundColor: '#ffffff' }}>
          <Dialog.Title style={styles.dialogTitle}>Number of Children</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={newValue => {
                setChildren(newValue);
                setChildrenVisible(false);
                setErrors({...errors, children: false});
              }} value={children}>
              {childrenOptions.map(option => (
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

        <Dialog visible={childrenLivingVisible} onDismiss={() => setChildrenLivingVisible(false)} style={{ backgroundColor: '#ffffff' }}>
          <Dialog.Title style={styles.dialogTitle}>Children living with you?</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={newValue => {
                setChildrenLivingWithMe(newValue);
                setChildrenLivingVisible(false);
                setErrors({...errors, childrenLivingWithMe: false});
              }} value={childrenLivingWithMe}>
              {livingOptions.map(option => (
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
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    elevation: 2, // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    marginTop: 4,
    marginLeft: 2,
    fontWeight: '500',
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
  segmentedGroup: {
    marginBottom: 20,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
});
