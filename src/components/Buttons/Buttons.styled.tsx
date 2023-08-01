import styled, { css } from 'styled-components/native';

import { ThemeKey } from '../../context/AppContext';
import { THEME } from '../../theme/theme';
import { BoldTitle } from '../Text/PowermateText.styled';

export const SelectedStyledButton = styled.TouchableOpacity<{ widthPercentage: number; themeKey: ThemeKey }>`
  ${({ widthPercentage, themeKey }) => css`
    background-color: ${THEME[themeKey].colors.foreground};
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
    width: ${widthPercentage}%;
  `}
`;
export const SelectedButtonText = styled(BoldTitle)<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    color: ${THEME[themeKey].colors.background};
  `}
`;

export const StyledOutlinedButton = styled.TouchableOpacity<{ widthPercentage: number; themeKey: ThemeKey }>`
  ${({ widthPercentage, themeKey }) => css`
    background-color: ${THEME[themeKey].colors.transparent};
    border-radius: 20px;
    border-color: ${THEME[themeKey].colors.foreground};
    border-width: 1px;
    align-items: center;
    justify-content: center;
    width: ${widthPercentage}%;
  `}
`;

export const StyledButton = styled.TouchableOpacity<{ widthPercentage: number; themeKey: ThemeKey }>`
  ${({ widthPercentage, themeKey }) => css`
    background-color: ${THEME[themeKey].colors.transparent};
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: ${widthPercentage}%;
  `}
`;

export const ButtonText = styled(BoldTitle)<{ withoutPadding?: boolean; themeKey: ThemeKey }>`
  ${({ withoutPadding, themeKey }) => css`
    color: ${THEME[themeKey].colors.foreground};
    text-align: left;
    padding: ${withoutPadding ? 0 : 5}px;
  `}
`;
