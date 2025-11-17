import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import RiskAssementChart from './components/RiskAssementChart';
import ServerStatusChart from './components/ServerStutasChart';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from '../../contexts/ThemeContext';
import Fonts from '../../styles/GolbalFonts';
import RescentDrivers from './components/RescentDrivers';

const Resources = () => {
    const theme = useTheme();
    const styles = style(theme);

    const serverData = [
        { time: '10 AM', percentage: 75, color: '#FFC107' },
        { time: '8 AM', percentage: 85, color: '#4ECDC4' },
        { time: '6 AM', percentage: 60, color: '#95E1D3' },
        { time: '4 AM', percentage: 70, color: '#FFC107' },
        { time: '2 AM', percentage: 55, color: '#FFC107' }
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Risk Assessment</Text>
            </View>

            <View style={styles.tabContainer}>
                <View style={[styles.tabContainer, { paddingBottom: 0, paddingHorizontal: 0}]}>
                    <View style={[styles.tab, styles.activeTab]}>
                        <Text style={styles.activeTabText}>Charts</Text>
                    </View>
                    <TouchableOpacity style={styles.tab}>
                        <Text style={styles.tabText}>Activity</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.menuIcon}>⋯</Text>
            </View>

            <View style={styles.chartsGrid}>
                <RiskAssementChart percentage={81} label="Total Incidents" color={theme.secanderyChartcolor} />
                <RiskAssementChart percentage={62} label="Safety Score" color={theme.secanderyChartcolor}/>
                <RiskAssementChart percentage={22} label="Miles Driven" color="#FFE4A3" />
                <RiskAssementChart percentage={62} label="Income Increase" color={theme.primary} />
            </View>
            <Text style={styles.reportTitle}>Report Driver</Text>
            <View style={styles.reportCard}>
                <Text style={styles.reportDescription}>
                    Nam ipsum unde sit omnis consectetur adipisicing{'\n'}
                    elit sed do eiusmod tempo incididunt ut labore et{'\n'}
                    dolore magna
                </Text>
            </View>
            <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>

            {/* Server Status Section */}
            <View style={styles.serverSection}>
                <View style={styles.serverHeader}>
                    <Text style={styles.serverTitle}>Server Status</Text>
                    <TouchableOpacity>
                        <Text style={styles.menuIcon}>⋯</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.serverBars}>
                    {serverData.map((item, index) => (
                        <ServerStatusChart
                            key={index}
                            time={item.time}
                            percentage={item.percentage}
                            color={item.color}
                        />
                    ))}
                </View>
                <View style={styles. serverFooter}>
                    <View style={styles.footerItem}>
                        <Text style={styles.footerLabel}>Country</Text>
                        <Text style={styles.footerValue}>India</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Text style={styles.footerLabel}>Domain</Text>
                        <Text style={styles.footerValue}>website.com</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Text style={styles.footerLabel}>IP</Text>
                        <Text style={styles.footerValue}>2.0 mbps</Text>
                    </View>
                </View>
                <RescentDrivers />
            </View>
        </ScrollView>
    );
};

const style = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(20),
        color: theme.primaryText,
        fontFamily: Fonts.InterSemiBold
    },
    menuIcon: {
        fontSize: 24,
        color: '#999'
    },
    tabContainer: {
        flexDirection: 'row',
        marginTop: 4,
        justifyContent: "space-between"
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginRight: 10,
        borderRadius: 5
    },
    activeTab: {
        backgroundColor: '#FFC107'
    },
    activeTabText: {
        color: theme.white,
        fontFamily: Fonts.InterRegular,
        fontSize: moderateScale(14)
    },
    tabText: {
        fontFamily: Fonts.InterRegular,
        fontSize: moderateScale(14),
        color: theme.subText
    },
    chartsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        backgroundColor: theme.background,
        marginTop: 15,
        elevation: 2,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },

    },
    reportCard: {
        borderRadius: 12
    },
    reportTitle: {
        fontSize: moderateScale(16),
        color: theme.primaryText,
        fontFamily: Fonts.InterSemiBold,
        marginTop: 15
    },
    reportDescription: {
        fontSize:moderateScale(12),
        color:theme.subText,
        lineHeight: 18,
        fontFamily:Fonts.InterRegular
    },
    learnMoreButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFF9E6',
        padding:10,
        borderRadius:10,
        marginTop:5
    },
    learnMoreText: {
        color:theme.secanderyChartcolor,
        fontSize:moderateScale(14)
    },
    serverSection: {
        backgroundColor: '#FFF',
        padding: 20,
        marginTop:15,
        borderRadius: 12,
        marginBottom: 30,
        elevation:3,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
    },
    serverHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    serverTitle: {
        fontSize: moderateScale(20),
        fontFamily:Fonts.InterSemiBold,
        color:theme.primaryText,
    },
    serverBars: {
        // marginBottom: 20
    },
    serverFooter: {
        flexDirection: 'row',
        justifyContent:"space-around",
        marginTop:5,
        marginBottom:10
    },
    footerItem: {
    },
    footerLabel: {
        fontSize:moderateScale(10),
        color:theme.subText,
        fontFamily:Fonts.InterRegular
    },
    footerValue: {
        fontSize:moderateScale(13),
        fontFamily:Fonts.InterSemiBold,
        color:theme.primaryText
    }
});

export default Resources;