import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import Fonts from "../../styles/GolbalFonts";
import { moderateScale } from "react-native-size-matters";
import Feather from "@react-native-vector-icons/feather";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Lucide from '@react-native-vector-icons/lucide';
import ImagePath from "../../contexts/ImagePath";
import AdvancedIncidentsChart from '../home/components/AdvancedIncidentsChart';
import RiskAssessmentChart from '../home/components/RiskAssessmentChart'
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");



const OwnerHome = () => {
    const theme = useTheme();
    const styles = style(theme);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };


    const formatDate = (date) => {
        const options = { year: "numeric", month: "long" };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <SafeAreaView style={styles.main}>
              <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.innerScreen}>
              
                    <Text style={styles.welcomeText}>Welcome Back, Debbie Hargreves</Text>
                    <View style={styles.infoRow}>
                        <TouchableOpacity onPress={showDatePicker} style={styles.dateBox}>
                            <Lucide name="calendar-days" size={24} color={theme.primaryText} />
                            <View style={{ marginLeft: 25 }}>
                                <Text style={styles.dateLabel}>Change Date</Text>
                                <Text style={styles.dateValue}>{formatDate(selectedDate)}</Text>
                            </View>
                            <Feather
                                name="chevron-down"
                                size={16}
                                color={theme.subText}
                                style={{ marginLeft: 8 }}
                            />
                        </TouchableOpacity>
                        <View style={styles.weatherBox}>
                            <Text style={styles.tempText}>29°C</Text>
                            <Text style={styles.cityText}>Chandigarh</Text>
                        </View>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <View style={styles.gridContainer}>
                        <View style={styles.card}>
                            <Image source={ImagePath.licenses} style={styles.icon} />
                            <View >
                                <Text style={styles.cardTitle}>Licenses</Text>
                                <Text style={styles.cardValue}>32K</Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Image source={ImagePath.driverIcons} style={styles.icon} />
                            <View >
                                <Text style={styles.cardTitle}>Drivers</Text>
                                <Text style={styles.cardValue}>32K</Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Image source={ImagePath.incidents} style={styles.icon} />
                            <View >
                                <Text style={styles.cardTitle}>Incidents</Text>
                                <Text style={styles.cardValue}>32K</Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Image source={ImagePath.inquiries} style={styles.icon} />
                            <View >
                                <Text style={styles.cardTitle}>Inquiries</Text>
                                <Text style={styles.cardValue}>32K</Text>
                            </View>
                        </View>
                    </View>
                    <AdvancedIncidentsChart />
          <RiskAssessmentChart />
            </View>
                  </ScrollView>
        </SafeAreaView>
    )
}

export default OwnerHome;

const style = (theme) => StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: theme.background
    },
    innerScreen: {
        padding: 16
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
        marginTop: 20,
    },
    card: {
        width: (windowWidth - 48) / 2,
        backgroundColor: "#fff",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
        flexDirection: 'row'
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