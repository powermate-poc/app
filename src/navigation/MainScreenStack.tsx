import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { t } from 'i18next';
import React, { useContext } from 'react';

import { Header } from '../components/Header/Header';
import { PowermateContext } from '../context/AppContext';
import { DataModeScreen } from '../screens/HomeStack/DataMode/DataModeScreen';
import { HomeScreen } from '../screens/HomeStack/Home/HomeScreen';
import { THEME } from '../theme/theme';
import { HomeStackRoutes } from './Routes';
import { SettingsScreenStack } from './SettingsScreenStack';

const Tab = createMaterialTopTabNavigator();

export const MainScreenStack: React.FC = () => {
  const { getTheme } = useContext(PowermateContext);
  const TabStyleOptions = {
    lazy: true,
    tabBarActiveTintColor: THEME[getTheme()].colors.green,
    tabBarInactiveTintColor: THEME[getTheme()].colors.foreground_contrast,
    tabBarLabelStyle: {
      fontSize: 10,
      fontFamily: THEME.font.family.medium,
    },

    swipeEnabled: false,
    tabBarStyle: { backgroundColor: THEME[getTheme()].colors.background, width: '100%' },
    tabBarIndicatorStyle: {
      backgroundColor: THEME[getTheme()].colors.green,
      justifyContent: 'center',
    },
  } satisfies MaterialTopTabNavigationOptions;

  return (
    <>
      <Header />
      <Tab.Navigator initialRouteName={HomeStackRoutes.Overview} screenOptions={TabStyleOptions}>
        <Tab.Screen
          name={HomeStackRoutes.Overview}
          component={HomeScreen}
          options={{ title: t('routes.homestack.overview') || undefined }}
        />
        <Tab.Screen
          name={HomeStackRoutes.DataMode}
          component={DataModeScreen}
          options={{ title: t('routes.homestack.dataMode') || undefined }}
        />
        <Tab.Screen
          name={HomeStackRoutes.Settings}
          component={SettingsScreenStack}
          options={{ title: t('routes.homestack.settings') || undefined }}
        />
      </Tab.Navigator>
    </>
  );
};
