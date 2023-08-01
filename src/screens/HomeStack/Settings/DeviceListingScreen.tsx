import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { GET_DEVICE_API } from '../../../api/lambda/devices.api.tsx/GetDevices';
import { Device } from '../../../api/lambda/types/Device.types';
import { PowermateButton } from '../../../components/Buttons/Buttons';
import { extractDeviceNames } from '../../../components/Graph/mappers';
import { FlexView, Row } from '../../../components/Layout/Layout.styled';
import { Item, Subtitle, Title } from '../../../components/Text/PowermateText.styled';
import { PowermateContext } from '../../../context/AppContext';
import { THEME } from '../../../theme/theme';

export const DeviceListingScreen: React.FC = () => {
  const { data, error, isLoading } = useQuery<Device[], Error>(GET_DEVICE_API());
  const { getTheme } = useContext(PowermateContext);
  const { t } = useTranslation();

  const devices = extractDeviceNames(data);
  const navigation = useNavigation();

  if (isLoading) return <ActivityIndicator></ActivityIndicator>;

  return (
    <FlexView>
      <Row>
        <PowermateButton
          widthPercentage={20}
          icon={<EvilIcons name="arrow-left" size={45} color={THEME[getTheme()].colors.foreground} />}
          onPress={() => navigation.goBack()}
          themeKey={getTheme()}
        />
        <FlexView>
          <Title themeKey={getTheme()} numberOfLines={1} allowFontScaling adjustsFontSizeToFit>
            {t('deviceButton')}
          </Title>
        </FlexView>
      </Row>
      <Row>
        <Subtitle themeKey={getTheme()} numberOfLines={1} allowFontScaling adjustsFontSizeToFit>
          {t('used_devices')}
        </Subtitle>
      </Row>
      <Row>
        <Text></Text>
      </Row>
      <FlatList
        data={devices}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Item themeKey={getTheme()}>{item}</Item>}
      />
    </FlexView>
  );
};
