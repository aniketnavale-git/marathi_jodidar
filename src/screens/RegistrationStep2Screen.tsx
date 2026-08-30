import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { TextInput, Button, Appbar, Portal, Dialog, RadioButton, Text, SegmentedButtons } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { getAllStates, getDistrictsByState } from '../constants/locations';

const primaryColor = '#901c60';
const accentColor = '#4caf50'; // Vibrant Green for progress

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

export const RegistrationStep2Screen = ({ route, navigation }: any) => {
  // Data passed from Step 1
  const { name, gender, dob, maritalStatus, children, childrenLivingWithMe } = route.params || {};

  const [religion, setReligion] = useState('');
  const [religionVisible, setReligionVisible] = useState(false);
  const [caste, setCaste] = useState('');
  const [casteVisible, setCasteVisible] = useState(false);
  const [interCaste, setInterCaste] = useState('');
  const [interCasteVisible, setInterCasteVisible] = useState(false);
  
  const [height, setHeight] = useState('');
  const [heightVisible, setHeightVisible] = useState(false);
  const [weight, setWeight] = useState('');
  const [weightVisible, setWeightVisible] = useState(false);
  const [diet, setDiet] = useState('');
  const [dietVisible, setDietVisible] = useState(false);
  const [district, setDistrict] = useState('');
  const [districtVisible, setDistrictVisible] = useState(false);
  const [errors, setErrors] = useState<any>({});


  
  const availableDistricts = useMemo(() => {
    const districts = getDistrictsByState('Maharashtra') || [];
    return [...districts, 'Other'];
  }, []);

  const heightOptions = [];
  for (let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches <= 11; inches++) {
      if (feet === 7 && inches > 0) break;
      heightOptions.push({ label: `${feet}' ${inches}"`, value: `${feet}_${inches}` });
    }
  }

  const weightOptions = [];
  for (let kg = 40; kg <= 140; kg++) {
    weightOptions.push({ label: `${kg} kg`, value: `${kg}` });
  }

  const religionOptions = [
    { label: 'Hindu', value: 'hindu' },
    { label: 'Muslim', value: 'muslim' },
    { label: 'Christian', value: 'christian' },
    { label: 'Sikh', value: 'sikh' },
    { label: 'Buddhist', value: 'buddhist' },
    { label: 'Jain', value: 'jain' },
    { label: 'Other', value: 'other' }
  ];

  const casteOptions = [
    { label: 'Maratha', value: 'maratha' },
    { label: 'Brahmin', value: 'brahmin' },
    { label: 'Kunbi', value: 'kunbi' },
    { label: 'Mali', value: 'mali' },
    { label: 'Dhangar', value: 'dhangar' },
    { label: 'Chambhar', value: 'chambhar' },
    { label: 'Mahar / Navabouddha', value: 'mahar' },
    { label: 'Matang', value: 'matang' },
    { label: 'Agri', value: 'agri' },
    { label: 'Bhandari', value: 'bhandari' },
    { label: 'Vanjari', value: 'vanjari' },
    { label: 'Koli', value: 'koli' },
    { label: 'Sonar', value: 'sonar' },
    { label: 'Teli', value: 'teli' },
    { label: 'Lingayat', value: 'lingayat' },
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
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            
            <View style={styles.card}>
            
            <DropdownInput 
              label="Religion" 
              value={religionOptions.find(o => o.value === religion)?.label || ''}
              onPress={() => setReligionVisible(true)} 
              error={errors.religion}
            />

            <DropdownInput 
              label="Caste" 
              value={casteOptions.find(o => o.value === caste)?.label || ''}
              onPress={() => setCasteVisible(true)} 
              error={errors.caste}
            />

            <DropdownInput 
              label="Inter-caste Marriage" 
              value={interCaste === 'yes' ? 'Accepted' : interCaste === 'no' ? 'Not Accepted' : ''}
              onPress={() => setInterCasteVisible(true)} 
              error={errors.interCaste}
            />

            <DropdownInput 
              label="District (Maharashtra)" 
              value={district}
              onPress={() => setDistrictVisible(true)} 
              error={errors.district}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 0.48 }}>
                <DropdownInput 
                  label="Height" 
                  value={heightOptions.find(o => o.value === height)?.label || ''}
                  onPress={() => setHeightVisible(true)} 
                  error={errors.height}
                />
              </View>
              <View style={{ flex: 0.48 }}>
                <DropdownInput 
                  label="Weight" 
                  value={weightOptions.find(o => o.value === weight)?.label || ''}
                  onPress={() => setWeightVisible(true)} 
                  error={errors.weight}
                />
              </View>
            </View>

            <DropdownInput 
              label="Diet" 
              value={diet === 'veg' ? 'Vegetarian' : diet === 'nonveg' ? 'Non-Vegetarian' : diet === 'egg' ? 'Eggetarian' : ''}
              onPress={() => setDietVisible(true)} 
              error={errors.diet}
            />

            <Button 
              mode="contained" 
              onPress={() => {
                let newErrors: any = {};
                if (!religion) newErrors.religion = true;
                if (!caste) newErrors.caste = true;
                if (!interCaste) newErrors.interCaste = true;
                if (!district) newErrors.district = true;
                if (!height) newErrors.height = true;
                if (!weight) newErrors.weight = true;
                if (!diet) newErrors.diet = true;
                
                setErrors(newErrors);

                if (newErrors.religion) {
                  Alert.alert('Religion', 'Please select your Religion.');
                  return;
                }
                if (newErrors.caste) {
                  Alert.alert('Caste', 'Please select your Caste.');
                  return;
                }
                if (newErrors.interCaste) {
                  Alert.alert('Inter-caste', 'Please select your Inter-caste preference.');
                  return;
                }
                if (newErrors.district) {
                  Alert.alert('District', 'Please select your District.');
                  return;
                }
                if (newErrors.height) {
                  Alert.alert('Height', 'Please select your Height.');
                  return;
                }
                if (newErrors.weight) {
                  Alert.alert('Weight', 'Please enter your Weight.');
                  return;
                }
                if (newErrors.diet) {
                  Alert.alert('Diet', 'Please select your Diet preference.');
                  return;
                }

                // Navigate to Step 3
                navigation.navigate('RegistrationStep3', { name, gender, dob, maritalStatus, children, childrenLivingWithMe, religion, caste, interCaste, district, height, weight, diet });
              }} 
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
        <Dialog visible={weightVisible} onDismiss={() => setWeightVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Select Weight</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => {
                  setWeight(newValue);
                  setWeightVisible(false);
                  setErrors({...errors, weight: false});
                }} value={weight}>
                {weightOptions.map(option => (
                  <RadioButton.Item 
                    key={option.value} 
                    label={option.label} 
                    value={option.value} 
                    color={primaryColor}
                    labelStyle={styles.radioLabel}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        <Dialog visible={religionVisible} onDismiss={() => setReligionVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Select Religion</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => {
                  setReligion(newValue);
                  setReligionVisible(false);
                  setErrors({...errors, religion: false});
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
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        <Dialog visible={heightVisible} onDismiss={() => setHeightVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Select Height</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => {
                  setHeight(newValue);
                  setHeightVisible(false);
                  setErrors({...errors, height: false});
                }} value={height}>
                {heightOptions.map(option => (
                  <RadioButton.Item 
                    key={option.value} 
                    label={option.label} 
                    value={option.value} 
                    color={primaryColor}
                    labelStyle={styles.radioLabel}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
        
        <Dialog visible={casteVisible} onDismiss={() => setCasteVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Select Caste</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => {
                  setCaste(newValue);
                  setCasteVisible(false);
                  setErrors({...errors, caste: false});
                }} value={caste}>
                {casteOptions.map((option) => (
                  <RadioButton.Item 
                    key={option.value} 
                    label={option.label} 
                    value={option.value} 
                    color={primaryColor}
                    labelStyle={[styles.radioLabel, { fontSize: 20 }]}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        <Dialog visible={interCasteVisible} onDismiss={() => setInterCasteVisible(false)} style={{ backgroundColor: '#ffffff' }}>
          <Dialog.Title style={styles.dialogTitle}>Inter-caste Marriage</Dialog.Title>
          <Dialog.Content style={{ paddingHorizontal: 0 }}>
            <RadioButton.Group onValueChange={newValue => {
                setInterCaste(newValue);
                setInterCasteVisible(false);
                setErrors({...errors, interCaste: false});
              }} value={interCaste}>
              <RadioButton.Item label="Accepted" value="yes" color={primaryColor} labelStyle={[styles.radioLabel, { fontSize: 20 }]} />
              <RadioButton.Item label="Not Accepted" value="no" color={primaryColor} labelStyle={[styles.radioLabel, { fontSize: 20 }]} />
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>

        <Dialog visible={dietVisible} onDismiss={() => setDietVisible(false)} style={{ backgroundColor: '#ffffff' }}>
          <Dialog.Title style={styles.dialogTitle}>Diet Preference</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={newValue => {
                setDiet(newValue);
                setDietVisible(false);
                setErrors({...errors, diet: false});
              }} value={diet}>
              <RadioButton.Item label="Vegetarian" value="veg" color={primaryColor} labelStyle={styles.radioLabel} />
              <RadioButton.Item label="Non-Vegetarian" value="nonveg" color={primaryColor} labelStyle={styles.radioLabel} />
              <RadioButton.Item label="Eggetarian" value="egg" color={primaryColor} labelStyle={styles.radioLabel} />
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
        <Dialog visible={districtVisible} onDismiss={() => setDistrictVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>Select District</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => {
                  setDistrict(newValue);
                  setDistrictVisible(false);
                  setErrors({...errors, district: false});
                }} value={district}>
                {availableDistricts.map((d: string) => (
                  <RadioButton.Item 
                    key={d} 
                    label={d} 
                    value={d} 
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
  scrollContent: { padding: 16, paddingBottom: 40 },
  fieldLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    marginTop: 4,
    marginLeft: 2,
    fontWeight: '500',
  },
  segmentedGroup: {
    marginBottom: 16,
  },
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
