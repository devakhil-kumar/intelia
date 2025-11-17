// Install: npm install react-native-gifted-charts react-native-svg

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import ImagePath from '../../../../contexts/ImagePath';

const DashboardSummaryCards = () => {
    // Jobs by location data
    const [selectedSlice, setSelectedSlice] = useState(null);
    const locations = [
        { city: 'New York', count: '73K' },
        { city: 'San Francisco', count: '39K' },
        { city: 'Sydney', count: '25K' },
        { city: 'Singapore', count: '6?K' }
    ];

    // Performance Summary - Pie Chart data
    const pieData = [
        {
            value: 70,
            color: '#1F2937',
            focused: selectedSlice === 0,
            onPress: () => setSelectedSlice(0),
        },
        {
            value: 20,
            color: '#7DBBFF',
            focused: selectedSlice === 1,
            onPress: () => setSelectedSlice(1),
        },
        {
            value: 10,
            color: '#6EE7B780',
            focused: selectedSlice === 2,
            onPress: () => setSelectedSlice(2),
        },
        {
            value: 15,
            color: '#C4B5FD',
            focused: selectedSlice === 3,
            onPress: () => setSelectedSlice(3),
        },
    ];


    const performanceItems = [
        { label: 'Direct', color: '#1F2937', amount: '$500.5K' },
        { label: 'Affiliate', color: '#60A5FA', amount: '$130.1K' },
        { label: 'Sponsored', color: '#34D399', amount: '$78.5K' },
        { label: 'E-mail', color: '#A78BFA', amount: '$48.9K' }
    ];

    // My Summary data
    const summaryItems = [
        {
            product: 'ASOS Ridley High Waist',
            price: '$79.49',
            quantity: '$3,748.18'
        },
        {
            product: 'Marco Lightweight Shirt',
            price: '$128.50',
            quantity: '$3,748.18'
        },
        {
            product: 'Half Sleeve Shirt',
            price: '$39.99',
            quantity: '$2,509.50'
        },
        {
            product: 'Lightweight Jacket',
            price: '$20.00',
            quantity: '$3,680.00'
        },
        {
            product: 'Marco Shoes',
            price: '$79.49',
            quantity: '$9,690.21'
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Jobs by Location</Text>

                <View style={styles.mapContainer}>
                    <Image
                        source={ImagePath.worldMap }
                        style={styles.mapImage}
                        resizeMode="contain"
                    />
                    <View style={[styles.marker, { top: 30, left: 60 }]} />
                    <View style={[styles.marker, { top: 30, right: 60 }]} />
                    <View style={[styles.marker, { bottom: 30, left: 80 }]} />
                    <View style={[styles.marker, { bottom: 40, right: 90 }]} />
                </View>
                <View style={styles.locationList}>
                    {locations.map((location, index) => (
                        <View key={index} style={styles.locationItem}>
                            <View style={styles.locationDot} />
                            <Text style={styles.cityName}>{location.city}</Text>
                            <Text style={styles.cityCount}>{location.count}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Performance Summary</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"center" }}>
                    <PieChart
                        data={pieData}
                        donut
                        radius={70}
                        innerRadius={40}
                        innerCircleColor="#FFFFFF"
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                            {selectedSlice !== null ? pieData[selectedSlice].value + '%' : '—'}
                        </Text>
                    </View>
                </View>


                <View style={styles.legendContainer}>
                    {performanceItems.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={styles.legendLeft}>
                                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                                <Text style={styles.legendLabel}>{item.label}</Text>
                            </View>
                            <Text style={styles.legendAmount}>{item.amount}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>My Summary</Text>

                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.productColumn]}>
                        Dummy
                    </Text>
                    <Text style={[styles.tableHeaderText, styles.priceColumn]}>
                        Quantity
                    </Text>
                    <Text style={[styles.tableHeaderText, styles.quantityColumn]}>
                        Amount
                    </Text>
                </View>

                {summaryItems.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.productColumn]}>
                            {item.product}
                        </Text>
                        <Text style={[styles.tableCell, styles.priceColumn]}>
                            {item.price}
                        </Text>
                        <Text style={[styles.tableCell, styles.quantityColumn]}>
                            {item.quantity}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: "#F9F9FA",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16
    },

    // Jobs by Location styles
    mapContainer: {
        height: 120,
        marginBottom: 20,
        position: 'relative',
        backgroundColor: '#E8EEF5',
        borderRadius: 8,
        overflow: 'hidden'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    },
    marker: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3B82F6',
        borderWidth: 2,
        borderColor: '#FFFFFF'
    },
    locationList: {
        // gap: 12
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal:20
    },
    locationDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#1F2937',
        marginRight: 10
    },
    cityName: {
        flex: 1,
        fontSize: 14,
        color: '#4B5563'
    },
    cityCount: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937'
    },

    // Performance Summary styles
    pieChartContainer: {
        alignItems: 'center',
    },
    centerLabel: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerLabelValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937'
    },
    legendContainer: {
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal:20
    },
    legendLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10
    },
    legendLabel: {
        fontSize: 14,
        color: '#4B5563'
    },
    legendAmount: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937'
    },

    // My Summary Table styles
    tableHeader: {
        flexDirection: 'row',
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginBottom: 8
    },
    tableHeaderText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#9CA3AF'
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6'
    },
    tableCell: {
        fontSize: 13,
        color: '#1F2937'
    },
    productColumn: {
        flex: 2,
        paddingRight: 8
    },
    priceColumn: {
        flex: 1,
        textAlign: 'center'
    },
    quantityColumn: {
        flex: 1,
        textAlign: 'right',
        fontWeight: '500'
    }
});

export default DashboardSummaryCards;