import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { TextInput, Button, Appbar, Portal, Dialog, RadioButton, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { primaryColor, accentColor } from '../theme/theme';

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
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const previousData = route.params || {};

  const [educationLevel, setEducationLevel] = useState('');
  const [eduLevelVisible, setEduLevelVisible] = useState(false);

  const [workingWith, setWorkingWith] = useState('');
  const [workingWithVisible, setWorkingWithVisible] = useState(false);

  const [occupation, setOccupation] = useState('');
  const [occupationVisible, setOccupationVisible] = useState(false);
  const [occupationSearch, setOccupationSearch] = useState('');

  const [annualIncome, setAnnualIncome] = useState('');
  const [incomeVisible, setIncomeVisible] = useState(false);

  const [about, setAbout] = useState('');

  const [errors, setErrors] = useState<any>({});
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const eduLevelOptions = [
    { label: 'School', value: 'header_school', isHeader: true },
    { label: '10th / SSC', value: '10th_ssc' },
    { label: '12th / HSC', value: '12th_hsc' },
    { label: 'Diploma', value: 'header_diploma', isHeader: true },
    { label: 'Diploma', value: 'diploma' },
    { label: "Bachelor's Degree", value: 'header_bachelors', isHeader: true },
    { label: 'B.A.', value: 'ba' },
    { label: 'B.Com', value: 'bcom' },
    { label: 'B.Sc.', value: 'bsc' },
    { label: 'B.E.', value: 'be' },
    { label: 'B.Tech', value: 'btech' },
    { label: 'BBA', value: 'bba' },
    { label: 'BCA', value: 'bca' },
    { label: 'B.Arch', value: 'barch' },
    { label: 'B.Pharm', value: 'bpharm' },
    { label: 'MBBS', value: 'mbbs' },
    { label: 'BDS', value: 'bds' },
    { label: 'LLB', value: 'llb' },
    { label: 'B.Ed', value: 'bed' },
    { label: "Other Bachelor's Degree", value: 'other_bachelors' },
    { label: "Master's Degree", value: 'header_masters', isHeader: true },
    { label: 'M.A.', value: 'ma' },
    { label: 'M.Com', value: 'mcom' },
    { label: 'M.Sc.', value: 'msc' },
    { label: 'M.E.', value: 'me' },
    { label: 'M.Tech', value: 'mtech' },
    { label: 'MBA', value: 'mba' },
    { label: 'MCA', value: 'mca' },
    { label: 'M.Arch', value: 'march' },
    { label: 'M.Pharm', value: 'mpharm' },
    { label: 'MD', value: 'md' },
    { label: 'MS', value: 'ms' },
    { label: 'MDS', value: 'mds' },
    { label: 'LLM', value: 'llm' },
    { label: 'M.Ed', value: 'med' },
    { label: "Other Master's Degree", value: 'other_masters' },
    { label: 'Higher Education', value: 'header_higher', isHeader: true },
    { label: 'PhD', value: 'phd' },
    { label: 'M.Phil', value: 'mphil' },
    { label: 'Other', value: 'other_higher' },
    { label: 'Not specified', value: 'header_not_specified', isHeader: true },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'prefer_not_to_say' }
  ];

  const occupationOptions = [
    { label: 'Healthcare', value: 'header_healthcare', isHeader: true },
    { label: 'Doctor', value: 'doctor' },
    { label: 'Dentist', value: 'dentist' },
    { label: 'Nurse', value: 'nurse' },
    { label: 'Pharmacist', value: 'pharmacist' },
    { label: 'Physiotherapist', value: 'physiotherapist' },
    { label: 'Occupational Therapist', value: 'occupational_therapist' },
    { label: 'Medical Professional', value: 'medical_professional' },
    { label: 'Healthcare Professional', value: 'healthcare_professional' },
    { label: 'Other Healthcare Professional', value: 'other_healthcare' },
    { label: 'Engineering & Technology', value: 'header_engineering', isHeader: true },
    { label: 'Software Engineer', value: 'software_engineer' },
    { label: 'Software Developer', value: 'software_developer' },
    { label: 'Web Developer', value: 'web_developer' },
    { label: 'Mobile App Developer', value: 'mobile_app_developer' },
    { label: 'Data Scientist', value: 'data_scientist' },
    { label: 'Data Analyst', value: 'data_analyst' },
    { label: 'IT Professional', value: 'it_professional' },
    { label: 'Network Engineer', value: 'network_engineer' },
    { label: 'Civil Engineer', value: 'civil_engineer' },
    { label: 'Mechanical Engineer', value: 'mechanical_engineer' },
    { label: 'Electrical Engineer', value: 'electrical_engineer' },
    { label: 'Electronics Engineer', value: 'electronics_engineer' },
    { label: 'Architect', value: 'architect' },
    { label: 'Other Engineer', value: 'other_engineer' },
    { label: 'Finance & Accounting', value: 'header_finance', isHeader: true },
    { label: 'Chartered Accountant (CA)', value: 'ca' },
    { label: 'Accountant', value: 'accountant' },
    { label: 'Financial Analyst', value: 'financial_analyst' },
    { label: 'Banker', value: 'banker' },
    { label: 'Investment Professional', value: 'investment_professional' },
    { label: 'Insurance Professional', value: 'insurance_professional' },
    { label: 'Other Finance Professional', value: 'other_finance' },
    { label: 'Business', value: 'header_business', isHeader: true },
    { label: 'Business Owner', value: 'business_owner' },
    { label: 'Entrepreneur', value: 'entrepreneur' },
    { label: 'Self-Employed', value: 'self_employed' },
    { label: 'Trader', value: 'trader' },
    { label: 'Consultant', value: 'consultant' },
    { label: 'Freelancer', value: 'freelancer' },
    { label: 'Government & Public Sector', value: 'header_government', isHeader: true },
    { label: 'Government Employee', value: 'government_employee' },
    { label: 'Civil Services', value: 'civil_services' },
    { label: 'Police Officer', value: 'police_officer' },
    { label: 'Defence / Armed Forces', value: 'defence' },
    { label: 'Public Sector Employee', value: 'public_sector' },
    { label: 'Education', value: 'header_education', isHeader: true },
    { label: 'Teacher', value: 'teacher' },
    { label: 'Professor / Lecturer', value: 'professor' },
    { label: 'School Principal', value: 'principal' },
    { label: 'Education Professional', value: 'education_professional' },
    { label: 'Legal', value: 'header_legal', isHeader: true },
    { label: 'Lawyer / Advocate', value: 'lawyer' },
    { label: 'Legal Professional', value: 'legal_professional' },
    { label: 'Corporate & Management', value: 'header_corporate', isHeader: true },
    { label: 'Manager', value: 'manager' },
    { label: 'HR Professional', value: 'hr_professional' },
    { label: 'Marketing Professional', value: 'marketing_professional' },
    { label: 'Sales Professional', value: 'sales_professional' },
    { label: 'Operations Professional', value: 'operations_professional' },
    { label: 'Business Analyst', value: 'business_analyst' },
    { label: 'Project Manager', value: 'project_manager' },
    { label: 'Media & Creative', value: 'header_media', isHeader: true },
    { label: 'Graphic Designer', value: 'graphic_designer' },
    { label: 'UI/UX Designer', value: 'ui_ux_designer' },
    { label: 'Photographer', value: 'photographer' },
    { label: 'Writer', value: 'writer' },
    { label: 'Journalist', value: 'journalist' },
    { label: 'Content Creator', value: 'content_creator' },
    { label: 'Actor / Performer', value: 'actor' },
    { label: 'Artist', value: 'artist' },
    { label: 'Other Common Occupations', value: 'header_other_occupations', isHeader: true },
    { label: 'Government Officer', value: 'government_officer' },
    { label: 'Administrative Professional', value: 'administrative' },
    { label: 'Scientist / Researcher', value: 'scientist' },
    { label: 'Social Worker', value: 'social_worker' },
    { label: 'Pilot', value: 'pilot' },
    { label: 'Chef', value: 'chef' },
    { label: 'Hotel / Hospitality Professional', value: 'hospitality' },
    { label: 'Real Estate Professional', value: 'real_estate' },
    { label: 'Other', value: 'other_occupation' }
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

  const filteredOccupationOptions = occupationOptions.filter(opt => {
    if (!occupationSearch.trim()) return true;
    if (opt.isHeader) {
      const headerIndex = occupationOptions.indexOf(opt);
      for (let i = headerIndex + 1; i < occupationOptions.length; i++) {
        if (occupationOptions[i].isHeader) break;
        if (occupationOptions[i].label.toLowerCase().includes(occupationSearch.toLowerCase())) {
          return true;
        }
      }
      return false;
    }
    return opt.label.toLowerCase().includes(occupationSearch.toLowerCase());
  });

  const handleNext = () => {
    const step3Data = {
      ...previousData,
      educationLevel: educationLevel || 'btech',
      workingWith: workingWith || 'private',
      occupation: occupation || 'software_developer',
      annualIncome: annualIncome || '10',
      about: about || ''
    };

    console.log('Step 3 Data:', step3Data);
    navigation.navigate('RegistrationStep4', step3Data);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f4f4f6' }]}>
      <StatusBar style="light" />
      <Appbar.Header style={{ backgroundColor: primaryColor, elevation: 0 }}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content 
          title={
            <View>
              <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: '600' }}>{t('step3Title')}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{t('step3Subtitle')}</Text>
            </View>
          }
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
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === 'android' ? (keyboardHeight > 0 ? keyboardHeight + 80 : 40 + insets.bottom) : (keyboardHeight > 0 ? 80 : 40 + insets.bottom)
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            <View style={styles.card}>
            
              <DropdownInput 
                label={`${t('educationLevel')} *`} 
                value={eduLevelOptions.find(o => o.value === educationLevel)?.label || ''}
                onPress={() => setEduLevelVisible(true)} 
                error={errors.educationLevel}
              />

              <DropdownInput 
                label={`${t('workingWith')} *`} 
                value={workingWithOptions.find(o => o.value === workingWith)?.label || ''}
                onPress={() => setWorkingWithVisible(true)} 
                error={errors.workingWith}
              />

              {workingWith !== 'not_working' && (
                <DropdownInput 
                  label={`${t('occupation')} *`} 
                  value={occupationOptions.find(o => o.value === occupation)?.label || occupation || ''}
                  onPress={() => setOccupationVisible(true)} 
                  error={errors.occupation}
                />
              )}

              <DropdownInput 
                label={`${t('annualIncome')} *`} 
                value={incomeOptions.find(o => o.value === annualIncome)?.label || ''}
                onPress={() => setIncomeVisible(true)} 
                error={errors.annualIncome}
              />

              <TextInput
                label={t('aboutMe')}
                value={about}
                onChangeText={setAbout}
                mode="outlined"
                multiline={true}
                numberOfLines={4}
                style={[styles.input, { height: 100 }]}
                outlineStyle={[styles.inputOutline, errors.about ? { borderColor: 'red' } : undefined]}
                theme={{ colors: { primary: primaryColor } }}
              />

              <Button 
                mode="contained" 
                onPress={handleNext} 
                style={[styles.submitButton, { backgroundColor: primaryColor }]}
                contentStyle={styles.submitButtonContent}
                labelStyle={styles.submitButtonText}
              >
                {t('next') || 'Next'}
              </Button>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Portal>
        {/* Education Level Dialog */}
        <Dialog 
          visible={eduLevelVisible} 
          onDismiss={() => setEduLevelVisible(false)} 
          style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}
        >
          <Dialog.Title style={styles.dialogTitle}>{t('selectEduLevel')}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group 
                onValueChange={val => { 
                  setEducationLevel(val); 
                  setEduLevelVisible(false); 
                  setErrors({...errors, educationLevel: false}); 
                }} 
                value={educationLevel}
              >
                {eduLevelOptions.map(opt => 
                  opt.isHeader ? (
                    <Text key={opt.value} style={{ fontWeight: 'bold', fontSize: 14, color: primaryColor, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4 }}>{opt.label}</Text>
                  ) : (
                    <RadioButton.Item 
                      key={opt.value} 
                      label={opt.label} 
                      value={opt.value} 
                      color={primaryColor} 
                      labelStyle={styles.radioLabel} 
                    />
                  )
                )}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        {/* Working With Dialog */}
        <Dialog 
          visible={workingWithVisible} 
          onDismiss={() => setWorkingWithVisible(false)} 
          style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}
        >
          <Dialog.Title style={styles.dialogTitle}>{t('selectWorkingWith')}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group 
                onValueChange={val => { 
                  setWorkingWith(val); 
                  setWorkingWithVisible(false); 
                  setErrors({...errors, workingWith: false}); 
                }} 
                value={workingWith}
              >
                {workingWithOptions.map(opt => (
                  <RadioButton.Item 
                    key={opt.value} 
                    label={opt.label} 
                    value={opt.value} 
                    color={primaryColor} 
                    labelStyle={styles.radioLabel} 
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        {/* Occupation Dialog */}
        <Dialog 
          visible={occupationVisible} 
          onDismiss={() => { setOccupationVisible(false); setOccupationSearch(''); }} 
          style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}
        >
          <Dialog.Title style={styles.dialogTitle}>{t('occupation')}</Dialog.Title>
          <View style={{ paddingHorizontal: 16, paddingTop: 6, paddingBottom: 6 }}>
            <TextInput
              mode="outlined"
              placeholder={t('searchOccupation')}
              value={occupationSearch}
              onChangeText={setOccupationSearch}
              style={{ height: 44, backgroundColor: '#ffffff', fontSize: 14 }}
              outlineStyle={{ borderRadius: 8, borderColor: '#d0d0d0' }}
              left={<TextInput.Icon icon="magnify" color="#888" />}
              right={occupationSearch ? <TextInput.Icon icon="close" onPress={() => setOccupationSearch('')} /> : undefined}
              theme={{ colors: { primary: primaryColor } }}
            />
          </View>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true} keyboardShouldPersistTaps="handled">
              <RadioButton.Group 
                onValueChange={val => { 
                  setOccupation(val); 
                  setOccupationVisible(false); 
                  setOccupationSearch('');
                  setErrors({...errors, occupation: false}); 
                }} 
                value={occupation}
              >
                {filteredOccupationOptions.map(opt => 
                  opt.isHeader ? (
                    <Text key={opt.value} style={{ fontWeight: 'bold', fontSize: 14, color: primaryColor, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4 }}>{opt.label}</Text>
                  ) : (
                    <RadioButton.Item 
                      key={opt.value} 
                      label={opt.label} 
                      value={opt.value} 
                      color={primaryColor} 
                      labelStyle={styles.radioLabel} 
                    />
                  )
                )}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        {/* Annual Income Dialog */}
        <Dialog 
          visible={incomeVisible} 
          onDismiss={() => setIncomeVisible(false)} 
          style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}
        >
          <Dialog.Title style={styles.dialogTitle}>{t('selectIncome')}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group 
                onValueChange={val => { 
                  setAnnualIncome(val); 
                  setIncomeVisible(false); 
                  setErrors({...errors, annualIncome: false}); 
                }} 
                value={annualIncome}
              >
                {incomeOptions.map(opt => (
                  <RadioButton.Item 
                    key={opt.value} 
                    label={opt.label} 
                    value={opt.value} 
                    color={primaryColor} 
                    labelStyle={styles.radioLabel} 
                  />
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
  }
});

export default RegistrationStep3Screen;
