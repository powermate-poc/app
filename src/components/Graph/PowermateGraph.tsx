import { useQuery } from '@tanstack/react-query';
import { curveStepBefore } from 'd3';
import React, { SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, PanResponder, View } from 'react-native';
import { Circle, G, Line, Rect, Text as SvgText } from 'react-native-svg';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';

import { HISTORIC_GAS_RATE_API } from '../../api/lambda/current-gasrate/HistoricGasRate.api';
import { ConsumptionRate } from '../../api/lambda/types/ConsumptionRate.types';
import { PowermateContext } from '../../context/AppContext';
import { getRelativeSize } from '../../helpers/relativeSize';
import { THEME } from '../../theme/theme';
import { ConsumptionGradient } from './ConsumptionGradient';
import { consumptionRateMapper } from './mappers';

type PowermateGraphProps = {
  setScrollEnabled: React.Dispatch<SetStateAction<boolean>>;
  filterOption: number;
};

interface TooltipProps {
  ticks: number[];
  x: (value: number) => number;
  y: (price: number) => number;
  positionX: number;
}

export const GRAPH_SIZE = 750;

export const PowermateGraph: React.FC<PowermateGraphProps> = ({ setScrollEnabled, filterOption }) => {
  const { data, refetch, isLoading } = useQuery<ConsumptionRate[], Error>(HISTORIC_GAS_RATE_API(filterOption));

  const { getTheme } = useContext(PowermateContext);

  useEffect(() => {
    refetch();
  }, [filterOption]);

  const [dates, gasConsumption] = consumptionRateMapper(data);

  const { getPreferedUnit } = useContext(PowermateContext);

  const size = useMemo((): number => dates.length, [dates]);

  const [positionX, setPositionX] = useState<number>(-1);

  const updatePosition = (x: number) => {
    const yAxisWidth = getRelativeSize(130, GRAPH_SIZE);
    const chartWidth = getRelativeSize(750, GRAPH_SIZE) - yAxisWidth;
    const xDistance = chartWidth / size;

    const clammpedX = Math.max(0, Math.min(x, chartWidth));

    const value = Math.min(Math.floor(clammpedX / xDistance), size - 1);

    setPositionX(value);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => true,
    onPanResponderGrant: (e) => {
      setScrollEnabled(false);
      updatePosition(e.nativeEvent.locationX);
      return true;
    },
    onPanResponderMove: (e) => {
      setScrollEnabled(false);
      updatePosition(e.nativeEvent.locationX);
      return true;
    },
    onPanResponderRelease: () => {
      setPositionX(-1);
      setScrollEnabled(true);
    },
  });

  if (isLoading) return <ActivityIndicator></ActivityIndicator>;

  const Tooltip = ({ x, y, ticks }: Partial<TooltipProps>) => {
    if (x === undefined || y === undefined || ticks === undefined || positionX <= -1) {
      return null;
    }

    const date = dates[positionX];

    return (
      <G x={x(positionX)} key="tooltip">
        <G
          x={positionX > size / 2 ? -getRelativeSize(310, GRAPH_SIZE) : getRelativeSize(10, GRAPH_SIZE)}
          y={y(gasConsumption[positionX]) - getRelativeSize(10, GRAPH_SIZE)}
        >
          <Rect
            y={-getRelativeSize(68, GRAPH_SIZE) / 2}
            rx={getRelativeSize(12, GRAPH_SIZE)}
            ry={getRelativeSize(12, GRAPH_SIZE)}
            width={getRelativeSize(300, GRAPH_SIZE)}
            height={getRelativeSize(96, GRAPH_SIZE)}
            fill={THEME[getTheme()].colors.background_contrast}
            opacity={0.8}
          />

          <SvgText
            x={getRelativeSize(20, GRAPH_SIZE)}
            fill={THEME[getTheme()].colors.foreground}
            opacity={0.65}
            fontSize={getRelativeSize(24, GRAPH_SIZE)}
          >
            {date}
          </SvgText>
          <SvgText
            x={getRelativeSize(20, GRAPH_SIZE)}
            y={getRelativeSize(24 + 20, GRAPH_SIZE)}
            fontSize={getRelativeSize(24, GRAPH_SIZE)}
            fontWeight="bold"
            fill={THEME[getTheme()].colors.foreground}
          >
            {`${gasConsumption[positionX]} ${getPreferedUnit()}`}
          </SvgText>
        </G>

        <G x={x(0)}>
          <Line
            y1={ticks[0]}
            y2={ticks[-1]}
            stroke={THEME[getTheme()].colors.blue_contrast}
            strokeWidth={getRelativeSize(4, GRAPH_SIZE)}
            strokeDasharray={[6, 3]}
          />
          <Circle
            cy={y(gasConsumption[positionX])}
            r={getRelativeSize(20 / 2, GRAPH_SIZE)}
            stroke={THEME[getTheme()].colors.blue_contrast}
            strokeWidth={getRelativeSize(2, GRAPH_SIZE)}
            fill={THEME[getTheme()].colors.blue_primary}
          />
        </G>
      </G>
    );
  };

  const verticalContentInset = { top: getRelativeSize(40, GRAPH_SIZE), bottom: getRelativeSize(40, GRAPH_SIZE) };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          width: getRelativeSize(750, GRAPH_SIZE),
          height: getRelativeSize(570, GRAPH_SIZE),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ flex: 1 }} {...panResponder.panHandlers}>
          <LineChart
            style={{ flex: 1 }}
            data={gasConsumption}
            curve={curveStepBefore}
            yMin={0}
            contentInset={{ ...verticalContentInset }}
            svg={{
              strokeWidth: 3,
              stroke: 'url(#gradient)',
            }}
          >
            <Tooltip positionX={positionX} />
            <ConsumptionGradient max={Math.max(...gasConsumption)} />
            <Grid svg={{ strokeWidth: 1, strokeOpacity: 0.35, stroke: THEME[getTheme()].colors.foreground_contrast }} />
          </LineChart>
        </View>

        <YAxis
          style={{ width: getRelativeSize(130, GRAPH_SIZE) }}
          data={gasConsumption}
          numberOfTicks={10}
          contentInset={verticalContentInset}
          svg={{ fontSize: getRelativeSize(20, GRAPH_SIZE), fill: THEME[getTheme()].colors.foreground_contrast }}
        />
      </View>

      <XAxis
        style={{
          width: '90%',
          height: getRelativeSize(20 * 5, GRAPH_SIZE),
        }}
        numberOfTicks={4}
        data={gasConsumption}
        formatLabel={(value: number) => dates[value]}
        svg={{
          fontSize: getRelativeSize(20, GRAPH_SIZE),
          fill: THEME[getTheme()].colors.foreground_contrast,
          textAnchor: 'start',
          rotation: 90,
        }}
      />
    </View>
  );
};
