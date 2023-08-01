import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { PowermateLanguageDictionary } from './languages.types';

const resources: PowermateLanguageDictionary = {
  en: {
    translation: {
      language: 'en',
      overview: 'Overview',
      news_analysis: 'News Analysis',
      settings: 'Settings',
      estimated_rate: 'Estimated Gas Consumption Rate:',
      location: 'Location',
      languageButton: 'Language',
      choose_language: 'Choose your language',
      enter_address: 'Enter your address',
      address_example: 'For example: Lothstraße 64, 80335 München',
      find_location: 'Find location',
      found_location: 'Found location',
      save_location: 'Save location',
      units: 'Units',
      choose_unit: 'Choose your preferred units',
      no_data: 'No data found',
      start_recording: 'Start recording data',
      stop_recording: 'Stop recording data',
      theme: 'Theme',
      choose_theme: 'Choose your theme',
      deviceButton: 'Devices',
      find_devices: 'Find Devices',
      add_new_device: 'Add new Device',
      used_devices: 'Added Devices:',
      phone_example: 'For example: Gasmeter1',
      device_error_message: 'Your Device needs a name',
      location_error_message: 'The address could not be found',
      device_name: 'Device name',
      wifi_name: 'WiFi name',
      configure_device: 'Configure device',
      loading: 'Loading...',
      connect: 'Connect',
      wifi_password: 'WiFi password',
      esp_provisioning: 'ESP Provisioning',

      values_saved: 'Values saved',
      invalid_values: 'Invalid values',
      filter_options: 'Filter options',
      insert_valid_number: 'Insert a valid number',
      enterBinTime: 'Enter bin time',
      enterWindowTime: 'Enter window time',

      min: 'minute',
      mins: 'minutes',
      hour: 'hour',
      hours: 'hours',
      day: 'day',
      days: 'days',
      month: 'month',
      months: 'months',

      save: 'Save',

      routes: {
        homestack: {
          overview: 'Overview',
          settings: 'Settings',
          dataMode: 'Data Mode',
        },
      },

      languages: {
        en: 'English',
        de: 'German',
      },
    },
  },
  de: {
    translation: {
      language: 'de',
      overview: 'Überblick',
      news_analysis: 'Neuste Analysen',
      settings: 'Einstellungen',
      estimated_rate: 'Geschätzte Gasverbrauchsrate:',
      location: 'Wohnort',
      languageButton: 'Sprache',
      choose_language: 'Wähle deine Sprache',
      enter_address: 'Adresseingabe',
      address_example: 'Zum Beispiel: Lothstraße 64, 80335 München',
      find_location: 'Finde Wohnort',
      found_location: 'Wohnort gefunden',
      save_location: 'Wohnort speichern',
      units: 'Einheiten',
      choose_unit: 'Wähle eine bevorzugte Einheit',
      no_data: 'Keine aktuellen Daten',
      start_recording: 'Starte Aufzeichnung',
      stop_recording: 'Stoppe Aufzeichnung',
      theme: 'Farbpalette',
      choose_theme: 'Wähle deine Farbpalette',
      deviceButton: 'Geräte',
      find_devices: 'Finde Geräte',
      add_new_device: 'Gerät Hinzufügen',
      used_devices: 'Hinzugefügte Geräte:',
      phone_example: 'Zum Beispiel: Gaszähler1',
      device_error_message: 'Dein Gerät braucht einen Namen',
      location_error_message: 'Die Adresse konnte nicht gefunden werden',
      device_name: 'Gerätename',
      wifi_name: 'WLAN-Name',
      configure_device: 'Gerätekonfiguration',
      loading: 'Lädt...',
      connect: 'Verbinden',
      wifi_password: 'WLAN Passwort',
      esp_provisioning: 'ESP Einrichtung',

      values_saved: 'Werte gespeichert',
      invalid_values: 'Werte nicht gültig',
      filter_options: 'Filteroptionen',
      insert_valid_number: 'Deine Nummer ist nicht gültig',
      enterBinTime: 'Gib deine Bin–Zeit ein',
      enterWindowTime: 'Gib deine Window-Zeit ein',

      min: 'Minute',
      mins: 'Minuten',
      hour: 'Stunde',
      hours: 'Stunden',
      day: 'Tag',
      days: 'Tage',
      month: 'Monat',
      months: 'Monate',

      save: 'Speichern',

      routes: {
        homestack: {
          overview: 'Übersicht',
          settings: 'Einstellungen',
          dataMode: 'Datenmodus',
        },
      },

      languages: {
        en: 'Englisch',
        de: 'Deutsch',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false, // Escaping ist bereits durch React gesichert
  },
});

export default i18n;
