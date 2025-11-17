import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ServerStatusChart = ({ time, percentage, color }) => {
    return (
        <View style={styles.serverBarContainer}>
            <Text style={styles.timeLabel}>{time}</Text>
            <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.percentageLabel}>{percentage}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    serverBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    timeLabel: {
        width: 50,
        fontSize: 12,
        color: '#999'
    },
    barBackground: {
        flex: 1,
        height: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
        marginHorizontal: 10,
        overflow: 'hidden'
    },
    barFill: {
        height: '100%',
        borderRadius: 4
    },
    percentageLabel: {
        width: 40,
        textAlign: 'right',
        fontSize: 12,
        color: '#999'
    }
});

export default ServerStatusChart;