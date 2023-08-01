import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert } from 'react-native';
import styled, { css } from 'styled-components/native';

import {
  CURRENT_GAS_RATE_API,
  DATA_INDEX,
  GAS_RATE_INDEX,
} from '../../../api/lambda/current-gasrate/CurrentGasRate.api';
import { FILTER_MAP } from '../../../api/lambda/current-gasrate/HistoricGasRate.api';
import { ConsumptionRate } from '../../../api/lambda/types/ConsumptionRate.types';
import { PowermateGraph } from '../../../components/Graph/PowermateGraph';
import { CenteredRow, Row, ScreenWrapper } from '../../../components/Layout/Layout.styled';
import { BoldTitle, ThinText, Title } from '../../../components/Text/PowermateText.styled';
import { PowermateContext, ThemeKey } from '../../../context/AppContext';
import { convertToPreferedUnit } from '../../../helpers/gasConversion';
import { THEME } from '../../../theme/theme';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { data, isFetched, isLoading } = useQuery<ConsumptionRate[], Error>(CURRENT_GAS_RATE_API());
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const { getPreferedUnit, getTheme, getFilterOptions } = useContext(PowermateContext);

  const currentGasRate = data?.at(DATA_INDEX)?.Data?.at(GAS_RATE_INDEX)?.ScalarValue;

  const filterOptions = FILTER_MAP.map((filter) => filter.window.toUpperCase());
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  return (
    <ScreenWrapper scrollEnabled={scrollEnabled}>
      <Row>
        <Title themeKey={getTheme()} adjustsFontSizeToFit={true} numberOfLines={1}>
          {t('estimated_rate')}
        </Title>
      </Row>
      {isFetched && isLoading ? (
        <ActivityIndicator />
      ) : (
        <ThinText themeKey={getTheme()}>
          {currentGasRate
            ? `${convertToPreferedUnit(parseFloat(currentGasRate), getPreferedUnit()).toFixed(3)} ${getPreferedUnit()}`
            : 'No data found'}
        </ThinText>
      )}
      <FilterContainer>
        {filterOptions.map((filterElem, index) =>
          selectedFilterIndex === index ? (
            <SelectedFilterOption themeKey={getTheme()} key={'SelectedLineGraphButton' + index}>
              <SelectedFilterText adjustsFontSizeToFit themeKey={getTheme()}>
                {filterElem}
              </SelectedFilterText>
            </SelectedFilterOption>
          ) : (
            <FilterOption
              themeKey={getTheme()}
              key={'LineGraphButton' + index}
              onPress={() => {
                if (index === 3 && getFilterOptions() === null)
                  Alert.alert('Error', 'Set your custom filter options in settings');
                else setSelectedFilterIndex(index);
              }}
            >
              <FilterText themeKey={getTheme()}>{filterElem}</FilterText>
            </FilterOption>
          ),
        )}
      </FilterContainer>

      <PowermateGraph setScrollEnabled={setScrollEnabled} filterOption={selectedFilterIndex} />
    </ScreenWrapper>
  );
};

const FilterContainer = styled(CenteredRow)`
  justify-content: space-around;
  padding: 30px 0px;
`;

const SelectedFilterOption = styled.TouchableOpacity<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    background-color: ${THEME[themeKey].colors.foreground};
    width: 50px;
    height: 30px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
  `}
`;

const SelectedFilterText = styled(BoldTitle)<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    color: ${THEME[themeKey].colors.background};
    font-size: 13px;
  `}
`;

const FilterOption = styled.TouchableOpacity<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    background-color: ${THEME[themeKey].colors.transparent};
    width: 50px;
    height: 30px;
    border-radius: 20px;
    border-color: ${THEME[themeKey].colors.foreground};
    border-width: 1px;
    align-items: center;
    justify-content: center;
  `}
`;

const FilterText = styled(BoldTitle)<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    color: ${THEME[themeKey].colors.foreground};
    font-size: 13px;
  `}
`;
