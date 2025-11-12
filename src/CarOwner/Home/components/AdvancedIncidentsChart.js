import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { moderateScale } from "react-native-size-matters";
import {useTheme} from '../../../contexts/ThemeContext';
import { LineChart } from 'react-native-gifted-charts';
import Feather from "@react-native-vector-icons/feather";
import Fonts from '../../../styles/GolbalFonts';

const { width: windowWidth, height:windowHeight } = Dimensions.get("window");

const AdvancedIncidentsChart = () => {
    const theme = useTheme();
    const styles = style(theme);
    const [selectedView, setSelectedView] = useState('Weekly');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const viewOptions = ['Weekly', 'Monthly', 'Yearly'];
    const weeklyData = {
        current: [
            { value: 55, label: 'Mon' },
            { value: 60, label: 'Tue' },
            { value: 70, label: 'Wed' },
            { value: 65, label: 'Thu' },
            { value: 58, label: 'Fri' },
            { value: 28, label: 'Sat' },
            { value: 70, label: 'Sun' }
        ],
        previous: [
            { value: 50, label: 'Mon' },
            { value: 48, label: 'Tue' },
            { value: 30, label: 'Wed' },
            { value: 55, label: 'Thu' },
            { value: 40, label: 'Fri' },
            { value: 50, label: 'Sat' },
            { value: 60, label: 'Sun' }
        ],
        currentTotal: 1982,
        previousTotal: 1345
    };

    const monthlyData = {
        current: Array.from({ length: 30 }, (_, i) => ({
            value: Math.floor(Math.random() * 40) + 30,
            label: `${i + 1}`
        })),
        previous: Array.from({ length: 30 }, (_, i) => ({
            value: Math.floor(Math.random() * 45) + 25,
            label: `${i + 1}`
        })),
        currentTotal: 8520,
        previousTotal: 7890
    };

    const yearlyData = {
        current: [
            { value: 450, label: 'Jan' },
            { value: 520, label: 'Feb' },
            { value: 680, label: 'Mar' },
            { value: 720, label: 'Apr' },
            { value: 650, label: 'May' },
            { value: 580, label: 'Jun' },
            { value: 720, label: 'Jul' },
            { value: 680, label: 'Aug' },
            { value: 750, label: 'Sep' },
            { value: 820, label: 'Oct' },
            { value: 780, label: 'Nov' },
            { value: 810, label: 'Dec' }
        ],
        previous: [
            { value: 420, label: 'Jan' },
            { value: 480, label: 'Feb' },
            { value: 620, label: 'Mar' },
            { value: 680, label: 'Apr' },
            { value: 600, label: 'May' },
            { value: 550, label: 'Jun' },
            { value: 670, label: 'Jul' },
            { value: 640, label: 'Aug' },
            { value: 700, label: 'Sep' },
            { value: 760, label: 'Oct' },
            { value: 720, label: 'Nov' },
            { value: 800, label: 'Dec' }
        ],
        currentTotal: 8200,
        previousTotal: 7640
    };

    const getCurrentData = () => {
        switch (selectedView) {
            case 'Weekly':
                return weeklyData;
            case 'Monthly':
                return monthlyData;
            case 'Yearly':
                return yearlyData;
            default:
                return weeklyData;
        }
    };

    const currentData = getCurrentData();
    const totalIncidents = currentData.currentTotal + currentData.previousTotal;

    const getChartWidth = () => {
        switch (selectedView) {
            case 'Weekly':
                return windowWidth - 100;
            case 'Monthly':
                return windowWidth * 3.2;
            case 'Yearly':
                return windowWidth * 2.8; 
            default:
                return windowWidth - 80;
        }
    };

    const getSpacing = () => {
        switch (selectedView) {
            case 'Weekly':
                return 30;
            case 'Monthly':
                return 35;
            case 'Yearly':
                return 80;
            default:
                return 45;
        }
    };

    const renderChart = () => {
        const chartWidth = getChartWidth();
        const spacing = getSpacing();
        const isScrollable = selectedView !== 'Weekly';

        const chart = (
            <LineChart
                data={currentData.previous}
                data2={currentData.current}
                height={230}
                width={chartWidth}
                spacing={spacing}
                initialSpacing={20}
                color1={theme.primary}
                color2={theme.secanderyChartcolor}
                thickness={3}
                startOpacity={0}
                endOpacity={0}
                curved={false}
                isAnimated
                animationDuration={1000}
                yAxisColor="transparent"
                xAxisColor="transparent"
                rulesColor={theme.border}
                rulesType="solid"
                yAxisTextStyle={styles.yAxisText}
                xAxisLabelTextStyle={styles.xAxisText}
                pointerConfig={{
                    pointerStripHeight: 180,
                    pointerStripColor: '#90A4AE',
                    pointerStripWidth: 1,
                    pointerColor: '#4361EE',
                    radius: 6,
                    pointerLabelWidth: 120,
                    pointerLabelHeight: 80,
                    activatePointersOnLongPress: false,
                    autoAdjustPointerLabelPosition: true,
                    pointerLabelComponent: (items) => {
                        const item = items[0];
                        const percentage = ((item.value / 100) * 24).toFixed(0);
                        return (
                            <View style={styles.tooltip}>
                                <Text style={styles.tooltipPercentage}>{percentage}%</Text>
                                <Text style={styles.tooltipVisitors}>{item.value} Visitors</Text>
                            </View>
                        );
                    },
                }}
            />
        );

        if (isScrollable) {
            return (
                <ScrollView 
                    horizontal 
                    style={styles.scrollView}
                >
                    {chart}
                </ScrollView>
            );
        }

        return chart;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Recent Incidents</Text>
                <TouchableOpacity 
                    style={styles.dropdown}
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    <Text style={styles.dropdownText}>{selectedView}</Text>
                    <Feather name="chevron-down" size={16} color={theme.subText} />
                </TouchableOpacity>
            </View>

            {dropdownVisible && (
                <View style={styles.dropdownMenu}>
                    {viewOptions.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={styles.dropdownItem}
                            onPress={() => {
                                setSelectedView(option);
                                setDropdownVisible(false);
                            }}
                        >
                            <Text style={[
                                styles.dropdownItemText,
                                selectedView === option && styles.selectedDropdownText
                            ]}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <View style={styles.statHeader}>
                        <View style={[styles.dot, { backgroundColor: '#F9C74F' }]} />
                        <Text style={styles.statLabel}>
                            {selectedView === 'Weekly' ? 'This Week' : 
                             selectedView === 'Monthly' ? 'This Month' : 'This Year'}
                        </Text>
                    </View>
                    <Text style={styles.statValue}>{currentData.currentTotal.toLocaleString()}</Text>
                </View>

                <View style={styles.statItem}>
                    <View style={styles.statHeader}>
                        <View style={[styles.dot, { backgroundColor: '#4361EE' }]} />
                        <Text style={styles.statLabel}>
                            {selectedView === 'Weekly' ? 'Last Week' : 
                             selectedView === 'Monthly' ? 'Last Month' : 'Last Year'}
                        </Text>
                    </View>
                    <Text style={styles.statValue}>{currentData.previousTotal.toLocaleString()}</Text>
                </View>

                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Total</Text>
                    <Text style={styles.statValue}>{totalIncidents.toLocaleString()}</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { 
                            width: `${(currentData.currentTotal / totalIncidents) * 100}%` 
                        }]} />
                    </View>
                </View>
            </View>

            <View style={styles.chartContainer}>
                {renderChart()}
            </View>

            {selectedView !== 'Weekly' && (
                <Text style={styles.scrollHint}>← Swipe to see more →</Text>
            )}
        </View>
    );
};

export default AdvancedIncidentsChart;

const style = (theme) => StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        margin: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        overflow:'hidden'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.InterBold,
        color: theme.primaryText,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    dropdownText: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.InterMedium,
        color: theme.primaryText,
        marginRight: 6,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 50,
        right: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 8,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        zIndex: 1000,
        minWidth: 120,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    dropdownItemText: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.InterRegular,
        color: theme.primaryText,
    },
    selectedDropdownText: {
        fontFamily: Fonts.InterBold,
        color: '#4361EE',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statItem: {
        flex: 1,
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statLabel: {
        fontSize: moderateScale(11),
        fontFamily: Fonts.InterRegular,
        color: theme.subText,
    },
    statValue: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterBold,
        color: theme.primaryText,
        marginTop: 2,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#E5E5E5',
        borderRadius: 2,
        marginTop: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4361EE',
        borderRadius: 2,
    },
    
    chartContainer: {
        marginTop: 10,
        alignItems: 'center',
        width:windowWidth/1

    },
    scrollView: {
        width:windowWidth,
    },
    yAxisText: {
        fontSize: moderateScale(10),
        fontFamily: Fonts.InterRegular,
        color: '#90A4AE',
    },
    xAxisText: {
        fontSize: moderateScale(11),
        fontFamily: Fonts.InterMedium,
        color: theme.subText,
    },
    tooltip: {
        backgroundColor: '#3D4A5C',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tooltipPercentage: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.InterBold,
        color: '#FFFFFF',
    },
    tooltipVisitors: {
        fontSize: moderateScale(11),
        fontFamily: Fonts.InterRegular,
        color: '#FFFFFF',
        marginTop: 2,
    },
    scrollHint: {
        textAlign: 'center',
        fontSize: moderateScale(11),
        fontFamily: Fonts.InterRegular,
        color: '#90A4AE',
        marginTop: 10,
    },
});
