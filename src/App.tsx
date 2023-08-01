import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  useFonts,
} from '@expo-google-fonts/poppins';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';

import {
  FILTER_KEY,
  LANGUAGE_KEY,
  LOCATION_LAT_KEY,
  LOCATION_LON_KEY,
  PREFERED_UNIT_KEY,
  THEME_KEY,
} from './constants';
import { Language, Position, PowermateContext, PreferedUnit, ThemeKey } from './context/AppContext';
import i18n from './lang/languages';
import { MainScreenStack } from './navigation/MainScreenStack';
import { RootStackRoutes } from './navigation/Routes';
import { TetrisGame } from './screens/HomeStack/TetrisGame/TetrisGame';
import { THEME } from './theme/theme';

export const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
  const [_location, _setLocation] = useState<Position>({ lat: '', lon: '' });
  const [_preferedUnit, _setPreferedUnit] = useState<PreferedUnit>(PreferedUnit.KILOWATT);
  const [_theme, _setTheme] = useState<ThemeKey>('dark');
  const [_language, _setLanguage] = useState<Language>('en');
  const [_filterOptions, _setFilterOptions] = useState<string | null>(null);

  const powermateContext = useMemo(
    () => ({
      getAppLocation: () => _location,
      setAppLocation: async (pos: Position) => {
        await SecureStore.setItemAsync(LOCATION_LAT_KEY, pos.lat);
        await SecureStore.setItemAsync(LOCATION_LON_KEY, pos.lon);
        _setLocation(pos);
      },
      getPreferedUnit: () => _preferedUnit,
      setPreferedUnit: async (preferedUnit: PreferedUnit) => {
        await SecureStore.setItemAsync(PREFERED_UNIT_KEY, preferedUnit);
        _setPreferedUnit(preferedUnit);
      },
      getTheme: () => _theme,
      setTheme: async (theme: ThemeKey) => {
        await SecureStore.setItemAsync(THEME_KEY, theme);
        _setTheme(theme);
      },
      getAppLanguage: () => _language,
      setAppLanguage: async (language: Language) => {
        await SecureStore.setItemAsync(LANGUAGE_KEY, language);
        _setLanguage(language);
      },
      getFilterOptions: () => _filterOptions,
      setFilterOptions: async (filterOptions: string) => {
        await SecureStore.setItemAsync(FILTER_KEY, filterOptions);
        _setFilterOptions(filterOptions);
      },
    }),
    [_location, _preferedUnit, _language, _theme, _filterOptions],
  );

  // Waits till fonts are loaded and renders component when done
  const onLayoutRootView = React.useCallback(async () => {
    SplashScreen.preventAutoHideAsync();
    const lat = (await SecureStore.getItemAsync(LOCATION_LAT_KEY)) || '';
    const lon = (await SecureStore.getItemAsync(LOCATION_LON_KEY)) || '';
    const preferedUnit = (await SecureStore.getItemAsync(PREFERED_UNIT_KEY)) || PreferedUnit.KILOWATT;
    const theme: ThemeKey = ((await SecureStore.getItemAsync(THEME_KEY)) as ThemeKey) || 'dark'; //dark is default
    _setLocation({ lat, lon });
    _setPreferedUnit(preferedUnit as PreferedUnit);
    _setTheme(theme);

    const language = (await SecureStore.getItemAsync(LANGUAGE_KEY)) || '';

    if (['en', 'de'].includes(language)) {
      _setLanguage(language as Language);
      i18n.changeLanguage(language);
    }

    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }

  const RootStack = createNativeStackNavigator();

  // Needed to change NavigationContainer's default bg color
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: THEME[_theme].colors.background,
    },
  };

  const queryClient = new QueryClient();

  return (
    <NavigationContainer theme={navTheme}>
      <QueryClientProvider client={queryClient}>
        <PowermateContext.Provider value={powermateContext}>
          <StatusBar barStyle="light-content" />
          <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={RootStackRoutes.MainStack}>
            <RootStack.Screen name={RootStackRoutes.MainStack} component={MainScreenStack} />
            <RootStack.Screen name={RootStackRoutes.Tetris} component={TetrisGame} />
          </RootStack.Navigator>
        </PowermateContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};
