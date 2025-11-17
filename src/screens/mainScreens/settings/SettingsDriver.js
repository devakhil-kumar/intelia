import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "../../../contexts/ThemeContext";
import Fonts from "../../../styles/GolbalFonts";
import { SafeAreaView } from "react-native-safe-area-context";

const PreferencesScreen = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [appNotif, setAppNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const styles = style(theme);

  return (
    <SafeAreaView edges={[0, 'bottom']} style={{flex:1, paddingBottom:95}}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Card */}
      <Text style={styles.heading}>Preferences</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Notification</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Email Notifications</Text>
          <Switch
            value={emailNotif}
            onValueChange={setEmailNotif}
            thumbColor={"#ffffff"}
            trackColor={{ false: "#D1D5DB", true: "#4B7BE5" }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>In-App Notifications</Text>
          <Switch
            value={appNotif}
            onValueChange={setAppNotif}
            thumbColor={"#ffffff"}
            trackColor={{ false: "#D1D5DB", true: "#4B7BE5" }}
          />
        </View>
        <Text style={styles.sectionTitle}>Choose Mode</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={"#ffffff"}
            trackColor={{ false: "#D1D5DB", true: "#4B7BE5" }}
          />
        </View>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        <Text style={styles.subLabel}>Call us at : +0000000000</Text>
        <Text style={styles.subLabel}>Email us at : Antelia@gmail.com</Text>
        <Text style={[styles.sectionTitle, {marginTop:40}]}>Feedback</Text>
        <TextInput
          placeholder="Rate your experience"
          placeholderTextColor="#A0AEC0"
          style={styles.textArea}
          multiline={true}
          textAlignVertical='top'
        /> 

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
 
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default PreferencesScreen;

const style = (theme) =>  StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    padding: 16,
  },
  card: {
    backgroundColor: "#F9F9FA",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  heading: {
    fontSize:moderateScale(20),
    color:theme.primaryText,
    fontFamily:Fonts.InterSemiBold,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize:moderateScale(15),
    color:theme.primaryText,
    marginVertical:8,
    fontFamily:Fonts.InterSemiBold
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize:moderateScale(14),
    color:theme.primaryText,
    fontFamily:Fonts.InterRegular
  },
  subLabel: {
  fontSize:moderateScale(14),
    color:theme.primaryText,
    fontFamily:Fonts.InterRegular
  },
  textArea: {
    height: 90,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#1F2937",
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  submitBtn: {
    height: 45,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor:theme.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: theme.primary,
    fontWeight: "600",
    fontSize: 15,
  },
});
