import React from 'react';

export interface Position {
  lat: string;
  lon: string;
}

export enum PreferedUnit {
  CUBIC_METER_PER_HOUR = 'm³/h',
  KILOWATT = 'kW',
}

export type ThemeKey = 'dark' | 'light';
export type Language = 'de' | 'en';

interface PowermateContextType {
  setAppLocation: (pos: Position) => void;
  getAppLocation: () => Position;
  setPreferedUnit: (preferedUnit: PreferedUnit) => void;
  getPreferedUnit: () => PreferedUnit;
  setTheme: (str: ThemeKey) => void;
  getTheme: () => ThemeKey;
  setAppLanguage: (str: Language) => void;
  getAppLanguage: () => Language;
  getFilterOptions: () => string | null;
  setFilterOptions: (filter: string) => void;
}

export const PowermateContext = React.createContext<PowermateContextType>({
  getAppLocation: () => ({ lat: '', lon: '' }),
  setAppLocation: (_) => _,
  getPreferedUnit: () => PreferedUnit.KILOWATT,
  setPreferedUnit: (_) => _,
  getTheme: () => 'dark',
  setTheme: (_) => _,
  getAppLanguage: () => 'en',
  setAppLanguage: (_) => _,
  getFilterOptions: () => '',
  setFilterOptions: (_) => _,
});
