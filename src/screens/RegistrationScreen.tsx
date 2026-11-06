import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button, Text, Appbar, Portal, Dialog, RadioButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';

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

export const RegistrationScreen = ({ route, navigation }: any) => {
  const { t, language } = useLanguage();
  const { mobileNumber } = route?.params || {};
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    { label: t('single'), value: 'single' },
    { label: t('divorced'), value: 'divorced' },
    { label: t('widowed'), value: 'widowed' },
    { label: t('separated'), value: 'separated' }
  ];

  const childrenOptions = [
    { label: t('noChildren'), value: 'none' },
    { label: t('oneChild'), value: '1' },
    { label: t('twoChildren'), value: '2' },
    { label: t('threePlusChildren'), value: '3+' }
  ];

  const livingOptions = [
    { label: t('childrenLivingWithMe'), value: 'yes' },
    { label: t('childrenNotLivingWithMe'), value: 'no' }
  ];

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${(i + 1).toString().padStart(2, '0')}` }));
  const monthOptions = language === 'mr' ? [
    { label: 'जानेवारी', value: '01' }, { label: 'फेब्रुवारी', value: '02' }, { label: 'मार्च', value: '03' },
    { label: 'एप्रिल', value: '04' }, { label: 'मे', value: '05' }, { label: 'जून', value: '06' },
    { label: 'जुलै', value: '07' }, { label: 'ऑगस्ट', value: '08' }, { label: 'सप्टेंबर', value: '09' },
    { label: 'ऑक्टोबर', value: '10' }, { label: 'नोव्हेंबर', value: '11' }, { label: 'डिसेंबर', value: '12' }
  ] : [
    { label: 'Jan', value: '01' }, { label: 'Feb', value: '02' }, { label: 'Mar', value: '03' },
    { label: 'Apr', value: '04' }, { label: 'May', value: '05' }, { label: 'Jun', value: '06' },
    { label: 'Jul', value: '07' }, { label: 'Aug', value: '08' }, { label: 'Sep', value: '09' },
    { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' }
  ];
  
  const minAge = gender === 'male' ? 21 : 18;
  const maxAge = gender === 'male' ? 65 : 60;
  
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
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Login')} />
        <Appbar.Content 
          title={t('step1Title')} 
          subtitle={t('step1Subtitle')}
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
            
            {mobileNumber ? (
              <View style={styles.phoneBadge}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.phoneBadgeLabel}>{t('mobileNumberPreFilled')}: </Text>
                  <Text style={styles.phoneBadgeValue}>+91 {mobileNumber.replace(/(\d{5})(\d{1,5})/, '$1 $2').trim()}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.phoneChangeLink}>{t('changeNumber')}</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  label={t('firstName')}
                  value={firstName}
                  onChangeText={(text) => { setFirstName(text); setErrors({...errors, firstName: false}); }}
                  mode="outlined"
                  maxLength={25}
                  style={styles.input}
                  outlineStyle={[styles.inputOutline, errors.firstName ? { borderColor: 'red' } : undefined]}
                  theme={{ colors: { primary: primaryColor } }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  label={t('lastName')}
                  value={lastName}
                  onChangeText={(text) => { setLastName(text); setErrors({...errors, lastName: false}); }}
                  mode="outlined"
                  maxLength={25}
                  style={styles.input}
                  outlineStyle={[styles.inputOutline, errors.lastName ? { borderColor: 'red' } : undefined]}
                  theme={{ colors: { primary: primaryColor } }}
                />
              </View>
            </View>

            <Text style={styles.fieldLabel}>{t('gender')}</Text>
            <View style={styles.genderRow}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === 'male' && styles.genderOptionSelected,
                  errors.gender && styles.genderOptionError,
                ]}
                onPress={() => { setGender('male'); setErrors({...errors, gender: false}); }}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name={gender === 'male' ? 'radiobox-marked' : 'radiobox-blank'}
                  size={22}
                  color={gender === 'male' ? primaryColor : '#999999'}
                />
                <Text style={[styles.genderText, gender === 'male' && styles.genderTextSelected]}>
                  {t('male')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === 'female' && styles.genderOptionSelected,
                  errors.gender && styles.genderOptionError,
                ]}
                onPress={() => { setGender('female'); setErrors({...errors, gender: false}); }}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name={gender === 'female' ? 'radiobox-marked' : 'radiobox-blank'}
                  size={22}
                  color={gender === 'female' ? primaryColor : '#999999'}
                />
                <Text style={[styles.genderText, gender === 'female' && styles.genderTextSelected]}>
                  {t('female')}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.fieldLabel}>{t('dob')}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
              <View style={{ flex: 1 }}>
                <DropdownInput 
                  label={t('day')} 
                  value={dobDay}
                  onPress={() => setDobDayVisible(true)} 
                  textStyle={{ marginBottom: 0 }}
                  error={errors.dobDay}
                />
              </View>
              <View style={{ flex: 1 }}>
                <DropdownInput 
                  label={t('month')} 
                  value={monthOptions.find(o => o.value === dobMonth)?.label || ''}
                  onPress={() => setDobMonthVisible(true)} 
                  textStyle={{ marginBottom: 0 }}
                  error={errors.dobMonth}
                />
              </View>
              <View style={{ flex: 1 }}>
                <DropdownInput 
                  label={t('year')} 
                  value={dobYear}
                  onPress={() => setDobYearVisible(true)} 
                  textStyle={{ marginBottom: 0 }}
                  error={errors.dobYear}
                />
              </View>
            </View>
            
            <DropdownInput 
              label={t('maritalStatus')} 
              value={maritalOptions.find(o => o.value === maritalStatus)?.label || ''}
              onPress={() => setMaritalStatusVisible(true)} 
              error={errors.maritalStatus}
            />

            {maritalStatus !== '' && maritalStatus !== 'single' && (
              <>
                <DropdownInput 
                  label={t('children')} 
                  value={childrenOptions.find(o => o.value === children)?.label || ''}
                  onPress={() => setChildrenVisible(true)}
                  error={errors.children}
                />
                
                {children !== '' && children !== 'none' && (
                  <DropdownInput 
                    label={t('livingWithYou')} 
                    value={livingOptions.find(o => o.value === childrenLivingWithMe)?.label || ''}
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
                if (firstName.trim().length < 2) newErrors.firstName = true;
                if (lastName.trim().length < 2) newErrors.lastName = true;
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

                if (newErrors.firstName) {
                  Alert.alert(t('firstName'), t('pleaseEnterFirstName'));
                  return;
                }
                if (newErrors.lastName) {
                  Alert.alert(t('lastName'), t('pleaseEnterLastName'));
                  return;
                }
                if (newErrors.gender) {
                  Alert.alert(t('gender'), t('pleaseSelectGender'));
                  return;
                }
                if (newErrors.dobDay || newErrors.dobMonth || newErrors.dobYear) {
                  Alert.alert(t('dob'), t('pleaseSelectDob'));
                  return;
                }
                if (newErrors.maritalStatus) {
                  Alert.alert(t('maritalStatus'), t('pleaseSelectMarital'));
                  return;
                }
                if (newErrors.children) {
                  Alert.alert(t('children'), t('pleaseSelectChildren'));
                  return;
                }
                if (newErrors.childrenLivingWithMe) {
                  Alert.alert(t('livingWithYou'), t('pleaseSelectLiving'));
                  return;
                }
                
                navigation.navigate('RegistrationStep2', {
                  mobileNumber,
                  firstName: firstName.trim(),
                  lastName: lastName.trim(),
                  name: `${firstName.trim()} ${lastName.trim()}`,
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
              {t('next')}
            </Button>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <Portal>
        <Dialog visible={dobDayVisible} onDismiss={() => setDobDayVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>{t('day')}</Dialog.Title>
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
          <Dialog.Title style={styles.dialogTitle}>{t('month')}</Dialog.Title>
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
          <Dialog.Title style={styles.dialogTitle}>{t('year')}</Dialog.Title>
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
          <Dialog.Title style={styles.dialogTitle}>{t('selectMaritalStatus')}</Dialog.Title>
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
          <Dialog.Title style={styles.dialogTitle}>{t('numberOfChildren')}</Dialog.Title>
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
          <Dialog.Title style={styles.dialogTitle}>{t('livingWithYou')}</Dialog.Title>
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
  phoneBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  phoneBadgeLabel: {
    fontSize: 13,
    color: '#666',
  },
  phoneBadgeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  phoneChangeLink: {
    fontSize: 13,
    color: primaryColor,
    fontWeight: 'bold',
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
  genderRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  genderOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#d0d0d0',
    backgroundColor: '#ffffff',
    gap: 10,
  },
  genderOptionSelected: {
    borderColor: primaryColor,
    backgroundColor: '#fdf2f7',
  },
  genderOptionError: {
    borderColor: 'red',
  },
  genderText: {
    fontSize: 15,
    color: '#444444',
    fontWeight: '500',
  },
  genderTextSelected: {
    color: primaryColor,
    fontWeight: 'bold',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default RegistrationScreen;

