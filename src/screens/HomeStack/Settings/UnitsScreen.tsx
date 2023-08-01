import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import styled from 'styled-components/native';

import { PowermateButton } from '../../../components/Buttons/Buttons';
import { CenteredRow, Divider, FlexView, ScreenWrapper } from '../../../components/Layout/Layout.styled';
import { Title } from '../../../components/Text/PowermateText.styled';
import { PowermateContext, PreferedUnit } from '../../../context/AppContext';
import { THEME } from '../../../theme/theme';

export const UnitsScreen: React.FC = () => {
  const { getTheme } = useContext(PowermateContext);

  const { t } = useTranslation();
  const [CUBIC_METER_INDEX, KILOWATT_INDEX] = [0, 1];

  const { setPreferedUnit, getPreferedUnit } = useContext(PowermateContext);

  const [selectedGasUnit, setSelectedGasUnit] = useState<number>(
    getPreferedUnit() === PreferedUnit.CUBIC_METER_PER_HOUR ? 0 : 1,
  );

  const navigation = useNavigation();

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
            {t('choose_unit')}
          </Title>
        </FlexView>
      </CenteredRow>
      <Divider />
      <CenteredRow>
        <LeftButton
          underlayColor={THEME[getTheme()].colors.foreground}
          onPress={async () => {
            setPreferedUnit(PreferedUnit.CUBIC_METER_PER_HOUR);
            setSelectedGasUnit(CUBIC_METER_INDEX);
          }}
          style={selectedGasUnit === CUBIC_METER_INDEX ? styles.active : styles.inactive}
        >
          <Title
            themeKey={getTheme()}
            style={selectedGasUnit === CUBIC_METER_INDEX ? styles.activeText : styles.inactiveText}
          >
            {PreferedUnit.CUBIC_METER_PER_HOUR}
          </Title>
        </LeftButton>
        <RightButton
          underlayColor={THEME[getTheme()].colors.foreground}
          onPress={async () => {
            setPreferedUnit(PreferedUnit.KILOWATT);
            setSelectedGasUnit(KILOWATT_INDEX);
          }}
          style={selectedGasUnit === KILOWATT_INDEX ? styles.active : styles.inactive}
        >
          <Title
            themeKey={getTheme()}
            style={selectedGasUnit === KILOWATT_INDEX ? styles.activeText : styles.inactiveText}
          >
            {PreferedUnit.KILOWATT}
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
