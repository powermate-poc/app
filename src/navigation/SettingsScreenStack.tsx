import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { DeviceListingScreen } from '../screens/HomeStack/Settings/DeviceListingScreen';
import { EspProvisioning } from '../screens/HomeStack/Settings/EspProvisioning';
import { FilterScreen } from '../screens/HomeStack/Settings/FilterScreen';
import { LanguageScreen } from '../screens/HomeStack/Settings/LanguageScreen';
import { LocationScreen } from '../screens/HomeStack/Settings/LocationScreen';
import { SettingsScreen } from '../screens/HomeStack/Settings/SettingsScreen';
import { ThemeScreen } from '../screens/HomeStack/Settings/ThemeScreen';
import { UnitsScreen } from '../screens/HomeStack/Settings/UnitsScreen';
import { SettingsRoutes } from './Routes';

export const SettingsScreenStack = (): JSX.Element => {
  const SettingsStack = createNativeStackNavigator();

  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name={SettingsRoutes.Settings} component={SettingsScreen} />
      <SettingsStack.Screen name={SettingsRoutes.Location} component={LocationScreen} />
      <SettingsStack.Screen name={SettingsRoutes.Units} component={UnitsScreen} />
      <SettingsStack.Screen name={SettingsRoutes.Theme} component={ThemeScreen} />
      <SettingsStack.Screen name={SettingsRoutes.Language} component={LanguageScreen} />
      <SettingsStack.Screen name={SettingsRoutes.EspProvisioning} component={EspProvisioning} />
      <SettingsStack.Screen name={SettingsRoutes.Device} component={DeviceListingScreen} />
      <SettingsStack.Screen name={SettingsRoutes.Filter} component={FilterScreen} />
    </SettingsStack.Navigator>
  );
};
