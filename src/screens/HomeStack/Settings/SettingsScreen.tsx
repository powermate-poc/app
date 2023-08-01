import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { default as AntIcon } from 'react-native-vector-icons/AntDesign';
import { default as EvilIcon } from 'react-native-vector-icons/EvilIcons';
import { default as FontAwesomeIcon } from 'react-native-vector-icons/FontAwesome';
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';

import { PowermateButton } from '../../../components/Buttons/Buttons';
import { ScreenWrapper } from '../../../components/Layout/Layout.styled';
import { PowermateContext } from '../../../context/AppContext';
import { SettingsRoutes } from '../../../navigation/Routes';
import { THEME } from '../../../theme/theme';

export const SettingsScreen: React.FC = () => {
  const { getTheme } = useContext(PowermateContext);
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
      <PowermateButton
        icon={<EvilIcon name="location" allowFontScaling size={25} color={THEME[getTheme()].colors.foreground} />}
        onPress={() => navigation.navigate(SettingsRoutes.Location as never)}
        text={t('location')}
        themeKey={getTheme()}
      />
      <PowermateButton
        icon={<AntIcon name="linechart" allowFontScaling size={25} color={THEME[getTheme()].colors.foreground} />}
        onPress={() => navigation.navigate(SettingsRoutes.Units as never)}
        text={t('units')}
        themeKey={getTheme()}
      />
      <PowermateButton
        icon={
          <MaterialCommunityIcon
            name="theme-light-dark"
            allowFontScaling
            size={25}
            color={THEME[getTheme()].colors.foreground}
          />
        }
        onPress={() => navigation.navigate(SettingsRoutes.Theme as never)}
        text={t('theme')}
        themeKey={getTheme()}
      />
      <PowermateButton
        icon={
          <FontAwesomeIcon name="language" allowFontScaling size={25} color={THEME[getTheme()].colors.foreground} />
        }
        onPress={() => navigation.navigate(SettingsRoutes.Language as never)}
        text={t('languageButton')}
        themeKey={getTheme()}
      />
      <PowermateButton
        icon={<FontAwesomeIcon name="wrench" allowFontScaling size={25} color={THEME[getTheme()].colors.foreground} />}
        onPress={() => navigation.navigate(SettingsRoutes.EspProvisioning as never)}
        text={t('esp_provisioning')}
        themeKey={getTheme()}
      />
      <PowermateButton
        icon={
          <MaterialCommunityIcon
            name="devices"
            allowFontScaling
            size={25}
            color={THEME[getTheme()].colors.foreground}
          />
        }
        onPress={() => navigation.navigate(SettingsRoutes.Device as never)}
        text={t('deviceButton')}
        themeKey={getTheme()}
      />
      <PowermateButton
        icon={<FontAwesomeIcon name="filter" allowFontScaling size={25} color={THEME[getTheme()].colors.foreground} />}
        onPress={() => navigation.navigate(SettingsRoutes.Filter as never)}
        text={'Filter'}
        themeKey={getTheme()}
      />
    </ScreenWrapper>
  );
};
