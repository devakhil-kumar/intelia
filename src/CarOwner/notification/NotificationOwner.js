import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from '../../contexts/ThemeContext';
import Fonts from '../../styles/GolbalFonts';

const NotificationsOwner = () => {
    const theme = useTheme();
    const styles = style(theme);


    const notifications = [
        {
            id: 1,
            title: 'Karen Hope ',
            subtitle: 'has created new task',
            day: 'Monday',
            color: '#5B7FFF',
            hasImage: true,
        },
        {
            id: 2,
            title: 'Due date of ',
            subtitle:'Expiring License',
            day: 'Monday',
            color: '#7DD3C0',
            hasImage: false,
        },
        {
            id: 3,
            title: 'Tony Soap ',
            subtitle:"commented",
            day: 'Monday',
            color: '#E8E8E8',
            hasImage: false,
        },
        {
            id: 4,
            title: 'Samantha William ',
            subtitle: 'haha on Fire',
            day: 'Monday, June',
            color: '#FFD93D',
            hasImage: true,
        },
        {
            id: 5,
            title: 'You has moved "New Shoot"',
            subtitle: null,
            day: 'Monday',
            color: '#FF9B50',
            hasImage: false,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={styles.headerRight}>
                    <Text style={styles.headerSubtext}>Notifications</Text>
                    <Text style={styles.headerDots}>•••</Text>
                </View>
            </View>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.todayText}>Today</Text>
                {notifications.map((notification) => (
                    <View key={notification.id} style={styles.notificationCard}>
                        <View style={styles.cardContent}>
                            <View
                                style={[
                                    styles.colorIndicator,
                                    { backgroundColor: notification.color },
                                ]}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.notificationTitle}>
                                    {notification.title}
                                </Text>
                                {notification.subtitle && (
                                    <Text style={styles.notificationSubtitle}>
                                        {notification.subtitle}
                                    </Text>
                                )}
                            </View>
                            <Text style={styles.dayText}>{notification.day}</Text>
                        </View>

                        {notification.hasImage && (
                            <View style={styles.imagePlaceholder} />
                        )}
                    </View>
                ))}

                <TouchableOpacity style={styles.loadMoreButton}>
                    <Text style={styles.loadMoreText}>Load More</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const style = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:theme.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.InterBold,
        color: theme.primaryText
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerSubtext: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterRegular,
        color: theme.subText
    },
    headerDots: {
        fontSize: 20,
        color: '#A0A0A0',
        fontWeight: '700',
    },
    todayText: {
        fontSize:moderateScale(16),
        fontFamily:Fonts.InterSemiBold,
         color: theme.primaryText
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    notificationCard: {
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    colorIndicator: {
        width: 6,
        height: 48,
        borderRadius: 3,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    notificationTitle: {
       fontSize: moderateScale(14),
        color:theme.primaryText,
        fontFamily:Fonts.InterSemiBold
    },
    notificationSubtitle: {
        fontSize: moderateScale(14),
        color:theme.primaryText,
        fontFamily:Fonts.InterRegular
    },
    dayText: {
        fontSize:moderateScale(11),
        fontFamily:Fonts.InterRegular,
        color:theme.subText
    },
    imagePlaceholder: {
        width: '100%',
        height: 120,
        backgroundColor: '#E8E8E8',
        borderRadius: 8,
        marginTop: 12,
    },
    loadMoreButton: {
        backgroundColor:theme.primary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        width:'50%',
        alignSelf:'flex-end'
    },
    loadMoreText: {
        color:theme.background,
        fontSize: moderateScale(15),
        fontFamily:Fonts.InterSemiBold
    },
});

export default NotificationsOwner;