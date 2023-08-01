import { AUTH_TOKEN_LAMBDA } from '@env';
import { UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { Device } from '../types/Device.types';

const GET_DEVICE_API_ID = 'GET_DEVICE_API_ID';

const BASE_URL = 'https://a23ypr2qzg.execute-api.eu-central-1.amazonaws.com/api/devices';

export const GET_DEVICE_API = (): UseQueryOptions<Device[], Error> => ({
  queryKey: [GET_DEVICE_API_ID],
  queryFn: async (): Promise<Device[]> => {
    const headers = {
      Authorization: `Bearer ${AUTH_TOKEN_LAMBDA}`,
    };

    return axios.get(BASE_URL, { headers: headers }).then((res) => res.data);
  },
});
