import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import styled from 'styled-components/native';

import { PowermateButton } from '../../../components/Buttons/Buttons';
import { CenteredRow, Divider, FlexView, ScreenWrapper } from '../../../components/Layout/Layout.styled';
import { Title } from '../../../components/Text/PowermateText.styled';
import { PowermateContext, ThemeKey } from '../../../context/AppContext';
import { THEME } from '../../../theme/theme';

export const ThemeScreen: React.FC = () => {
  const { setTheme, getTheme } = useContext(PowermateContext);

  const [selectedTheme, setSelectedTheme] = useState<string>(getTheme());

  const navigation = useNavigation();

  const saveNewTheme = async (theme: ThemeKey) => {
    setTheme(theme);
  };

  const styles = StyleSheet.create({
    active: {
      backgroundColor: THEME[getTheme()].colors.foreground,
      borderColor: THEME[getTheme()].colors.foreground,
      borderWidth: 1,
      zIndex: 1,
    },
    inactive: {
      backgroundColor: THEME[getTheme()].colors.background,
      borderColor: THEME[getTheme()].colors.foreground,
      borderWidth: 1,
      zIndex: -1,
    },
    activeText: {
      color: THEME[getTheme()].colors.background,
    },
    inactiveText: {
      color: THEME[getTheme()].colors.foreground,
    },
  }); // Stylesheet needed for changing style on click

  return (
    <ScreenWrapper>
      <CenteredRow>
        <PowermateButton
          widthPercentage={20}
          icon={<Icon name="arrow-left" size={45} color={THEME[getTheme()].colors.foreground} />}
          onPress={() => navigation.goBack()}
        />
        <FlexView>
          <Title themeKey={getTheme()} numberOfLines={1} allowFontScaling adjustsFontSizeToFit>
            {t('choose_theme')}
          </Title>
        </FlexView>
      </CenteredRow>
      <Divider />
      <CenteredRow>
        <LeftButton
          underlayColor={THEME['dark'].colors.foreground}
          onPress={async () => {
            saveNewTheme('dark');
            setSelectedTheme('dark');
          }}
          style={selectedTheme === 'dark' ? styles.active : styles.inactive}
        >
          <Title themeKey={getTheme()} style={selectedTheme === 'dark' ? styles.activeText : styles.inactiveText}>
            {'Dark'}
          </Title>
        </LeftButton>
        <RightButton
          underlayColor={THEME['light'].colors.foreground}
          onPress={async () => {
            saveNewTheme('light');
            setSelectedTheme('light');
          }}
          style={selectedTheme === 'light' ? styles.active : styles.inactive}
        >
          <Title themeKey={getTheme()} style={selectedTheme === 'light' ? styles.activeText : styles.inactiveText}>
            {'Light'}
          </Title>
        </RightButton>
      </CenteredRow>
    </ScreenWrapper>
  );
};

const LeftButton = styled.TouchableHighlight`
  border-radius: 15px;
  width: 40%;
  justify-content: center;
  align-items: center;
  right: -15px;
`;

const RightButton = styled.TouchableHighlight`
  border-radius: 15px;
  width: 40%;
  justify-content: center;
  align-items: center;
  left: -15px;
`;
