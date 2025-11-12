import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
    Platform,
    Alert,
    Dimensions,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fonts from '../../styles/GolbalFonts';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import Feather from '@react-native-vector-icons/feather';
import ImagePath from '../../contexts/ImagePath';
import { registerDriver } from '../../app/features/registerSlice';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../app/features/messageSlice';

const UploaddriverImage = () => {
    const route = useRoute();
    const { driverData } = route.params || {};
    const [selfie, setSelfie] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const takeSelfie = async () => {
        try {
            const image = await ImagePicker.openCamera({
                width: 400,
                height: 400,
                cropping: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
            });
            setSelfie(image.path);
            setLoading(true);
            setTimeout(() => {
                handleApiCall(image.path);
            }, 2000);
        } catch (error) {
            console.log('Camera cancelled or failed:', error);
        }
    };

    const handleApiCall = async (imagePath) => {
        try {
            const finalData = {
                ...driverData,
                profileImage: imagePath,
            };

            console.log('📤 Sending to API:', finalData);

            const response = await dispatch(registerDriver(finalData)).unwrap();

            dispatch(showMessage({
                type: 'success',
                text: response?.message || 'Driver registered successfully!',
            }));

            // navigation.navigate('Login');

        } catch (error) {
            console.log('API Error:', error);
            dispatch(showMessage({
                type: 'error',
                text: error?.message || 'Signup failed! Please try again.',
            }));
        } finally {
            setLoading(false);
        }
    };

    {
        loading && (
            <View style={{ flex: 1 }}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={ImagePath.backgroundImage} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name='chevron-left' color={'#0000'} size={25} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Selfie verification</Text>
                    <View style={{ width: 24 }} />
                </View>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        {selfie ? (
                            <Image source={{ uri: selfie }} style={styles.selfieImage} />
                        ) : (
                            <Image source={ImagePath.human} style={styles.selfieImage} />

                        )}
                    </View>
                    <TouchableOpacity style={styles.captureButton} onPress={takeSelfie}>
                        <View style={styles.innerCircle} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default UploaddriverImage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: "space-around"
    },
    imageContainer: {
        width: 250,
        height: 250,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selfieImage: {
        width: '100%',
        height: '100%',
    },
    placeholderBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#999',
        textAlign: 'center',
    },
    captureButton: {
        width: 80,
        height: 80,
        backgroundColor: '#E0E0E0',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 30,
    },
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'white',
        paddingHorizontal: 16,
        // elevation: 4,
        // shadowColor: theme.text,
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    headerTitle: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterSemiBold,
        // color: theme.text,
    }
});
