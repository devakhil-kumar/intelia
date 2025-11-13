import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import ImagePath from '../../contexts/ImagePath'
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import Fonts from '../../styles/GolbalFonts';
import { useTheme } from '../../contexts/ThemeContext';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


const VerificationCompletedScreen = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const styles = style(theme)

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigation]);


    return (
        <View style={{ flex: 1, backgroundColor: theme.background, alignItems: 'center' }}>
            <Text style={styles.headerText}>Selfie verification</Text>
            <View style={styles.container}>
                <Image
                    source={ImagePath.verfication}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Verification Completed</Text>
                <Text style={styles.subtitle}>
                    Your verification is complete. Please wait for admin approval to activate your account.
                </Text>
            </View>
        </View>
    );
};

export default VerificationCompletedScreen;

const style = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        paddingHorizontal: 24,
        justifyContent: 'center'
    },
    headerText: {
        fontSize:moderateScale(18),
        fontFamily:Fonts.InterSemiBold,
        marginTop:20
    },
    image: {
        width: windowWidth,
        height: windowHeight / 2.4,
        marginBottom: 10,
    },
    title: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.InterBold,
        color: '#1C1C1C',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterMedium,
        color: theme.subText,
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 300,
    },
});
