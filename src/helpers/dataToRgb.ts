import { rgb } from 'd3';
import * as d3 from 'd3';

export const celsiusToRgb = (temperature: number): string => {
  const maxTemp = 40;
  const minTemp = -10;
  const temperatureValue = Math.max(Math.min(maxTemp, temperature), minTemp);

  const redVal = (255 / (maxTemp - minTemp)) * (temperatureValue - minTemp);
  const blueVal = (255 / (maxTemp - minTemp)) * (maxTemp - temperatureValue);

  return rgb(redVal, 100, blueVal).toString();
};

export const gasConsumptionToRgb = (value: number): string => {
  const HIGH_GAS_CONSUMPTION = 4;
  const color = d3.interpolateViridis(Math.min(HIGH_GAS_CONSUMPTION, value) / HIGH_GAS_CONSUMPTION);

  return color.toString();
};
