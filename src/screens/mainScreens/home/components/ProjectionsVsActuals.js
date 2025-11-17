import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


const ProjectionsVsActuals = () => {
    const barData = [
  {
    stacks: [
      { value: 7000, color: '#A5B4FC' },      // TOP (dark)
      { value: 8000, color: '#A5B4FC80' }    // BOTTOM (light)
    ],
    label: 'Jan',
  },
  {
    stacks: [
      { value: 12000, color: '#6EE7B7' },    
      { value: 15000, color: '#6EE7B780' }   
    ],
    label: 'Feb',
  },
  {
    stacks: [
      { value: 13000, color: '#1F2937' },
      { value: 6000, color: '#1F293780' }
    ],
    label: 'Mar',
  },
  {
    stacks: [
      { value: 15000, color: '#93C5FD' },
      { value: 15000, color: '#93C5FD80' }
    ],
    label: 'Apr',
  },
  {
    stacks: [
      { value: 7000, color: '#3B82F6' },
      { value: 5000, color: '#3B82F680' }
    ],
    label: 'May',
  },
  {
    stacks: [
      { value: 6000, color: '#C4B5FD' },
      { value: 4000, color: '#C4B5FD80' }
    ],
    label: 'Jun',
  }
];


    const lineData = [
        { value: 5000 },
        { value: 8000 },
        { value: 12000 },
        { value: 15000 },
        { value: 13000 },
        { value: 18000 },
        { value: 20000 },
        { value: 19000 },
        { value: 15000 },
        { value: 20000 },
        { value: 22000 },
        { value: 25000 },
        { value: 27000 }
    ];

    const projectedData = [
        { value: 25000 },
        { value: 27000 },
        { value: 30000 },
        { value: 28000 }
    ];

    return (
        <View style={styles.card}>
            <View style={styles.chartContainer}>
                <Text style={styles.title}>Projections vs Actuals</Text>
                <BarChart
                    stackData={barData}
                    width={windowWidth / 1.3}
                    height={windowHeight / 7}
                    barWidth={30}
                    spacing={20}
                    stackBorderBottomLeftRadius={4}
                    stackBorderBottomRightRadius={4}
                    stackBorderTopLeftRadius={4}
                    stackBorderTopRightRadius={4}
                    hideRules
                    xAxisThickness={0}
                    yAxisThickness={0}
                    yAxisTextStyle={styles.axisLabel}
                    noOfSections={3}
                    maxValue={30000}
                    yAxisLabelSuffix="K"
                    formatYLabel={(value) => `${parseInt(value) / 1000}`}
                    isAnimated
                />

            </View>

            <View style={styles.lineChartContainer}>
                <LineChart
                    data={lineData}
                    data2={projectedData}
                    width={windowWidth / 1.3}
                    height={windowHeight / 5}
                    spacing={35}
                    thickness={2.5}
                    color="#1F2937"
                    color2="#D1D5DB"
                    curved
                    hideDataPoints
                    hideDataPoints2
                    startFillColor="#F3F4F6"
                    endFillColor="#FFFFFF"
                    startOpacity={0.1}
                    endOpacity={0}
                    yAxisColor="#E5E7EB"
                    xAxisColor="#E5E7EB"
                    yAxisThickness={0}
                    xAxisThickness={0}
                    yAxisTextStyle={styles.axisLabel}
                    yAxisLabelSuffix="K"
                    formatYLabel={(value) => `${parseInt(value) / 1000}`}
                    noOfSections={3}
                    maxValue={30000}
                    strokeDashArray2={[5, 5]}
                    areaChart
                    xAxisLabelTexts={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'jun', 'july', 'Agu', 'sept', 'Oct', 'Nov', 'Dec']}
                />
                <View style={styles.activityContainer}>
                    <Text style={styles.activityTitle}>Recent Activity</Text>
                    <View style={styles.activityValue}>
                        <View style={styles.dot} />
                        <Text style={styles.weekLabel}>Current Week</Text>
                        <Text style={styles.amount}>$58,211</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB'
    },
    card: {
        flex: 1
        // backgroundColor: '#FFFFFF',
        // padding: 10,
        // borderRadius: 12,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.05,
        // shadowRadius: 8,
        // elevation: 3
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 20
    },
    chartContainer: {
        backgroundColor: '#F9F9FA',
        overflow: 'hidden',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        padding: 10
    },
    lineChartContainer: {
        backgroundColor: '#F9F9FA',
        marginBottom: 20,
        marginTop: 20,
        overflow: 'hidden',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        padding: 10
    },
    axisLabel: {
        fontSize: 11,
        color: '#9CA3AF'
    },
    activityContainer: {
        marginTop: 20,
        borderTopColor: '#F3F4F6',
        flexDirection: 'row',
        alignItems: "center"
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    activityValue: {
        flexDirection: 'row',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 10
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#1F2937',
        marginRight: 8
    },
    weekLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginRight: 12
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937'
    }
});

export default ProjectionsVsActuals;