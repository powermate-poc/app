import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

import { MIN_IN_MS } from '../../api/constants';
import { Weather, WEATHER_API_ID } from '../../api/weather/Weather.api';
import { PowermateContext } from '../../context/AppContext';
import { celsiusToRgb } from '../../helpers/dataToRgb';
import { RootStackRoutes } from '../../navigation/Routes';
import { THEME } from '../../theme/theme';
import { CenteredRow, FlexView } from '../Layout/Layout.styled';
import PowermateLogo from '../Logo/Logo';
import { Title } from '../Text/PowermateText.styled';

type ThemeKey = 'dark' | 'light';

export const Header: React.FC = () => {
  const { getAppLocation } = useContext(PowermateContext);

  const { getTheme } = useContext(PowermateContext);
  const navigation = useNavigation();

  const { data, isError, refetch } = useQuery<Weather, Error>({
    queryKey: [WEATHER_API_ID],
    queryFn: async (): Promise<Weather> => {
      return axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${getAppLocation().lat}&longitude=${
            getAppLocation().lon
          }&current_weather=true`,
        )
        .then((res) => res.data);
    },
    refetchInterval: MIN_IN_MS,
    enabled: false,
  });

  useEffect(() => {
    const { lat, lon } = getAppLocation();
    if (lat !== '' && lon !== '') refetch();
  }, [getAppLocation]);

  return (
    <HeaderCenteredRow themeKey={getTheme()}>
      <Title themeKey={getTheme()}>PowerMate</Title>
      <TouchableOpacity onPress={() => navigation.navigate(RootStackRoutes.Tetris as never)}>
        <PowermateLogo viewBox="-10 -30 160 160" height={100} width={100} color={THEME[getTheme()].colors.foreground} />
      </TouchableOpacity>
      {data && !isError && (
        <FlexView>
          <Temperature themeKey={getTheme()} temperature={data?.current_weather.temperature}>
            {data?.current_weather.temperature}°C
          </Temperature>
        </FlexView>
      )}
    </HeaderCenteredRow>
  );
};

const HeaderCenteredRow = styled(CenteredRow)<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    justify-content: flex-start;
    padding: 30px 0px 0px 15px;
    background-color: ${THEME[themeKey].colors.background};
  `}
`;

const Temperature = styled(Title)<{ temperature: number }>`
  ${({ temperature }) => css`
    text-align: center;
    color: ${celsiusToRgb(temperature)};
  `}
`;
