import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { useTheme } from '../../../contexts/ThemeContext';
import { moderateScale } from 'react-native-size-matters';
import Fonts from '../../../styles/GolbalFonts';

const RiskAssementChart = ({ percentage, label, color }) => {
  const theme = useTheme()
  const styles = style(theme);
  const pieData = [
    { value: percentage, color: color },
    { value: 100 - percentage, color: '#F5F5F5' }
  ];

  return (
    <View style={styles.chartCard}>
      <View style={styles.pieContainer}>
        <PieChart
          data={pieData}
          donut
          radius={65}
          innerRadius={35}
          innerCircleColor="#FFF"
          centerLabelComponent={() => (
            <Text style={styles.centerLabel}>{percentage}%</Text>
          )}
        />
      </View>
      <Text style={styles.chartLabel}>{label}</Text>
    </View>
  );
};

const style = (theme) => StyleSheet.create({
  chartCard: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 20
  },
  pieContainer: {
    marginBottom: 10
  },
  centerLabel: {
    fontSize:moderateScale(18),
    color: theme.primaryText,
    fontFamily: Fonts.InterMedium,

  },
  chartLabel: {
    fontSize: moderateScale(15),
    color: theme.primaryText,
    fontFamily: Fonts.InterSemiBold,
    textAlign: 'center',
    marginTop: 5
  }
});

export default RiskAssementChart;