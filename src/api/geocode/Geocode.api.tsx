import { UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

const GEOCODE_API_ID = 'GEOCODE_API';

export interface Geocode {
  place_id: number;
  licence: string;
  powered_by: string;
  osm_type: string;
  osm_id: number;
  boundingbox?: string[] | null;
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export const GEOCODE_API = (address: string): UseQueryOptions<Geocode[], Error> => ({
  queryKey: [GEOCODE_API_ID],
  queryFn: async (): Promise<Geocode[]> => {
    return axios.get(`https://geocode.maps.co/search?q=${address}&limit=1`).then((res) => res.data);
  },
  enabled: false,
});
