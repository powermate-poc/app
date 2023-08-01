import React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

import { gasConsumptionToRgb } from '../../helpers/dataToRgb';

export const ConsumptionGradient = ({ max }: { max: number }): JSX.Element => (
  <Defs key={'gradient'}>
    <LinearGradient id={'gradient'} x1={'0%'} y1={'100%'} x2={'0%'} y2={'0%'}>
      <Stop offset={'0'} stopColor={gasConsumptionToRgb(0)} />
      <Stop offset={'100%'} stopColor={gasConsumptionToRgb(max)} />
    </LinearGradient>
  </Defs>
);
