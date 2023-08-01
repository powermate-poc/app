import React, { Dispatch, SetStateAction, useContext } from 'react';
import { InputOutline } from 'react-native-input-outline';

import { PowermateContext } from '../../context/AppContext';
import { THEME } from '../../theme/theme';
import { CenteredRow } from '../Layout/Layout.styled';

type TextInputFieldProps = {
  setText: Dispatch<SetStateAction<string | undefined>>;
  error: boolean;
  placeholder: string;
  assistiveText?: string;
  type?: 'default';
  isPassword?: boolean;
  errorText?: string;
  numeric?: boolean;
};

export const TextInputField: React.FC<TextInputFieldProps> = ({
  setText,
  error,
  placeholder,
  assistiveText,
  type = 'none',
  isPassword = false,
  errorText,
  numeric = false,
}) => {
  const { getTheme } = useContext(PowermateContext);

  return (
    <CenteredRow>
      <InputOutline
        roundness={10}
        placeholder={placeholder}
        assistiveText={assistiveText}
        backgroundColor={THEME[getTheme()].colors.background}
        activeColor={THEME[getTheme()].colors.foreground}
        fontColor={THEME[getTheme()].colors.foreground}
        placeholderTextColor={THEME[getTheme()].colors.foreground_contrast}
        inactiveColor={THEME[getTheme()].colors.foreground_contrast}
        errorColor={THEME[getTheme()].colors.error}
        error={error ? errorText : undefined}
        onChangeText={(text) => setText(text)}
        style={{ width: '90%', flex: 1 }}
        secureTextEntry={isPassword}
        keyboardType={numeric ? 'number-pad' : 'default'}
      />
    </CenteredRow>
  );
};
