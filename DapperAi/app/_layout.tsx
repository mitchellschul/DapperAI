import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { AppProvider } from "../contextProvider"
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const auth = getAuth();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        // localStorage.setItem('token', JSON.stringify(user.getIdToken()));
        // localStorage.setItem('firstName', `${user.firstName}`)
        setUser(user);
        setIsAuthenticated(true);

        // console.log('logged in');
      } else {
        // localStorage.clear();
        setIsAuthenticated(false);
        // console.log('no user');
      }
    });
  }, [auth]);

  return (
    <AppProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </AppProvider>
  );
}
