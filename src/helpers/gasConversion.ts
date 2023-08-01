import { PreferedUnit } from '../context/AppContext';

/**
 * Transforms m³ of natural gas into kWh.
 *
 * Sources:
 * https://www.effiworkx.com/calculators/heating-cooling-calculators/cubic-meter-to-kilowatt-hour/
 * https://www.polarstern-energie.de/magazin/artikel/gasrechnung-verstehen/
 * @param cubicMeters the amount of natural gas in m³
 * @param calorificValue the calorific value of the gas used (https://www.vedantu.com/biology/calorific-value)
 * @param correctionFactor transformation correction factor
 * @returns equivalent kWh
 */
const cubicMetersToKilowattHoursComplex = (
  cubicMeters: number,
  calorificValue = 40,
  correctionFactor = 1.02264,
): number => {
  const conversionFactor = 3.6;
  return (cubicMeters * calorificValue * correctionFactor) / conversionFactor;
};

/**
 * Transforms m³ of natural gas into kWh using the providers gross calorific value.
 *
 * https://www.polarstern-energie.de/magazin/artikel/gasrechnung-verstehen/
 * @param cubicMeters the amount of natural gas in m³
 * @param grossCalorificValue the gross calorific value of the gas used, as given by the gas provider in kWh/m³
 * @returns equivalent kWh
 */
const cubicMetersToKilowattHours = (cubicMeters: number, grossCalorificValue: number): number => {
  return cubicMeters * grossCalorificValue;
};

export const convertToPreferedUnit = (
  cubicMeters: number,
  preferedUnit: PreferedUnit,
  grossCalorificValue = 11.266,
): number => {
  return preferedUnit === PreferedUnit.CUBIC_METER_PER_HOUR
    ? cubicMeters
    : cubicMetersToKilowattHours(cubicMeters, grossCalorificValue);
};
