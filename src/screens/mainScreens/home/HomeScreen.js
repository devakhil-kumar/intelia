import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Fonts from "../../../styles/GolbalFonts";
import { useTheme } from "../../../contexts/ThemeContext";
import ProjectionVsActuals from './components/ProjectionsVsActuals';
import DashboardSummaryCards from './components/DashboradSummaryCards';
import { SafeAreaView } from "react-native-safe-area-context";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");



const HomeScreen = () => {
  const theme = useTheme();
  const styles = style(theme);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <SafeAreaView style={styles.main} edges={['bottom']}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.innerScreen}>
        <Text style={styles.welcomeText}>Welcome Back, Debbie Hargreves</Text>
        <View style={styles.gridContainer}>
          <View style={styles.card}>            <Text style={styles.cardTitle}>Profile Completion</Text>
            <View style={{ flexDirection: 'row' }} >
              <Text style={styles.cardValue}>Update Info</Text>
              <Text style={styles.cardValue}>60%</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View >
              <Text style={styles.cardTitle}>Jobs Applied</Text>
              <View style={{ flexDirection: 'row' }} >
                <Text style={styles.cardValue}>View All</Text>
                <Text style={styles.cardValue}>20</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View >
              <Text style={styles.cardTitle}>AI Resume Status</Text>
              <Text style={styles.cardValue}>View Resume </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View >
              <Text style={styles.cardTitle}>Notifications</Text>
              <View style={{ flexDirection: 'row' }} >
                <Text style={styles.cardValue}>View All</Text>
                <Text style={styles.cardValue}>20</Text>
              </View>
            </View>
          </View>
        </View>
        <ProjectionVsActuals />
        <DashboardSummaryCards />

      </View>
    </ScrollView>
 </SafeAreaView>
  )
}

export default HomeScreen;

const style = (theme) => StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom:75
  },
  innerScreen: {
    padding: 16,
    backgroundColor: theme.background
  },
  welcomeText: {
    fontSize: moderateScale(16),
    marginBottom: 15,
    fontFamily: Fonts.InterSemiBold,
    color: theme.primaryText
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dateLabel: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.InterBold,
    color: theme.primaryText
  },
  dateValue: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InterRegular,
    color: theme.subText
  },
  weatherBox: {
  },
  tempText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.InterBold,
    color: theme.primaryText
  },
  cityText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InterRegular,
    color: theme.subText
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: (windowWidth - 48) / 2,
    backgroundColor: "#F9F9FA",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  icon: {
    width: 50,
    height: 50,
  },
  cardTitle: {
    fontSize: moderateScale(13),
    color: theme.subText,
    fontFamily: Fonts.InterRegular
  },
  cardValue: {
    fontSize: moderateScale(15),
    color: theme.primaryText,
    fontFamily: Fonts.InterSemiBold
  },
  deatilsCardinfo: {
    // marginLeft:8
  }
})