import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import React, { useContext, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import styled, { css } from 'styled-components/native';

import { GEOCODE_API } from '../../../api/geocode/Geocode.api';
import { InvertedPowermateButton, OutlinedPowermateButton, PowermateButton } from '../../../components/Buttons/Buttons';
import {
  CenteredRow,
  CenteredRowWithPadding,
  Divider,
  FlexView,
  Row,
  ScreenWrapper,
} from '../../../components/Layout/Layout.styled';
import { BoldTitle, ThinText, Title } from '../../../components/Text/PowermateText.styled';
import { TextInputField } from '../../../components/TextInputField/TextInputField';
import { PowermateContext, ThemeKey } from '../../../context/AppContext';
import { THEME } from '../../../theme/theme';

export const LocationScreen: React.FC = () => {
  const { getTheme } = useContext(PowermateContext);

  const { setAppLocation } = useContext(PowermateContext);

  const [address, setAddress] = useState<string | undefined>(undefined);

  const navigation = useNavigation();
  const { data, isError, isLoading, isFetching, refetch } = useQuery(GEOCODE_API(encodeURI(address || '')));

  const saveNewPosition = async (lat: string, lon: string) => {
    setAppLocation({ lat, lon });
  };

  return (
    <ScreenWrapper>
      <Row>
        <PowermateButton
          widthPercentage={20}
          icon={<Icon name="arrow-left" size={45} color={THEME[getTheme()].colors.foreground} />}
          onPress={() => navigation.goBack()}
          themeKey={getTheme()}
        />
        <FlexView>
          <Title themeKey={getTheme()} numberOfLines={1} adjustsFontSizeToFit>
            {t('enter_address')}
          </Title>
        </FlexView>
      </Row>
      <Divider />
      <FlexView>
        <TextInputField
          setText={setAddress}
          error={data?.length === 0 || isError}
          placeholder={t('address_example')}
          errorText={t('location_error_message') || ''}
        />
      </FlexView>
      <SpacedRow>
        <InvertedPowermateButton
          text={t('find_location').toString()}
          onPress={() => {
            refetch();
          }}
          widthPercentage={90}
          themeKey={getTheme()}
        />
      </SpacedRow>
      {!isLoading && !isFetching && data && data.length !== 0 && (
        <>
          <ResponseWrapper themeKey={getTheme()}>
            <BoldTitle themeKey={getTheme()} adjustsFontSizeToFit numberOfLines={1}>
              {t('found_location')}
            </BoldTitle>
            <CenteredRowWithPadding>
              <ThinText themeKey={getTheme()}>{data[0].display_name}</ThinText>
            </CenteredRowWithPadding>
          </ResponseWrapper>
          <CenteredRowWithPadding>
            <OutlinedPowermateButton
              themeKey={getTheme()}
              text={t('save_location')}
              onPress={async () => {
                saveNewPosition(data[0].lat, data[0].lon);
                navigation.goBack();
              }}
            />
          </CenteredRowWithPadding>
        </>
      )}
      {isLoading && isFetching && <ActivityIndicator />}
    </ScreenWrapper>
  );
};

const SpacedRow = styled(CenteredRow)`
  margin: 25px 0px;
`;

const ResponseWrapper = styled.View<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    background-color: ${THEME[themeKey].colors.background};
    border-radius: 15px;
    padding: 15px;
    margin: 15px;
    border: 2px ${THEME[themeKey].colors.green}; solid;
  `}
`;
