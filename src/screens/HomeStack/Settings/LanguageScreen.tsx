import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

import { PowermateButton } from '../../../components/Buttons/Buttons';
import { CenteredRow, FlexView, Row, ScreenWrapper } from '../../../components/Layout/Layout.styled';
import { Title } from '../../../components/Text/PowermateText.styled';
import { Language, PowermateContext } from '../../../context/AppContext';
import i18n from '../../../lang/languages';
import { THEME } from '../../../theme/theme';

export const LanguageScreen: React.FC = () => {
  const { getAppLanguage, setAppLanguage, getTheme } = useContext(PowermateContext);
  const { t } = useTranslation();

  const saveNewLanguage = async (language: Language) => {
    await i18n.changeLanguage(language, () => setAppLanguage(language));
  };

  const navigation = useNavigation();

  return (
    <ScreenWrapper>
      <Row>
        <PowermateButton
          widthPercentage={20}
          icon={<EvilIcons name="arrow-left" size={45} color={THEME[getTheme()].colors.foreground} />}
          onPress={() => navigation.goBack()}
          themeKey={getTheme()}
        />
        <FlexView>
          <Title themeKey={getTheme()} numberOfLines={1} allowFontScaling adjustsFontSizeToFit>
            {t('choose_language')}
          </Title>
        </FlexView>
      </Row>
      <PowermateButton
        widthPercentage={100}
        icon={
          getAppLanguage() === 'en' ? (
            <FeatherIcons name="check-circle" size={22} color={THEME[getTheme()].colors.foreground} />
          ) : null
        }
        onPress={async () => {
          await saveNewLanguage('en');
          navigation.goBack();
        }}
        text={t('languages.en')}
        themeKey={getTheme()}
      />
      <PowermateButton
        widthPercentage={100}
        icon={
          getAppLanguage() === 'de' ? (
            <FeatherIcons name="check-circle" size={22} color={THEME[getTheme()].colors.foreground} />
          ) : null
        }
        onPress={async () => {
          await saveNewLanguage('de');
          navigation.goBack();
        }}
        text={t('languages.de')}
        themeKey={getTheme()}
      />
      <Divider />
      <SpacedRow></SpacedRow>
    </ScreenWrapper>
  );
};

const SpacedRow = styled(CenteredRow)`
  margin: 25px 0px;
`;

const Divider = styled.View`
  margin: 10px;
`;
