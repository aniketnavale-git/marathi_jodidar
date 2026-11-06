import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'mr' | 'en';

interface LanguageContextType {
  language: Language;
  isLanguageSelected: boolean;
  selectLanguage: (lang: Language) => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  mr: {
    // Language Selection
    chooseLanguage: 'तुमची भाषा निवडा',
    chooseLanguageSub: 'ॲप वापरण्यासाठी तुमची पसंतीची भाषा निवडा',
    marathi: 'मराठी',
    marathiDesc: 'मराठी भाषेत ॲप वापरा',
    english: 'English',
    englishDesc: 'Use app in English',
    confirmLanguage: 'पुढे जा (Continue)',

    // Header / Branding
    appName: 'मराठी जोडीदार',
    appTagline: 'विश्वास, संस्कार आणि सुंदर नाती',

    // Auth
    welcomeTitle: 'पुन्हा स्वागत आहे',
    welcomeSubtitle: 'तुमचा योग्य जोडीदार शोधण्यासाठी लॉगिन करा',
    mobileNumber: 'मोबाईल नंबर',
    continueBtn: 'पुढे जा',
    checkingNumber: 'पडताळणी करत आहे...',
    enterValidPhone: 'कृपया वैध १० अंकी मोबाईल नंबर टाका.',
    mobileNumberPreFilled: 'मोबाईल नंबर',
    changeNumber: 'बदला',
    termsAgreementPrefix: 'पुढे जाऊन, तुम्ही आमच्या ',
    termsAndConditions: 'नियम व अटी (Terms & Conditions)',
    termsAgreementSuffix: ' मान्य करता.',
    needHelp: 'काही अडचण आहे? ',
    contactSupport: 'मदत व ग्राहक सेवा',

    // OTP
    verificationTitle: 'पडताळणी (Verification)',
    otpSubtitle: 'आम्ही या नंबरवर पडताळणी कोड पाठवला आहे',
    verifyAndLogin: 'सत्यापित करा आणि लॉगिन करा',
    newRegistration: 'नवीन प्रोफाइल नोंदणी पूर्ण करा',
    resendOtp: 'ओटीपी पुन्हा पाठवा',

    // Registration Common
    next: 'पुढे जा',
    back: 'मागे',
    step: 'पायरी',
    of: '/',
    requiredFields: 'आवश्यक माहिती',
    pleaseFillRequired: 'कृपया सर्व आवश्यक माहिती भरा.',

    // Registration Step 1
    step1Title: 'मूलभूत माहिती',
    step1Subtitle: 'पायरी १ / ४',
    firstName: 'पहिले नाव',
    lastName: 'आडनाव',
    fullName: 'पूर्ण नाव',
    gender: 'लिंग',
    male: 'पुरुष',
    female: 'स्त्री',
    dob: 'जन्मतारीख',
    day: 'दिवस',
    month: 'महिना',
    year: 'वर्ष',
    maritalStatus: 'वैवाहिक स्थिती',
    selectMaritalStatus: 'वैवाहिक स्थिती निवडा',
    single: 'अविवाहित',
    divorced: 'घटस्फोटित',
    widowed: 'विधवा / विधुर',
    separated: 'विभक्त',
    children: 'मुले आहेत का?',
    numberOfChildren: 'मुलांची संख्या',
    noChildren: 'मुले नाहीत',
    oneChild: '१ मूल',
    twoChildren: '२ मुले',
    threePlusChildren: '३ किंवा अधिक मुले',
    livingWithYou: 'मुले सोबत राहतात का?',
    childrenLivingWithMe: 'मुले सोबत राहतात',
    childrenNotLivingWithMe: 'मुले सोबत राहत नाहीत',
    yes: 'होय',
    no: 'नाही',
    pleaseEnterFirstName: 'कृपया तुमचे पहिले नाव प्रविष्ट करा.',
    pleaseEnterLastName: 'कृपया तुमचे आडनाव प्रविष्ट करा.',
    pleaseEnterName: 'कृपया तुमचे पूर्ण नाव प्रविष्ट करा.',
    pleaseSelectGender: 'कृपया लिंग निवडा.',
    pleaseSelectDob: 'कृपया तुमची जन्मतारीख पूर्ण निवडा.',
    pleaseSelectMarital: 'कृपया वैवाहिक स्थिती निवडा.',
    pleaseSelectChildren: 'कृपया मुलांची संख्या निवडा.',
    pleaseSelectLiving: 'कृपया मुले सोबत राहतात का ते निवडा.',

    // Registration Step 2
    step2Title: 'पार्श्वभूमी व जात',
    step2Subtitle: 'पायरी २ / ४',
    religion: 'धर्म',
    selectReligion: 'धर्म निवडा',
    caste: 'जात',
    selectCaste: 'जात निवडा',
    searchCaste: 'जात शोधा...',
    noCasteFound: 'कोणतीही जात सापडली नाही',
    subcaste: 'पोटजात',
    selectSubcaste: 'पोटजात निवडा',
    interCaste: 'आंतरजातीय विवाह',
    accepted: 'मान्य',
    notAccepted: 'अमान्य',
    district: 'जिल्हा (महाराष्ट्र)',
    selectDistrict: 'जिल्हा निवडा',
    searchDistrict: 'जिल्हा शोधा...',
    height: 'उंची',
    selectHeight: 'उंची निवडा',
    weight: 'वजन',
    selectWeight: 'वजन निवडा',
    diet: 'आहार पद्धती',
    selectDiet: 'आहार पद्धती निवडा',
    veg: 'शाकाहारी',
    nonVeg: 'मांसाहारी',
    egg: 'अंडी चालणारे',
    pleaseSelectReligion: 'कृपया धर्म निवडा.',
    pleaseSelectCaste: 'कृपया जात निवडा.',
    pleaseSelectInterCaste: 'कृपया आंतरजातीय विवाहाची पसंती निवडा.',
    pleaseSelectDistrict: 'कृपया जिल्हा निवडा.',
    pleaseSelectHeight: 'कृपया उंची निवडा.',
    pleaseSelectWeight: 'कृपया वजन निवडा.',
    pleaseSelectDiet: 'कृपया आहार पद्धती निवडा.',

    // Registration Step 3
    step3Title: 'शिक्षण व करिअर',
    step3Subtitle: 'पायरी ३ / ४',
    educationLevel: 'शिक्षण पातळी',
    selectEduLevel: 'शिक्षण पातळी निवडा',
    educationField: 'शिक्षणाचे क्षेत्र',
    selectEduField: 'शिक्षणाचे क्षेत्र निवडा',
    workingWith: 'नोकरी / कामाचे क्षेत्र',
    selectWorkingWith: 'कामाचे क्षेत्र निवडा',
    privateSector: 'खाजगी कंपनी',
    govtSector: 'शासकीय / निमशासकीय',
    defenseSector: 'संरक्षण दल',
    businessSector: 'व्यवसाय / स्वयंरोजगार',
    notWorking: 'सध्या काम करत नाही',
    occupation: 'व्यवसाय / पद',
    occupationPlaceholder: 'उदा. Software Engineer, Doctor, शिक्षक...',
    searchOccupation: 'व्यवसाय शोधा (उदा. Engineer, Doctor)...',
    annualIncome: 'वार्षिक उत्पन्न',
    selectIncome: 'वार्षिक उत्पन्न निवडा',
    aboutMe: 'स्वतःबद्दल माहिती व अपेक्षा',

    // Registration Step 4
    step4Title: 'प्रोफाइल फोटो',
    step4Subtitle: 'पायरी ४ / ४',
    addPhotoTitle: 'प्रोफाइल फोटो जोडा',
    addPhotoSub: 'फोटो असलेल्या प्रोफाइल्सना जास्त प्रतिसाद मिळतो!',
    tapToUpload: 'फोटो अपलोड करण्यासाठी टॅप करा',
    finishRegistration: 'नोंदणी पूर्ण करा',
    skipForNow: 'सध्या वगळा (Skip)',
    regSuccess: 'तुमची नोंदणी यशस्वीरीत्या पूर्ण झाली!',
    permissionRequired: 'परवानगी आवश्यक',
    galleryPermissionMsg: 'फोटो अपलोड करण्यासाठी कृपया गॅलरीची परवानगी द्या.',

    // Tabs
    tabHome: 'होम',
    tabSearch: 'शोधा',
    tabInterests: 'इंटरेस्टस्',
    tabProfile: 'माझे प्रोफाइल',

    // Home & Feed
    availableProfiles: 'उपलब्ध प्रोफाइल्स',
    verifiedProfile: 'व्हेरिफाइड प्रोफाइल',
    viewProfile: 'प्रोफाइल पहा',
    sendInterest: 'रस दाखवा',
    interestSent: 'विनंती पाठवली',
    noProfilesFound: 'कोणतीही प्रोफाइल आढळली नाही',

    // Interests / Matches
    matchesTitle: 'माझे इंटरेस्टस् आणि मॅचेस',
    sentInterests: 'पाठवलेले इंटरेस्ट',
    shortlisted: 'शॉर्टलिस्टेड',
    waitingResponse: 'प्रतिसादाची वाट पाहत आहे',

    // Profile
    profileViews: 'प्रोफाइल व्ह्यूज',
    interestsSentStat: 'रस पाठवला',
    matchesStat: 'मॅचेस',
    changeLanguage: 'भाषा बदला (Change Language)',
    logout: 'बाहेर पडा (Log Out)',
    logoutConfirmTitle: 'लॉगआउट करा',
    logoutConfirmMsg: 'तुम्हाला खात्री आहे की तुम्ही ॲपमधून बाहेर पडू इच्छिता?',
    cancel: 'रद्द करा',
  },
  en: {
    // Language Selection
    chooseLanguage: 'Choose Your Language',
    chooseLanguageSub: 'Select your preferred language to continue',
    marathi: 'मराठी (Marathi)',
    marathiDesc: 'मराठी भाषेत ॲप वापरा',
    english: 'English',
    englishDesc: 'Use app in English',
    confirmLanguage: 'Continue',

    // Header / Branding
    appName: 'Marathi Jodidar',
    appTagline: 'Trust, Values and Meaningful Bonds',

    // Auth
    welcomeTitle: 'Welcome Back',
    welcomeSubtitle: 'Sign in to find your perfect life partner',
    mobileNumber: 'Mobile Number',
    continueBtn: 'Continue',
    checkingNumber: 'Verifying...',
    enterValidPhone: 'Please enter a valid 10-digit mobile number.',
    mobileNumberPreFilled: 'Mobile Number',
    changeNumber: 'Change',
    termsAgreementPrefix: 'By continuing, you agree to our ',
    termsAndConditions: 'Terms and Conditions',
    termsAgreementSuffix: '',
    needHelp: 'Need help? ',
    contactSupport: 'Contact Support',

    // OTP
    verificationTitle: 'Verification',
    otpSubtitle: 'We have sent a verification code to',
    verifyAndLogin: 'Verify & Login',
    newRegistration: 'Complete New Registration',
    resendOtp: 'Resend OTP',

    // Registration Common
    next: 'Next',
    back: 'Back',
    step: 'Step',
    of: 'of',
    requiredFields: 'Required Fields',
    pleaseFillRequired: 'Please fill all required details.',

    // Registration Step 1
    step1Title: 'Basic Details',
    step1Subtitle: 'Step 1 of 4',
    firstName: 'First Name',
    lastName: 'Last Name',
    fullName: 'Full Name',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    dob: 'Date of Birth',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    maritalStatus: 'Marital Status',
    selectMaritalStatus: 'Select Marital Status',
    single: 'Never Married',
    divorced: 'Divorced',
    widowed: 'Widowed',
    separated: 'Separated',
    children: 'Have Children?',
    numberOfChildren: 'Number of Children',
    noChildren: 'No children',
    oneChild: '1 child',
    twoChildren: '2 children',
    threePlusChildren: '3+ children',
    livingWithYou: 'Children living with you?',
    childrenLivingWithMe: 'Children living with me',
    childrenNotLivingWithMe: 'Children not living with me',
    yes: 'Yes',
    no: 'No',
    pleaseEnterFirstName: 'Please enter your First Name.',
    pleaseEnterLastName: 'Please enter your Last Name.',
    pleaseEnterName: 'Please enter your Full Name.',
    pleaseSelectGender: 'Please select your Gender.',
    pleaseSelectDob: 'Please complete your Date of Birth.',
    pleaseSelectMarital: 'Please select your Marital Status.',
    pleaseSelectChildren: 'Please select the Number of Children.',
    pleaseSelectLiving: 'Please specify if Children are living with you.',

    // Registration Step 2
    step2Title: 'Background Details',
    step2Subtitle: 'Step 2 of 4',
    religion: 'Religion',
    selectReligion: 'Select Religion',
    caste: 'Caste',
    selectCaste: 'Select Caste',
    searchCaste: 'Search caste...',
    noCasteFound: 'No caste found',
    subcaste: 'Subcaste',
    selectSubcaste: 'Select Subcaste',
    interCaste: 'Inter-caste Marriage',
    accepted: 'Accepted',
    notAccepted: 'Not Accepted',
    district: 'District (Maharashtra)',
    selectDistrict: 'Select District',
    searchDistrict: 'Search district...',
    height: 'Height',
    selectHeight: 'Select Height',
    weight: 'Weight',
    selectWeight: 'Select Weight',
    diet: 'Diet Preference',
    selectDiet: 'Select Diet Preference',
    veg: 'Vegetarian',
    nonVeg: 'Non-Vegetarian',
    egg: 'Eggetarian',
    pleaseSelectReligion: 'Please select your Religion.',
    pleaseSelectCaste: 'Please select your Caste.',
    pleaseSelectInterCaste: 'Please select your Inter-caste preference.',
    pleaseSelectDistrict: 'Please select your District.',
    pleaseSelectHeight: 'Please select your Height.',
    pleaseSelectWeight: 'Please select your Weight.',
    pleaseSelectDiet: 'Please select your Diet preference.',

    // Registration Step 3
    step3Title: 'Education & Career',
    step3Subtitle: 'Step 3 of 4',
    educationLevel: 'Education Level',
    selectEduLevel: 'Select Education Level',
    educationField: 'Education Field',
    selectEduField: 'Select Education Field',
    workingWith: 'Working With',
    selectWorkingWith: 'Select Working With',
    privateSector: 'Private Company',
    govtSector: 'Government / Public Sector',
    defenseSector: 'Defense / Civil Services',
    businessSector: 'Business / Self-Employed',
    notWorking: 'Not Working',
    occupation: 'Occupation / Designation',
    occupationPlaceholder: 'e.g. Software Engineer, Doctor, Teacher...',
    searchOccupation: 'Search occupation (e.g. Engineer, Doctor)...',
    annualIncome: 'Annual Income',
    selectIncome: 'Select Annual Income',
    aboutMe: 'About Yourself & Expectations',

    // Registration Step 4
    step4Title: 'Profile Photo',
    step4Subtitle: 'Step 4 of 4',
    addPhotoTitle: 'Add a Profile Photo',
    addPhotoSub: 'Profiles with photos get more attention & responses!',
    tapToUpload: 'Tap to upload photo',
    finishRegistration: 'Finish Registration',
    skipForNow: 'Skip for now',
    regSuccess: 'Your registration is complete!',
    permissionRequired: 'Permission Required',
    galleryPermissionMsg: 'Please allow gallery access to upload a profile photo.',

    // Tabs
    tabHome: 'Home',
    tabSearch: 'Search',
    tabInterests: 'Interests',
    tabProfile: 'My Profile',

    // Home & Feed
    availableProfiles: 'Available Profiles',
    verifiedProfile: 'Verified Profile',
    viewProfile: 'View Profile',
    sendInterest: 'Send Interest',
    interestSent: 'Request Sent',
    noProfilesFound: 'No profiles found',

    // Interests / Matches
    matchesTitle: 'My Interests & Matches',
    sentInterests: 'Sent Interests',
    shortlisted: 'Shortlisted',
    waitingResponse: 'Awaiting Response',

    // Profile
    profileViews: 'Profile Views',
    interestsSentStat: 'Interests Sent',
    matchesStat: 'Matches',
    changeLanguage: 'Change Language (भाषा बदला)',
    logout: 'Log Out',
    logoutConfirmTitle: 'Log Out',
    logoutConfirmMsg: 'Are you sure you want to log out of the app?',
    cancel: 'Cancel',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('mr');
  const [isLanguageSelected, setIsLanguageSelected] = useState<boolean>(false);

  const selectLanguage = (lang: Language) => {
    setLanguageState(lang);
    setIsLanguageSelected(true);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const val = translations[language]?.[key];
    if (val !== undefined) return val;
    const enVal = translations['en']?.[key];
    if (enVal !== undefined) return enVal;
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        isLanguageSelected,
        selectLanguage,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
