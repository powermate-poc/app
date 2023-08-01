import { GAS_RATE_INDEX, TIMESTAMP_INDEX } from '../../api/lambda/current-gasrate/CurrentGasRate.api';
import { ConsumptionRate } from '../../api/lambda/types/ConsumptionRate.types';
import { Device } from '../../api/lambda/types/Device.types';

export const consumptionRateMapper = (consumptionRates: ConsumptionRate[] | undefined): [string[], number[]] => {
  const timestamps: string[] = [];
  const gasRates: number[] = [];

  consumptionRates?.forEach((entry) => {
    const gasRate = parseFloat(entry.Data[GAS_RATE_INDEX].ScalarValue).toPrecision(3);
    const timestamp = entry.Data[TIMESTAMP_INDEX].ScalarValue.substring(10, 16);

    gasRates.push(parseFloat(gasRate));
    timestamps.push(timestamp);
  });

  return timestamps.length === 0 && gasRates.length === 0
    ? [[new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })], [0, 0]]
    : [timestamps, gasRates];
};

export const extractDeviceNames = (devices: Device[] | undefined): string[] => {
  const deviceNames: string[] = [];
  devices?.forEach((device) => {
    const name = device.Name;
    console.log(name);
    deviceNames.push(name);
  });

  return deviceNames;
};
