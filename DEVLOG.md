# Marathi Jodidar - Development Log (DEVLOG)

## [2026-11-09] - Caste Selection Modal Appbar Height Fix

### 🎯 Problem & Root Cause
- Inside React Native's `<Modal>` on Android, `Appbar.Header` added default `statusBarHeight` on top of the modal window which was already offset by Android OS, causing excessive empty vertical purple padding above "जात निवडा".

### 🛠️ Changes & Fixes
1. **CasteSelectionModal (`src/components/CasteSelectionModal.tsx`)**:
   - Added `statusBarHeight={0}` to `<Appbar.Header>`, normalizing the header height to the standard 56px and eliminating the double status bar padding.
   - Cleaned up actions to show the single standard `close` action on the left with centered title.
2. **Verification**:
   - TypeScript compilation verified: 0 errors.

---

## [2026-11-09] - Require Cycle Elimination

### 🎯 Overview
- Removed the redundant re-export of `CasteSelectionModal` from `src/screens/CasteSelectionScreen.tsx`.
- Completely decoupled `CasteSelectionScreen` and `CasteSelectionModal`, resolving the Metro bundler require cycle warning.
- Verified TypeScript compilation: 0 errors.

---

## [2026-11-09] - Caste Selection Modal Header & UI Fix

### 🎯 Problem & Root Cause
- In `CasteSelectionModal.tsx`, a circular import between `CasteSelectionModal` and `CasteSelectionScreen` led to `ALL_MAHARASHTRA_CASTES` being evaluated as `undefined`, causing the FlatList items and body UI to not render.
- The Appbar also lacked standard back navigation and bilingual subtitle consistent with other registration screens.

### 🛠️ Changes & Fixes
1. **Centralized Caste Constants (`src/constants/castes.ts`)**:
   - Created dedicated `castes.ts` holding `ALL_MAHARASHTRA_CASTES` and `CasteItem` type, completely eliminating circular dependencies.
2. **Enhanced Modal Appbar & UI (`src/components/CasteSelectionModal.tsx`)**:
   - Added standard `<Appbar.BackAction color="#ffffff" onPress={handleClose} />` alongside `<Appbar.Action icon="close" />`.
   - Added bilingual subtitle: "आपली जात निवडा किंवा शोधा" / "Choose or search your caste".
   - Explicitly added `style={{ flex: 1 }}` to `FlatList` with safe area padding.
3. **RegistrationStep2Screen (`src/screens/RegistrationStep2Screen.tsx`)**:
   - Updated imports to source `ALL_MAHARASHTRA_CASTES` directly from `src/constants/castes`.
4. **Verification**:
   - TypeScript compilation verified: 0 errors.

---

## [2026-11-09] - Caste Selection Native Slide Modal Fix (Guaranteed Slide Down)

### 🎯 Problem & Root Cause
- On Android, `@react-navigation/native-stack` screen transition `animation: 'slide_from_bottom'` does not reliably perform the native slide-down animation upon dismissal (`navigation.goBack()`).
- In the reference project `followup`, modals and pickers (e.g. `create-tag.tsx`, `FestivalListModal.tsx`) use React Native's `<Modal animationType="slide">`. React Native's native window Modal slides up smoothly on open and **guarantees a hardware-accelerated slide-down animation on dismissal** on all Android and iOS devices.

### 🛠️ Changes & Fixes
1. **CasteSelectionModal (`src/components/CasteSelectionModal.tsx`)**:
   - Created dedicated `CasteSelectionModal` component using `<Modal animationType="slide" presentationStyle="pageSheet">`.
   - Supports live search filter, Marathi & English labels, clear search button, radio selection, and clean insets.
   - Automatically slides UP when visible, and slides DOWN when dismissed via close icon, caste selection, or Android back button.
2. **RegistrationStep2Screen (`src/screens/RegistrationStep2Screen.tsx`)**:
   - Switched from screen navigation (`navigation.navigate('CasteSelection')`) to in-screen modal state (`casteVisible`).
   - Tapping the Caste input opens `CasteSelectionModal` instantly without screen switching.
   - When a caste is selected or the close icon is tapped, the modal slides smoothly down to the bottom.
3. **Verification**:
   - Full TypeScript check: `npx tsc --noEmit` passed with 0 errors.

---

## [2026-11-09] - Complete UI Consistency Audit Resolution (All Issues 1-19)

### 🎯 Overview
- Resolved all remaining UI and consistency issues identified across the application:
  - Standardized button dimensions, border radiuses, and padding across all screens.
  - Unified input borders, heights, and search bar dimensions.
  - Unified background colors (`#f4f4f6`) across screens.
  - Replaced deprecated Paper MD3 `Appbar.Content` `subtitle` prop with custom subheader layout across all registration steps.
  - Replaced React Native `StatusBar` with Expo's `StatusBar` for consistent status bar handling.
  - Fully localized `MatchesScreen.tsx` and `RegistrationStep3Screen.tsx` with bilingual `t()` translation keys.
  - Centralized `accentColor` and `screenBackground` in `src/theme/theme.ts`.

### 🛠️ Key Screen Fixes
1. **LanguageSelectionScreen (`src/screens/LanguageSelectionScreen.tsx`)**:
   - Standardized continue button to `borderRadius: 8` and `height: 56` (matching all other app buttons).
   - Replaced React Native `StatusBar` with Expo `StatusBar style="dark"`.
2. **LoginScreen (`src/screens/LoginScreen.tsx`)**:
   - Standardized mobile number input outline to `borderColor: '#d0d0d0'` to match registration inputs.
3. **RegistrationScreen (`src/screens/RegistrationScreen.tsx`)**:
   - Standardized DOB confirm button height to `height: 56`.
   - Updated scroll wrapper to standard `paddingHorizontal: 20, paddingTop: 16`.
4. **RegistrationStep2Screen (`src/screens/RegistrationStep2Screen.tsx`)**:
   - Fixed `showsVerticalScrollIndicator={true}` on Intercaste and Diet selection dialogs.
5. **RegistrationStep3Screen (`src/screens/RegistrationStep3Screen.tsx`)**:
   - Standardized submit button `marginTop: 16`.
   - Replaced hardcoded English dialog titles and labels with bilingual `t()` calls (`step3Title`, `step3Subtitle`, `educationLevel`, `workingWith`, `occupation`, `annualIncome`, `aboutMe`).
6. **RegistrationStep4Screen (`src/screens/RegistrationStep4Screen.tsx`)**:
   - Standardized card inner padding from `24` to `16`.
7. **CasteSelectionScreen (`src/screens/CasteSelectionScreen.tsx`)**:
   - Standardized search bar input to `borderRadius: 8` and `height: 56`.
8. **MatchesScreen (`src/screens/MatchesScreen.tsx`) & SearchScreen (`src/screens/SearchScreen.tsx`)**:
   - Standardized background to `#f4f4f6`.
   - Standardized card border color to `#e8e8e8` and bottom margin to `12`.
   - Replaced React Native `StatusBar` with Expo `StatusBar`.
   - Fully localized `MatchesScreen` with new translation keys in `LanguageContext.tsx`.

---

## [2026-11-09] - Primary Color Unification (Single Source of Truth)

### 🎯 Overview
- Resolved Issue 1 from UI Audit: Unified the primary brand color across the entire application by establishing `src/theme/theme.ts` as the single source of truth.

### 🛠️ Changes & Fixes
1. **Central Theme (`src/theme/theme.ts`)**:
   - Set `export const primaryColor = '#901c60';`.
   - Updated Paper `theme.colors.primary` to `primaryColor` (`#901c60`), resolving the mismatch with `LanguageSelectionScreen` and `LoginScreen`.
2. **Navigation Container (`App.tsx`)**:
   - Integrated `primaryColor` into `navTheme.colors.primary`.
3. **Screen Imports (`src/screens/*`)**:
   - Replaced redundant hardcoded `const primaryColor = '#901c60';` in all screens with `import { primaryColor } from '../theme/theme';` across:
     - `RegistrationScreen.tsx`, `RegistrationStep2Screen.tsx`, `RegistrationStep3Screen.tsx`, `RegistrationStep4Screen.tsx`
     - `HomeScreen.tsx`, `MatchesScreen.tsx`, `ProfileDetailsScreen.tsx`, `ProfileScreen.tsx`, `SearchScreen.tsx`, `CasteSelectionScreen.tsx`.

---

## [2026-11-09] - Registration Screen Modal & Confirmation Dialog UI Refinement

### 🎯 Overview
- Standardized modal dialog styling across `RegistrationScreen.tsx` for Marital Status, Number of Children, Children Living With Me, Day, Month, and Year.
- Updated the Age & DOB Confirmation Dialog: placed the warning note inside the card, removed the "Change DOB" button, and added an 'X' close icon at the top right.

### 🛠️ Changes & Fixes
1. **RegistrationScreen (`src/screens/RegistrationScreen.tsx`)**:
   - In `confirmDobVisible` dialog:
     - Positioned React Native Paper's default `IconButton` (`icon="close"`) at the top right of the card to dismiss the dialog and edit DOB.
     - Kept a single primary "Confirm & Continue" button at the bottom.
     - Kept the unchangeable warning note (`dobWarningNote`) inside the birth date details container card directly after the birth date row.
   - Standardized `maritalStatusVisible`, `childrenVisible`, and `childrenLivingVisible` dialogs:
     - Converted from `<Dialog.Content>` to `<Dialog.ScrollArea style={{ paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0 }}>` with `<ScrollView showsVerticalScrollIndicator={true}>`.
     - Standardized dialog container with `style={{ backgroundColor: '#ffffff', maxHeight: '80%' }}` and `Dialog.Title style={styles.dialogTitle}`.
     - Kept consistent `<RadioButton.Item color={primaryColor} labelStyle={styles.radioLabel} />`.
   - Aligned Day, Month, and Year dialogs to the identical Paper `<Dialog>` layout.
   - Extracted `dayOptions` outside the component scope and memoized `monthOptions` and `yearOptions` using `useMemo` to prevent reallocations and optimize render performance.

---

## [2026-11-08] - Registration Step 3 Overhaul & Modal Standardization

### 🎯 Overview
- Restored the exact original categorized contents and UI for Registration Step 3 (`RegistrationStep3Screen.tsx`).
- Standardized modal body padding across all selection dialogs to match the established `height` dropdown design pattern.
- Fixed Metro bundler syntax error.

### 🛠️ Changes & Fixes
1. **RegistrationStep3Screen (`src/screens/RegistrationStep3Screen.tsx`)**:
   - Removed `Education Field` option, state, options list, and its modal dialog.
   - **Education Level Modal**:
     - Restored categorized hierarchy matching original designs: `School` (10th / SSC, 12th / HSC), `Diploma`, `Bachelor's Degree`, `Master's Degree`, `Higher Education` (PhD, M.Phil, Other), and `Not specified` (Other, Prefer not to say).
     - Standardized category headers (`fontSize: 14, fontWeight: 'bold', color: primaryColor, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4`).
   - **Occupation / Designation Modal**:
     - Restored full modal dialog with real-time search filtering.
     - Included categorized occupations: `Healthcare`, `Engineering & Technology`, `Finance & Accounting`, `Business`, `Government & Public Sector`, `Education`, `Legal`, `Corporate & Management`, `Media & Creative`, and `Other Common Occupations`.
   - **Modal Body Padding Standardization**:
     - Standardized all Step 3 modals (`Education Level`, `Education Field`, `Working With`, `Occupation`, `Annual Income`) to use the exact padding pattern from the `height` dropdown in Step 2:
       - `Dialog.ScrollArea`: `paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0`
       - `Dialog.Title`: `fontSize: 20, fontWeight: 'bold', color: '#333'`
       - `RadioButton.Item`: default touchable spacing with `labelStyle={{ fontSize: 16, color: '#333' }}`.
   - **Syntax Error Fix**:
     - Removed trailing duplicate closing statements (`}); export default RegistrationStep3Screen;`) that caused Metro bundler `Unexpected token (709:0)` failure.

2. **RegistrationStep4Screen (`src/screens/RegistrationStep4Screen.tsx`)**:
   - Added `Skip` action button in the App Bar.
   - Converted the main button to `Select Photo` (`फोटो निवडा`).
   - Automated redirection to Home immediately after photo selection or when tapping Skip.

3. **LoginScreen (`src/screens/LoginScreen.tsx`)**:
   - Re-enabled and optimized mobile number auto-suggestion / autofill:
     - Added `importantForAutofill="yes"` to force Android/Gboard autofill framework to trigger.
     - Added `inputMode="tel"`, `autoCapitalize="none"`, and `autoCorrect={false}`.
     - Maintained `autoComplete="tel"` and `textContentType="telephoneNumber"`.

4. **RegistrationStep2Screen (`src/screens/RegistrationStep2Screen.tsx`)**:
   - Memoized `heightOptions` list.
   - Standardized selection dialog scroll areas with `paddingHorizontal: 16, borderTopWidth: 0, borderBottomWidth: 0`.

3. **Language Context & Navigation**:
   - Updated bilingual localization mappings for Marathi (`mr`) and English (`en`).
   - Enhanced navigation state handoff between steps.

4. **Verification**:
   - `npx tsc --noEmit` verified with 0 errors.
   - Android bundling and syntax validation verified.
