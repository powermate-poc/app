/**
 * Created by ggoma on 2016. 11. 23..
 */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import { PowermateButton } from '../../../components/Buttons/Buttons';
import { THEME } from '../../../theme/theme';
import Grid from './logic/grid';

export const TetrisGame: React.FC = () => {
  const navigation = useNavigation();
  // Tetris has a fix dark theme color
  return (
    <SafeAreaView style={styles.container}>
      <PowermateButton
        widthPercentage={20}
        icon={<Icon name="arrow-left" size={45} color={THEME.dark.colors.foreground} />}
        onPress={() => navigation.goBack()}
      />
      <Grid w={10} h={24} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.dark.colors.background,
  },
});
