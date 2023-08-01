import React from 'react';

import { ThemeKey } from '../../context/AppContext';
import {
  ButtonText,
  SelectedButtonText,
  SelectedStyledButton,
  StyledButton,
  StyledOutlinedButton,
} from './Buttons.styled';

export type ButtonProps = {
  onPress: () => void;
  text?: string | null;
  icon?: React.ReactNode;
  widthPercentage?: number;
  withoutPadding?: boolean;
  themeKey?: ThemeKey;
  color?: string;
  children?: React.ReactNode;
};

export const PowermateButton: React.FC<ButtonProps> = ({
  onPress,
  text,
  icon,
  widthPercentage = 100,
  themeKey = 'dark',
}) => {
  return (
    <StyledButton onPress={onPress} widthPercentage={widthPercentage} themeKey={themeKey}>
      <ButtonText allowFontScaling numberOfLines={1} themeKey={themeKey}>
        {icon}
      </ButtonText>
      <ButtonText allowFontScaling numberOfLines={1} themeKey={themeKey}>
        {text}
      </ButtonText>
    </StyledButton>
  );
};

export const OutlinedPowermateButton: React.FC<ButtonProps> = ({
  onPress,
  text,
  widthPercentage = 100,
  withoutPadding,
  themeKey = 'dark',
}) => {
  return (
    <StyledOutlinedButton onPress={onPress} widthPercentage={widthPercentage} themeKey={themeKey}>
      <ButtonText allowFontScaling numberOfLines={1} withoutPadding={withoutPadding} themeKey={themeKey}>
        {text}
      </ButtonText>
    </StyledOutlinedButton>
  );
};

export const InvertedPowermateButton: React.FC<ButtonProps> = ({
  onPress,
  text,
  widthPercentage = 100,
  themeKey = 'dark',
}) => {
  return (
    <SelectedStyledButton onPress={onPress} widthPercentage={widthPercentage} themeKey={themeKey}>
      <SelectedButtonText allowFontScaling numberOfLines={1} themeKey={themeKey}>
        {text}
      </SelectedButtonText>
    </SelectedStyledButton>
  );
};
