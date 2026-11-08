import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button, Appbar, Portal, Dialog, RadioButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { getAllStates, getDistrictsByState } from '../constants/locations';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { ALL_MAHARASHTRA_CASTES, setCasteSelectListener } from './CasteSelectionScreen';

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
  const insets = useSafeAreaInsets();
  const { t, language } = useLanguage();
  // Data passed from Step 1
  const { mobileNumber, name, gender, dob, age, maritalStatus, children, childrenLivingWithMe } = route.params || {};

  const [religion, setReligion] = useState('');
  const [religionVisible, setReligionVisible] = useState(false);
  const [caste, setCaste] = useState('');
  const [casteVisible, setCasteVisible] = useState(false);
  const [subcaste, setSubcaste] = useState('');
  const [subcasteVisible, setSubcasteVisible] = useState(false);
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

  useEffect(() => {
    if (route.params?.selectedCaste) {
      if (route.params.selectedCaste !== caste) {
        setCaste(route.params.selectedCaste);
        setSubcaste('');
        setErrors((prev: any) => ({ ...prev, caste: false }));
      }
    }
  }, [route.params?.selectedCaste]);

  useEffect(() => {
    return () => {
      setCasteSelectListener(null);
    };
  }, []);

  const availableDistricts = useMemo(() => {
    const districts = getDistrictsByState('Maharashtra') || [];
    return [...districts, language === 'mr' ? 'इतर (Other)' : 'Other'];
  }, [language]);

  const heightOptions = useMemo(() => {
    const options = [];
    for (let feet = 4; feet <= 7; feet++) {
      for (let inches = 0; inches <= 11; inches++) {
        if (feet === 7 && inches > 0) break;
        options.push({ label: `${feet} Feet ${inches} Inch`, value: `${feet}_${inches}` });
      }
    }
    return options;
  }, []);

  const weightOptions = [];
  for (let kg = 40; kg <= 140; kg++) {
    weightOptions.push({ label: `${kg} kg`, value: `${kg}` });
  }

  const religionOptions = language === 'mr' ? [
    { label: 'हिंदू (Hindu)', value: 'hindu' },
    { label: 'मुस्लिम (Muslim)', value: 'muslim' },
    { label: 'ख्रिश्चन (Christian)', value: 'christian' },
    { label: 'शीख (Sikh)', value: 'sikh' },
    { label: 'बौद्ध (Buddhist)', value: 'buddhist' },
    { label: 'जैन (Jain)', value: 'jain' },
    { label: 'इतर (Other)', value: 'other' }
  ] : [
    { label: 'Hindu', value: 'hindu' },
    { label: 'Muslim', value: 'muslim' },
    { label: 'Christian', value: 'christian' },
    { label: 'Sikh', value: 'sikh' },
    { label: 'Buddhist', value: 'buddhist' },
    { label: 'Jain', value: 'jain' },
    { label: 'Other', value: 'other' }
  ];

  const casteOptions = useMemo(() => {
    return ALL_MAHARASHTRA_CASTES.map((item) => ({
      label: language === 'mr' ? item.labelMr : item.labelEn,
      value: item.value,
    }));
  }, [language]);

  const subcasteMap: Record<string, { mr: string[]; en: string[] }> = {
    maratha: {
      mr: ['९६ कुळी मराठा', 'देशमुख', 'कुणबी मराठा', 'मराठा', 'इतर'],
      en: ['96 Kuli Maratha', 'Deshmukh', 'Kunbi Maratha', 'Maratha', 'Other'],
    },
    brahmin: {
      mr: ['देशस्थ ऋग्वेदी', 'देशस्थ यजुर्वेदी', 'कोकणस्थ (चित्पावन)', 'कर्‍हाडे', 'सारस्वत', 'देवरुखे', 'इतर'],
      en: ['Deshastha Rigvedi', 'Deshastha Yajurvedi', 'Kokanastha (Chitpavan)', 'Karhade', 'Saraswat', 'Devrukhe', 'Other'],
    },
    kunbi: {
      mr: ['कुणबी मराठा', 'तिरोळे कुणबी', 'धानोजे कुणबी', 'खैरे कुणबी', 'झाडे कुणबी', 'इतर'],
      en: ['Kunbi Maratha', 'Tirole Kunbi', 'Dhanoje Kunbi', 'Khaire Kunbi', 'Zhade Kunbi', 'Other'],
    },
    mali: {
      mr: ['फूल माळी', 'हळदे माळी', 'जिरे माळी', 'कडू माळी', 'इतर'],
      en: ['Phul Mali', 'Halde Mali', 'Jire Mali', 'Kadu Mali', 'Other'],
    },
    dhangar: {
      mr: ['अहिर', 'हटकरी', 'शेगर', 'खुटेकर', 'झेंडे', 'इतर'],
      en: ['Ahir', 'Hatkar', 'Shegar', 'Khutekar', 'Zende', 'Other'],
    },
    chambhar: {
      mr: ['हरळा', 'रोहिदास', 'अहिरवार', 'मोची', 'इतर'],
      en: ['Harale', 'Rohidas', 'Ahirwar', 'Mochi', 'Other'],
    },
    mahar: {
      mr: ['महार', 'नवबौद्ध', 'इतर'],
      en: ['Mahar', 'Navabouddha', 'Other'],
    },
    agri: {
      mr: ['मिठागरे', 'जसपाटी', 'ढोलपाटी', 'इतर'],
      en: ['Mithagre', 'Jaspati', 'Dholpati', 'Other'],
    },
    bhandari: {
      mr: ['किर्ते', 'मोरे', 'गावड', 'इतर'],
      en: ['Kirte', 'More', 'Gavad', 'Other'],
    },
    vanjari: {
      mr: ['भगवानगडी', 'लडजीन', 'रावजीन', 'इतर'],
      en: ['Bhagwangadi', 'Ladjin', 'Raojin', 'Other'],
    },
    koli: {
      mr: ['मल्हार कोळी', 'महादेव कोळी', 'सूर्यवंशी कोळी', 'इतर'],
      en: ['Malhar Koli', 'Mahadev Koli', 'Suryavanshi Koli', 'Other'],
    },
    sonar: {
      mr: ['दैवज्ञ सोनार', 'अहिरे सोनार', 'लाड सोनार', 'इतर'],
      en: ['Daivadnya Sonar', 'Ahire Sonar', 'Lad Sonar', 'Other'],
    },
    teli: {
      mr: ['तिळवण तेली', 'साहू तेली', 'एरंडेल तेली', 'इतर'],
      en: ['Tilwan Teli', 'Sahu Teli', 'Erandel Teli', 'Other'],
    },
    lingayat: {
      mr: ['वाणी', 'जंगम', 'पंचम', 'दिक्षावंत', 'इतर'],
      en: ['Vani', 'Jangam', 'Pancham', 'Dikshawant', 'Other'],
    },
  };

  const subcasteOptions = useMemo(() => {
    const list = subcasteMap[caste]
      ? (language === 'mr' ? subcasteMap[caste].mr : subcasteMap[caste].en)
      : (language === 'mr' ? ['सर्वसामान्य / लागू नाही', 'इतर'] : ['General / Not Applicable', 'Other']);
    return list.map(item => ({ label: item, value: item }));
  }, [caste, language]);

  return (
    <View style={[styles.container, { backgroundColor: '#f4f4f6' }]}>
      <StatusBar style="light" />
      <Appbar.Header style={{ backgroundColor: primaryColor, elevation: 0 }}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={t('step2Title')}
          subtitle={t('step2Subtitle')}
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
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 + insets.bottom }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>

            <View style={styles.card}>

              <DropdownInput
                label={`${t('religion')} *`}
                value={religionOptions.find(o => o.value === religion)?.label || ''}
                onPress={() => setReligionVisible(true)}
                error={errors.religion}
              />

              <DropdownInput
                label={`${t('caste')} *`}
                value={casteOptions.find(o => o.value === caste)?.label || (caste ? caste.charAt(0).toUpperCase() + caste.slice(1) : '')}
                onPress={() => {
                  setCasteSelectListener((selected: string) => {
                    setCaste(selected);
                    setSubcaste('');
                    setErrors((prev: any) => ({ ...prev, caste: false }));
                  });
                  navigation.navigate('CasteSelection', { currentCaste: caste });
                }}
                error={errors.caste}
              />

              <DropdownInput
                label={t('subcaste')}
                value={subcaste}
                onPress={() => {
                  if (!caste) {
                    Alert.alert(t('caste'), t('pleaseSelectCaste'));
                    return;
                  }
                  setSubcasteVisible(true);
                }}
              />

              <DropdownInput
                label={`${t('interCaste')} *`}
                value={interCaste === 'yes' ? t('accepted') : interCaste === 'no' ? t('notAccepted') : ''}
                onPress={() => setInterCasteVisible(true)}
                error={errors.interCaste}
              />

              <DropdownInput
                label={`${t('district')} *`}
                value={district}
                onPress={() => setDistrictVisible(true)}
                error={errors.district}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 0.48 }}>
                  <DropdownInput
                    label={`${t('height')} *`}
                    value={heightOptions.find(o => o.value === height)?.label || ''}
                    onPress={() => setHeightVisible(true)}
                    error={errors.height}
                  />
                </View>
                <View style={{ flex: 0.48 }}>
                  <DropdownInput
                    label={`${t('weight')} *`}
                    value={weightOptions.find(o => o.value === weight)?.label || ''}
                    onPress={() => setWeightVisible(true)}
                    error={errors.weight}
                  />
                </View>
              </View>

              <DropdownInput
                label={`${t('diet')} *`}
                value={diet === 'veg' ? t('veg') : diet === 'nonveg' ? t('nonVeg') : diet === 'egg' ? t('egg') : ''}
                onPress={() => setDietVisible(true)}
                error={errors.diet}
              />

              <Button
                mode="contained"
                onPress={() => {
                  // TEMPORARY: Validation disabled for testing
                  navigation.navigate('RegistrationStep3', {
                    mobileNumber,
                    name,
                    gender,
                    dob,
                    age,
                    maritalStatus,
                    children,
                    childrenLivingWithMe,
                    religion: religion || 'hindu',
                    caste: caste || 'maratha',
                    subcaste,
                    interCaste: interCaste || 'yes',
                    district: district || 'Pune',
                    height: height || '5_6',
                    weight: weight || '65',
                    diet: diet || 'veg'
                  });
                }}
                style={[styles.submitButton, { backgroundColor: primaryColor }]}
                contentStyle={styles.submitButtonContent}
                labelStyle={styles.submitButtonText}
              >
                {t('next')}
              </Button>

            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <Portal>
        <Dialog visible={weightVisible} onDismiss={() => setWeightVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>{t('selectWeight')}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => {
                setWeight(newValue);
                setWeightVisible(false);
                setErrors({ ...errors, weight: false });
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
          <Dialog.Title style={styles.dialogTitle}>{t('selectReligion')}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => {
                setReligion(newValue);
                setReligionVisible(false);
                setErrors({ ...errors, religion: false });
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
          <Dialog.Title style={styles.dialogTitle}>{t('selectHeight')}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => {
                setHeight(newValue);
                setHeightVisible(false);
                setErrors({ ...errors, height: false });
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

        {/* Subcaste Dialog */}
        <Dialog visible={subcasteVisible} onDismiss={() => setSubcasteVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>{t('selectSubcaste')}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => {
                setSubcaste(newValue);
                setSubcasteVisible(false);
              }} value={subcaste}>
                {subcasteOptions.map((option) => (
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

        <Dialog visible={interCasteVisible} onDismiss={() => setInterCasteVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>{t('interCaste')}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <RadioButton.Group onValueChange={newValue => {
                setInterCaste(newValue);
                setInterCasteVisible(false);
                setErrors({ ...errors, interCaste: false });
              }} value={interCaste}>
                <RadioButton.Item
                  label={t('accepted')}
                  value="yes"
                  color={primaryColor}
                  labelStyle={styles.radioLabel}
                />
                <RadioButton.Item
                  label={t('notAccepted')}
                  value="no"
                  color={primaryColor}
                  labelStyle={styles.radioLabel}
                />
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        <Dialog visible={dietVisible} onDismiss={() => setDietVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>{t('selectDiet')}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <RadioButton.Group onValueChange={newValue => {
                setDiet(newValue);
                setDietVisible(false);
                setErrors({ ...errors, diet: false });
              }} value={diet}>
                <RadioButton.Item label={t('veg')} value="veg" color={primaryColor} labelStyle={styles.radioLabel} />
                <RadioButton.Item label={t('nonVeg')} value="nonveg" color={primaryColor} labelStyle={styles.radioLabel} />
                <RadioButton.Item label={t('egg')} value="egg" color={primaryColor} labelStyle={styles.radioLabel} />
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>

        <Dialog visible={districtVisible} onDismiss={() => setDistrictVisible(false)} style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}>
          <Dialog.Title style={styles.dialogTitle}>{t('selectDistrict')}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <RadioButton.Group onValueChange={newValue => {
                setDistrict(newValue);
                setDistrictVisible(false);
                setErrors({ ...errors, district: false });
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
  },
});

export default RegistrationStep2Screen;
