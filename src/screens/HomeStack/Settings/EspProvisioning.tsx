import { AUTH_TOKEN_LAMBDA } from '@env';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import styled from 'styled-components/native';

import { OutlinedPowermateButton, PowermateButton } from '../../../components/Buttons/Buttons';
import { FlexView, Row, ScreenWrapper } from '../../../components/Layout/Layout.styled';
import { Title } from '../../../components/Text/PowermateText.styled';
import { TextInputField } from '../../../components/TextInputField/TextInputField';
import { PowermateContext } from '../../../context/AppContext';
import { THEME } from '../../../theme/theme';

export interface EspResponse {
  name: string;
  arn: string;
  pem: string;
  public_key: string;
  private_key: string;
  root_ca: string;
}

export const EspProvisioning: React.FC = () => {
  const { getTheme } = useContext(PowermateContext);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [ssid, setSsid] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');
  const [deviceName, setDeviceName] = useState<string | undefined>('');

  const [showConnect, setShowConnect] = useState(false);

  const {
    data: deviceInfo,
    mutate: createDevice,
    isLoading: isFetchingDeviceProvData,
  } = useMutation({
    mutationKey: ['DeviceProv'],
    mutationFn: async (): Promise<EspResponse> =>
      axios
        .put(
          'https://a23ypr2qzg.execute-api.eu-central-1.amazonaws.com/api/devices/' + deviceName,
          {},
          {
            headers: { Authorization: AUTH_TOKEN_LAMBDA, 'Content-Type': 'application/json' },
          },
        )
        .then((res) => res.data),
    onError: (err: AxiosError) => {
      Alert.alert('Error', `Something went wrong when trying to create the ESP: ${err.response?.data}`);
    },
    onSuccess: () => {
      Alert.alert('Info', 'Connect to the WiFi "ESP123456" and press connect');
      setShowConnect(true);
    },
  });

  const buildParams = (pem: string, private_key: string, root_ca: string, aws: string) => {
    const paramsObj = {
      deviceId: deviceName,
      s: ssid,
      p: password,
      awsEndpoint: aws,
      clientCert: pem,
      privateKey: private_key,
      rootCa: root_ca,
    };
    return paramsObj;
  };

  const { mutate: fetchEspConfig, isLoading: espConfigLoading } = useMutation({
    mutationKey: ['EspConfig'],
    mutationFn: async () =>
      axios
        .get('http://10.0.1.1/wifisave', {
          params: buildParams(
            deviceInfo?.pem || '',
            deviceInfo?.private_key || '',
            deviceInfo?.root_ca || '',
            'a36kfi0wac9dw-ats.iot.eu-central-1.amazonaws.com',
          ),
          timeout: 5000,
          timeoutErrorMessage: 'Timeout. Check your connectivity',
        })
        .then((res) => res.data),
    onError: (err: AxiosError) =>
      Alert.alert('Error', `Something went wrong when trying to configure the device: ${err.message}`),
    onSuccess: () =>
      Alert.alert(
        'Info',
        'Your ESP is now configured and will try to establish a connection to our servers, please wait, it could take a few minutes.',
      ),
  });

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
            {t('esp_provisioning')}
          </Title>
        </FlexView>
      </Row>
      <Divider />
      <TextInputField setText={setDeviceName} error={false} placeholder={t('device_name')} />
      <Divider />
      <TextInputField setText={setSsid} error={false} placeholder={t('wifi_name')} />
      <Divider />
      <TextInputField
        setText={setPassword}
        error={false}
        placeholder={t('wifi_password')}
        type={'default'}
        isPassword
      />
      <Divider />
      {!showConnect ? (
        <OutlinedPowermateButton
          onPress={() => {
            if (!isFetchingDeviceProvData) createDevice();
          }}
          text={isFetchingDeviceProvData ? t('loading') : t('configure_device')}
        ></OutlinedPowermateButton>
      ) : (
        <>
          <Divider />
          <OutlinedPowermateButton
            onPress={() => {
              if (!espConfigLoading) fetchEspConfig();
            }}
            text={espConfigLoading ? t('Loading...') : t('connect')}
          ></OutlinedPowermateButton>
        </>
      )}
    </ScreenWrapper>
  );
};

const Divider = styled.View`
  margin: 10px;
`;
