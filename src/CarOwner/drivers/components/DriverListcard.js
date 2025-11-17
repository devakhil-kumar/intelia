import Feather from '@react-native-vector-icons/feather';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { moderateScale } from 'react-native-size-matters';
import Fonts from '../../../styles/GolbalFonts';
import ImagePath from '../../../contexts/ImagePath';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


const DriverListCard = ({ item }) => {
    const theme = useTheme();
    const styles = style(theme);
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={{ flex: 1 }}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Feather name="more-horizontal" size={20} color="#6B6B6B" />
                    </View>

                    <Text style={styles.phone}>{item.phone}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                </View>
            </View>
            <View style={styles.iconRow}>
                <TouchableOpacity style={styles.iconBox}>
                    <Image source={ImagePath.driverMail} style={styles.imageStyleMail} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBox}>
                    <Image source={ImagePath.driverMesg} style={styles.imageStyleMesg} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DriverListCard;

const style = (theme) => StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 15,
        marginVertical: 10,
        width: '98%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 12,
        marginRight: 12,
    },

    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    name: {
        fontSize: moderateScale(16),
        color: theme.primaryText,
        fontFamily: Fonts.InterSemiBold
    },
    phone: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterRegular,
        color: theme.text,
        marginTop: 4,
    },

    email: {
        fontSize: moderateScale(13),
        marginTop: 2,
        fontFamily: Fonts.InterMedium,
        color: theme.subText
    },
    iconRow: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 15,
    },

    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#F8F7FC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F2E9B6',
    },
    imageStyleMail: {
        width: windowWidth * 0.19,   
        aspectRatio: 0.4,            
        resizeMode: 'contain',
    },
    imageStyleMesg: {
        width: windowWidth * 0.19,   
        aspectRatio: 0.3,              
        resizeMode: 'contain',
    }

});
