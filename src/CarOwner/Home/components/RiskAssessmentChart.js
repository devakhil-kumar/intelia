import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { moderateScale } from 'react-native-size-matters';
import Fonts from '../../../styles/GolbalFonts';
import { useTheme } from '../../../contexts/ThemeContext';

const RiskAssessmentChart = () => {
  const theme = useTheme();
  const styles = style(theme);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const pieData = [
    { value: 27, color: '#4361EE', text: 'Primary (27%)', count: 763 },
    { value: 11, color: '#3A0CA3', text: 'Promotion (11%)', count: 321 },
    { value: 22, color: '#F9C74F', text: 'Forum (22%)', count: 69 },
    { value: 15, color: '#4895EF', text: 'Socials (15%)', count: 154 },
  ];

  const handleSlicePress = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const chartData = pieData.map((item, index) => ({
    value: item.value,
    color: item.color,
    onPress: () => handleSlicePress(index),
    focused: selectedIndex === index,
    shiftX: selectedIndex === index ? 0 : 0, 
    shiftY: selectedIndex === index ? 0 : 0,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Risk Assessments</Text>

      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          donut
          radius={80}
          innerRadius={55}
          showText={false}
          strokeWidth={2}
          strokeColor={theme.background}
          centerLabelComponent={() => null}
        />
        {selectedIndex !== null && (
          <View
            style={[
              styles.percentageBubble,
              { backgroundColor: pieData[selectedIndex].color },
            ]}
          >
            <Text style={styles.percentageText}>
              {pieData[selectedIndex].value}%
            </Text>
          </View>
        )}
      </View>

      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.legendRow}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.text}</Text>
            <Text style={styles.legendCount}>{item.count}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RiskAssessmentChart;

const style = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.card || '#fff',
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginTop: 20,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
    title: {
      fontFamily: Fonts.InterSemiBold,
      fontSize: moderateScale(15),
      color: theme.primaryText,
      marginBottom: 12,
    },
    chartContainer: {
      alignItems: 'center',
      marginVertical: 10,
      position: 'relative',
    },
    percentageBubble: {
      position: 'absolute',
      top: '45%',
      right: '25%',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
    },
    percentageText: {
      color: '#fff',
      fontFamily: Fonts.InterSemiBold,
      fontSize: moderateScale(12),
    },
    legendContainer: {
      marginTop: 15,
    },
    legendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    colorBox: {
      width: 16,
      height: 16,
      borderRadius: 4,
      marginRight: 8,
    },
    legendText: {
      flex: 1,
      fontFamily: Fonts.InterRegular,
      fontSize: moderateScale(13),
      color: theme.subText,
    },
    legendCount: {
      fontFamily: Fonts.InterSemiBold,
      fontSize: moderateScale(14),
      color: theme.primaryText,
    },
  });
