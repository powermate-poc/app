type PowermateRoutes = {
  homestack: {
    overview: string;
    settings: string;
    dataMode: string;
  };
};

type PowermateLanguages = {
  en: string;
  de: string;
};

type PowermateStringKeywords = {
  language: string;
  overview: string;
  news_analysis: string;
  settings: string;
  estimated_rate: string;
  location: string;
  languageButton: string;
  choose_language: string;
  enter_address: string;
  address_example: string;
  find_location: string;
  found_location: string;
  save_location: string;
  units: string;
  choose_unit: string;
  no_data: string;
  start_recording: string;
  stop_recording: string;
  theme: string;
  choose_theme: string;
  deviceButton: string;
  find_devices: string;
  add_new_device: string;
  used_devices: string;
  phone_example: string;
  device_error_message: string;
  location_error_message: string;
  device_name: string;
  wifi_name: string;
  configure_device: string;
  loading: string;
  connect: string;
  wifi_password: string;
  esp_provisioning: string;

  values_saved: string;
  invalid_values: string;
  filter_options: string;
  insert_valid_number: string;
  enterBinTime: string;
  enterWindowTime: string;

  min: string;
  mins: string;
  hour: string;
  hours: string;
  day: string;
  days: string;
  month: string;
  months: string;

  save: string;

  routes: PowermateRoutes;
  languages: PowermateLanguages;
};

type PowermateTranslation = {
  translation: PowermateStringKeywords;
};

export type PowermateLanguageDictionary = {
  en: PowermateTranslation;
  de: PowermateTranslation;
};
