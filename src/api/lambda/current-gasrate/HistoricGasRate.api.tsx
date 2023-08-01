import { AUTH_TOKEN_LAMBDA } from '@env';
import { UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { PowermateContext } from '../../../context/AppContext';
import { LAMBDA_BASE_URL } from '../constants';
import { ConsumptionRate } from '../types/ConsumptionRate.types';

const HISTORIC_GAS_RATE_API_ID = 'HISTORIC_GAS_RATE_API';

const ENDPOINT = LAMBDA_BASE_URL + '/passthrough';

export const GAS_RATE_INDEX = 1;
export const DATA_INDEX = 0;

const WINDOW_KEYWORD = '$WINDOW';
const BIN_KEYWORD = '$BIN';
const DEVICE_ID_KEYWORD = '$DEVICE_ID';

const TEN_SEC_IN_MS = 10_000;

export const FILTER_MAP = [
  { window: '1h', bin: '1m' },
  { window: '6h', bin: '10m' },
  { window: '1d', bin: '30m' },
  { window: 'CSTM', bin: 'CUSTOM' },
];

export const HISTORIC_GAS_RATE_API = (
  filterOption: number,
  deviceId = 'gasmeter-raspi-villa-paganini',
): UseQueryOptions<ConsumptionRate[], Error> => {
  const { getFilterOptions } = useContext(PowermateContext);

  const [cstmBin, cstmWindow] = (getFilterOptions() || '1h$1d').split('$');
  const CUSTOM_INDEX = 3;

  return {
    queryKey: [HISTORIC_GAS_RATE_API_ID],
    queryFn: async (): Promise<ConsumptionRate[]> => {
      return axios
        .post(
          ENDPOINT,
          {
            query: `SELECT
            BIN(time, ${filterOption === CUSTOM_INDEX ? cstmBin : FILTER_MAP[filterOption].bin}) AS time_sec,
            MAX(measure_value::double) AS consumption_rate
          FROM "powermate_dev_timestream"."powermate_dev_timestream_table"
          WHERE time BETWEEN ago(${
            filterOption === CUSTOM_INDEX ? cstmWindow : FILTER_MAP[filterOption].window
          }) AND now()
            AND measure_name = 'consumption_rate'
            AND device_id = '${deviceId}'
          GROUP BY BIN(time, ${filterOption === CUSTOM_INDEX ? cstmBin : FILTER_MAP[filterOption].bin})
          ORDER BY time_sec ASC`,
          },
          { headers: { Authorization: AUTH_TOKEN_LAMBDA } },
        )
        .then((res) => res.data);
    },
    refetchInterval: TEN_SEC_IN_MS,
  };
};
