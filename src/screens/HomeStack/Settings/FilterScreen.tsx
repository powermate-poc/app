import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/EvilIcons';
import styled from 'styled-components/native';

import { OutlinedPowermateButton, PowermateButton } from '../../../components/Buttons/Buttons';
import { Divider, FlexView, Row } from '../../../components/Layout/Layout.styled';
import { Title } from '../../../components/Text/PowermateText.styled';
import { TextInputField } from '../../../components/TextInputField/TextInputField';
import { BIN_INDEX, FILTER_SEPARATOR, WINDOW_INDEX } from '../../../constants';
import { PowermateContext } from '../../../context/AppContext';
import { THEME } from '../../../theme/theme';

const IS_NUMBER_REGEX = /^\d+$/;

export const FilterScreen: React.FC = () => {
  const { getTheme, getFilterOptions } = useContext(PowermateContext);
  const { t } = useTranslation();

  const [binTime, setBinTime] = useState<string | undefined>(getFilterOptions()?.split(FILTER_SEPARATOR)[BIN_INDEX]);
  const [hourString, setHourString] = useState<string>('hours');
  const [minString, setMinString] = useState<string>('mins');
  const [dayString, setDayString] = useState<string>('days');
  const [monthString, setMonthString] = useState<string>('months');
  const [windowTime, setWindowTime] = useState<string | undefined>(
    getFilterOptions()?.split(FILTER_SEPARATOR)[WINDOW_INDEX],
  );

  const [openBinPicker, setOpenBinPicker] = useState(false);
  const [openWindowPicker, setOpenWindowPicker] = useState(false);
  const [binPickerValue, setBinPickerValue] = useState<string | null>(null);
  const [windowPickerValue, setWindowPickerValue] = useState<string | null>(null);

  const { setFilterOptions } = useContext(PowermateContext);

  const navigation = useNavigation();

  const saveFilterTimes = async () => {
    if (binTime?.length !== 0 && windowTime?.length !== 0 && binPickerValue && windowPickerValue) {
      setFilterOptions(`${binTime}${binPickerValue}$${windowTime}${windowPickerValue}`);
      Alert.alert('Info', t('values_saved') || '');
      navigation.goBack();
    } else {
      Alert.alert('Info', t('invalid_values') || '');
    }
  };

  return (
    <Container>
      <Row>
        <PowermateButton
          widthPercentage={20}
          icon={<Icon name="arrow-left" size={45} color={THEME[getTheme()].colors.foreground} />}
          onPress={() => navigation.goBack()}
          themeKey={getTheme()}
        />
        <FlexView>
          <Title themeKey={getTheme()} numberOfLines={1} adjustsFontSizeToFit>
            {t('filter_options')}
          </Title>
        </FlexView>
      </Row>
      <Divider />
      <Row style={{ zIndex: 2 }}>
        <InputFieldContainer>
          <TextInputField
            setText={(text) => {
              setBinTime(text);
              const binTimeNumber = Number(text);
              if (binTimeNumber > 1) {
                setHourString('hours');
                setMinString('mins');
              } else {
                setHourString('hour');
                setMinString('min');
              }
            }}
            error={binTime?.length === 0 || !IS_NUMBER_REGEX.test(binTime || '')}
            errorText={t('insert_valid_number') || ''}
            placeholder={t('enterBinTime')}
            numeric
          />
        </InputFieldContainer>

        <DropDownPicker
          placeholder="-"
          open={openBinPicker}
          value={binPickerValue}
          items={[
            { label: t(minString) || hourString, value: 'm' },
            { label: t(hourString) || hourString, value: 'h' },
          ]}
          setOpen={setOpenBinPicker}
          setValue={setBinPickerValue}
          style={{
            width: '35%',
            backgroundColor: THEME[getTheme()].colors.background,
            borderColor: THEME[getTheme()].colors.foreground,
          }}
          dropDownContainerStyle={{
            width: '35%',
            backgroundColor: THEME[getTheme()].colors.background,
            borderColor: THEME[getTheme()].colors.foreground,
          }}
          textStyle={{
            color: THEME[getTheme()].colors.foreground,
          }}
          showArrowIcon={true}
          dropDownDirection="BOTTOM"
        />
      </Row>
      <Divider />
      <Row style={{ zIndex: 1 }}>
        <InputFieldContainer>
          <TextInputField
            setText={(text) => {
              setWindowTime(text);
              const binTimeNumber = Number(text);
              if (binTimeNumber > 1) {
                setHourString('hours');
                setMinString('mins');
                setDayString('days');
                setMonthString('months');
              } else {
                setHourString('hour');
                setMinString('min');
                setDayString('day');
                setMonthString('month');
              }
            }}
            error={binTime?.length === 0 || !IS_NUMBER_REGEX.test(windowTime || '')}
            errorText={t('insert_valid_number') || ''}
            placeholder={t('enterWindowTime') || ''}
            numeric
          />
        </InputFieldContainer>

        <DropDownPicker
          placeholder="-"
          open={openWindowPicker}
          value={windowPickerValue}
          items={[
            { label: t(minString) || minString, value: 'm' },
            { label: t(hourString) || hourString, value: 'h' },
            { label: t(dayString) || dayString, value: 'd' },
            { label: t(monthString) || monthString, value: '30d' },
          ]}
          setOpen={setOpenWindowPicker}
          setValue={setWindowPickerValue}
          style={{
            width: '35%',
            backgroundColor: THEME[getTheme()].colors.background,
            borderColor: THEME[getTheme()].colors.foreground,
          }}
          dropDownContainerStyle={{
            width: '35%',
            backgroundColor: THEME[getTheme()].colors.background,
            borderColor: THEME[getTheme()].colors.foreground,
          }}
          textStyle={{
            color: THEME[getTheme()].colors.foreground,
          }}
          showArrowIcon={true}
          dropDownDirection="BOTTOM"
        />
      </Row>
      <Divider></Divider>
      <OutlinedPowermateButton
        text={t('save')}
        onPress={saveFilterTimes}
        themeKey={getTheme()}
      ></OutlinedPowermateButton>
    </Container>
  );
};

const Container = styled.View`
  padding: 15px;
  width: 100%;
`;

const InputFieldContainer = styled.View`
  width: 50%;
`;
