import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    ActivityIndicator,
    Dimensions,
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
import CustomBtn from '../../components/CustomBtn';
import { useTheme } from '../../contexts/ThemeContext';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


const UploaddriverImage = () => {
    const route = useRoute();
    const theme = useTheme();
    const styles = style(theme);

    const { driverData, galleryImage } = route.params || {};
    console.log(driverData, 'driverdata')
    const [selfie, setSelfie] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (galleryImage) {
            setSelfie(galleryImage.path);
        }
    }, [galleryImage]);

    const takeSelfie = async () => {
        try {
            const image = await ImagePicker.openCamera({
                width: 300,
                height: 300,
                cropping: true,
                compressImageQuality: 0.6,
                mediaType: 'photo',
            });
            setSelfie(image.path);
        } catch (error) {
            console.log('Camera cancelled or failed:', error);
        } finally {

        }
    };

    const handleApiCall = async (image) => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('licenseNumber', driverData.licenseNumber);
            formData.append('fullName', driverData.fullName);
            formData.append('email', driverData.email);
            formData.append('password', driverData.password);
            formData.append('phoneNumber', driverData.phoneNumber);
            formData.append('municipality', driverData.municipality);
            formData.append('validUntil', driverData.validUntil);
            const licensePhoto = {
                uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
                type: image.mime || 'image/jpeg',
                name: image.path.split('/').pop() || `profile_${Date.now()}.jpg`,
            };
            formData.append('licensePhoto', licensePhoto);
            const response = await dispatch(registerDriver(formData)).unwrap();
            dispatch(showMessage({
                type: 'success',
                text: response?.message || 'Driver registered successfully!',
            }));
            navigation.navigate('verificationScreen')
        } catch (error) {
            let errorMessage = 'Signup failed! Please try again.';
            if (error) {
                errorMessage = error;
            } else if (error?.data?.message) {
                errorMessage = error.data.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            dispatch(showMessage({
                type: 'error',
                text: errorMessage,
            }));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Uploading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={ImagePath.backgroundImage} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name='chevron-left' color={'#000'} size={25} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>License verification</Text>
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
                    {!selfie ?
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={takeSelfie}
                            disabled={loading}
                        >
                            <View style={styles.innerCircle} />
                        </TouchableOpacity>
                        :
                        <CustomBtn
                            title={'Submit'}
                            onPress={() => handleApiCall({ path: selfie, mime: 'image/jpeg' })}
                        />
                    }
                </View>
            </ImageBackground>
        </View>
    );
};

export default UploaddriverImage;

const style = (theme) =>  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: "space-around"
    },
    imageContainer: {
        width: windowWidth/1.2,
        height:windowHeight/4.5,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selfieImage: {
        width: '100%',
        height: '100%',
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
        paddingHorizontal: 16,
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    headerTitle: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterSemiBold,
        color: theme.text,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
        fontFamily: Fonts.InterMedium,
    }
});