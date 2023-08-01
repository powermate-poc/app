import { AUTH_TOKEN, INGRESS_API } from '@env';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as Device from 'expo-device';
import { Magnetometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MAGNETOMETER_API_ID, ONE_SEC_IN_MS } from '../../../api/constants';
import { OutlinedPowermateButton } from '../../../components/Buttons/Buttons';
import { ScreenWrapper } from '../../../components/Layout/Layout.styled';
import { ThinText } from '../../../components/Text/PowermateText.styled';
import { PowermateContext } from '../../../context/AppContext';
import { THEME } from '../../../theme/theme';

export const DataModeScreen: React.FC = () => {
  const { t } = useTranslation();
  const DEFAULT_DEVICE_NAME = 'DummyDevice';
  const { getTheme } = useContext(PowermateContext);

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [isRecording, setIsRecording] = useState(false);

  type Measurement = {
    name: string;
    value: number;
  };

  type Message = {
    measurements: Measurement[];
  };

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const _subscribe = () => {
    Magnetometer.setUpdateInterval(ONE_SEC_IN_MS);
    setSubscription(
      Magnetometer.addListener((result) => {
        setData(result);
      }),
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useFocusEffect(
    useCallback(() => {
      _subscribe();
      return () => _unsubscribe();
    }, []),
  );

  useQuery({
    queryKey: [MAGNETOMETER_API_ID],
    queryFn: async (): Promise<Message> => {
      return axios
        .post(
          INGRESS_API + (Device.modelName || DEFAULT_DEVICE_NAME).replace(/\s/g, ''),
          {
            measurements: [
              { name: 'x', value: x },
              { name: 'y', value: y },
              { name: 'z', value: z },
              { name: 'abs', value: Math.sqrt(x * x + y * y + z * z) },
            ],
          },
          { headers: { Authorization: AUTH_TOKEN, 'Content-Type': 'application/json' } },
        )
        .then((res) => res.data);
    },
    enabled: isRecording,
    refetchInterval: ONE_SEC_IN_MS,
  });

  return (
    <ScreenWrapper>
      <ThinText adjustsFontSizeToFit={true} numberOfLines={1} themeKey={getTheme()}>
        x: {x.toFixed(4)}
      </ThinText>
      <ThinText adjustsFontSizeToFit={true} numberOfLines={1} themeKey={getTheme()}>
        y: {y.toFixed(4)}
      </ThinText>
      <ThinText adjustsFontSizeToFit={true} numberOfLines={1} themeKey={getTheme()}>
        z: {z.toFixed(4)}
      </ThinText>
      <OutlinedPowermateButton
        onPress={() => setIsRecording((prev) => !prev)}
        text={isRecording ? t('stop_recording') : t('start_recording')}
        color={isRecording ? THEME[getTheme()].colors.yellow : THEME[getTheme()].colors.green}
      ></OutlinedPowermateButton>
    </ScreenWrapper>
  );
};
