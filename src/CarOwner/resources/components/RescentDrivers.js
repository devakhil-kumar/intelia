import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { moderateScale } from 'react-native-size-matters';
import Fonts from '../../../styles/GolbalFonts';
import Feather from '@react-native-vector-icons/feather';

const DriverItem = ({ name, role, image, hasNotification }) => {
    const theme = useTheme();
    const styles = style(theme);
    return (
        <TouchableOpacity style={styles.driverItem}>
            <Image source={{ uri: image }} style={styles.driverImage} />
            <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{name}</Text>
                <Text style={styles.driverRole}>{role}</Text>
            </View>
            <View style={styles.iconContainer}>
                {hasNotification && <View style={styles.notificationDot} />}
                {hasNotification ? <View style={styles.messageIcon}>
                    <Feather name='mail' size={20} color={theme.primary} />
                </View> : <Feather name='mail' size={20} color={theme.primary} style={{ marginRight: 10 }} />}
            </View>
        </TouchableOpacity>
    );
};

const RecentDrivers = () => {
    const drivers = [
        {
            name: 'Samantha William',
            role: 'Marketing Manager',
            image: 'https://i.pravatar.cc/150?img=1',
            hasNotification: false
        },
        {
            name: 'Tony Soap',
            role: 'UI Designer',
            image: 'https://i.pravatar.cc/150?img=12',
            hasNotification: true
        },
        {
            name: 'Karen Hope',
            role: 'Web Developer',
            image: 'https://i.pravatar.cc/150?img=5',
            hasNotification: false
        },
        {
            name: 'Jordan Nico',
            role: 'Graphic Design',
            image: 'https://i.pravatar.cc/150?img=13',
            hasNotification: false
        },
        {
            name: 'Nadila Adja',
            role: 'QA Engineer',
            image: 'https://i.pravatar.cc/150?img=9',
            hasNotification: true
        }
    ];

    const theme = useTheme();
    const styles = style(theme);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Recent Drivers</Text>
                    <Text style={styles.subtitle}>You have <Text style={styles.count}>456</Text> Drivers</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                    <Feather name='plus-circle' size={20} color={theme.white} />
                </TouchableOpacity>
            </View>

            <View style={styles.driversList}>
                {drivers.map((driver, index) => (
                    <DriverItem
                        key={index}
                        name={driver.name}
                        role={driver.role}
                        image={driver.image}
                        hasNotification={driver.hasNotification}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.viewMoreButton}>
                <Text style={styles.viewMoreText}>View More</Text>
            </TouchableOpacity>
        </View>
    );
};

const style = (theme) => StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginTop: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20
    },
    title: {
        fontSize: moderateScale(20),
        color: theme.primaryText,
        fontFamily: Fonts.InterSemiBold,
    },
    subtitle: {
        fontSize: moderateScale(12),
        color: theme.subText,
        fontFamily: Fonts.InterRegular
    },
    count: {
        fontFamily: Fonts.InterSemiBold,
        color: '#2C3E50'
    },
    addButton: {
        backgroundColor: theme.primary,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '300'
    },
    driversList: {
        marginBottom: 15
    },
    driverItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5'
    },
    driverImage: {
        width: 48,
        height: 48,
        borderRadius: 8,
        marginRight: 12
    },
    driverInfo: {
        flex: 1
    },
    driverName: {
        fontSize:moderateScale(15),
        color:theme.primaryText,
        fontFamily:Fonts.InterSemiBold,
        marginBottom: 3
    },
    driverRole: {
        fontSize:moderateScale(13),
        color:theme.subText,
        fontFamily:Fonts.InterRegular
    },
    iconContainer: {
        position: 'relative',
        alignItems: 'center'
    },
    notificationDot: {
        position: 'absolute',
        top: -3,
        right: -3,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor:theme.primary,
        zIndex: 1,
        borderWidth:1,
        borderColor:theme.white
    },
    messageIcon: {
        backgroundColor: '#E8F0FE',
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewMoreButton: {
        backgroundColor: '#E8F0FE',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    viewMoreText: {
        color:theme.primary,
        fontSize: 15,
        fontWeight: '600'
    }
});

export default RecentDrivers;