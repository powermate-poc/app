import { AUTH_TOKEN_LAMBDA } from '@env';
import { UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { LAMBDA_BASE_URL } from '../constants';
import { ConsumptionRate } from '../types/ConsumptionRate.types';

const CURRENT_GAS_RATE_API_ID = 'CURRENT_GAS_RATE_API';

const DEVICE_ID_KEYWORD = '$DEVICE_ID';

const ENDPOINT = LAMBDA_BASE_URL + '/passthrough';

const QUERY = `SELECT time, MAX(measure_value::double) AS consumption_rate 
  FROM "powermate_dev_timestream"."powermate_dev_timestream_table" 
  WHERE measure_name = 'consumption_rate' AND device_id = '$DEVICE_ID'
  GROUP BY time ORDER BY time DESC LIMIT 1`;

export const GAS_RATE_INDEX = 1;
export const TIMESTAMP_INDEX = 0;
export const DATA_INDEX = 0;

const TEN_SEC_IN_MS = 10_000;

export const CURRENT_GAS_RATE_API = (
  deviceId = 'gasmeter-raspi-villa-paganini',
): UseQueryOptions<ConsumptionRate[], Error> => ({
  queryKey: [CURRENT_GAS_RATE_API_ID],
  queryFn: async (): Promise<ConsumptionRate[]> => {
    return axios
      .post(
        ENDPOINT,
        {
          query: QUERY.replaceAll(DEVICE_ID_KEYWORD, deviceId),
        },
        { headers: { Authorization: AUTH_TOKEN_LAMBDA } },
      )
      .then((res) => res.data);
  },
  refetchInterval: TEN_SEC_IN_MS,
});
