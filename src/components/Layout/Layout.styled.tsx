import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const CenteredRow = styled(Row)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CenteredRowWithPadding = styled(Row)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px;
`;

export const FlexView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ScreenWrapper = styled.ScrollView`
  padding: 15px;
`;

export const Divider = styled.View`
  margin: 10px;
`;
