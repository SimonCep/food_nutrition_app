import { Stack } from "expo-router";
import { useTranslation } from 'react-i18next';

export default function SettingsLayout() {
  const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen name="theme" options={{ title: t('LAYSTKtheme') }} />
      <Stack.Screen name="about" options={{ title: t('LAYSTKabt') }} />
      <Stack.Screen name="editProfile" options={{ title: t('LAYSTKuser') }} />
      <Stack.Screen name="editGoals" options={{ title: t('LAYSTKgoal') }} />
      <Stack.Screen
        name="accountSecurity"
        options={{ title: t('LAYSTKsecur') }}
      />
      <Stack.Screen
        name="language"
        options={{ title: t('LAYSTKlang') }}
      />
    </Stack>
  );
}
