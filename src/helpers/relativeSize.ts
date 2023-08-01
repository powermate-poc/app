import { Dimensions } from 'react-native';

export const getRelativeSize = (relativeX: number, componentSize: number): number => {
  const width = Dimensions.get('screen').width;
  return (width / componentSize) * relativeX;
};
