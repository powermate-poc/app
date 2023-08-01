import styled, { css } from 'styled-components/native';

import { ThemeKey } from '../../context/AppContext';
import { THEME } from '../../theme/theme';

export const BoldTitle = styled.Text<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    font-family: ${THEME.font.family.extra_bold};
    font-size: 24px;
    color: ${THEME[themeKey].colors.foreground};
  `}
`;

export const Title = styled.Text<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    font-family: ${THEME.font.family.bold};
    font-size: 24px;
    color: ${THEME[themeKey].colors.foreground};
  `}
`;

export const Subtitle = styled.Text<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    margin-top: 10px;
    margin-left: 15px;
    font-family: ${THEME.font.family.bold};
    font-size: 18px;
    color: ${THEME[themeKey].colors.foreground};
    text-decoration: underline;
    text-decoration-color: ${THEME[themeKey].colors.foreground};
  `}
`;

export const NormalText = styled.Text<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    font-family: ${THEME.font.family.medium};
    color: ${THEME[themeKey].colors.foreground};
  `}
`;

export const ThinText = styled.Text<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    font-family: ${THEME.font.family.light};
    font-size: 20px;
    letter-spacing: 1px;
    color: ${THEME[themeKey].colors.foreground};
  `}
`;

export const Item = styled.Text<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    margin-left: 20px;
    font-family: ${THEME.font.family.extra_bold};
    font-size: 20px;
    color: ${THEME[themeKey].colors.foreground};
  `}
`;

export const InvertedBoldTitle = styled.Text<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    font-family: ${THEME.font.family.extra_bold};
    font-size: 24px;
    color: ${THEME[themeKey].colors.background};
  `}
`;

export const InvertedTitle = styled.Text<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    font-family: ${THEME.font.family.bold};
    font-size: 24px;
    color: ${THEME[themeKey].colors.background};
  `}
`;

export const InvertedNormalText = styled.Text<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    font-family: ${THEME.font.family.medium};
    color: ${THEME[themeKey].colors.background};
  `}
`;

export const InvertedThinText = styled.Text<{ themeKey: ThemeKey }>`
  ${({ themeKey }) => css`
    font-family: ${THEME.font.family.light};
    font-size: 20px;
    letter-spacing: 1px;
    color: ${THEME[themeKey].colors.background};
  `}
`;
