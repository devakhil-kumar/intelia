import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ImageBackground,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePath from '../../contexts/ImagePath';
import { moderateScale } from 'react-native-size-matters';
import Fonts from '../../styles/GolbalFonts';
import Feather from '@react-native-vector-icons/feather';

const SelfieIntroScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { driverData } = route.params || {};
    const [selectedImage, setSelectedImage] = useState(null);

    const openGallery = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
            });
            setSelectedImage(image.path);
        } catch (error) {
            console.log('Gallery access cancelled or failed:', error);
        }
    };

    const openCameraScreen = () => {
           navigation.navigate('UploadScreen', { driverData });
    };

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
                    <Text style={styles.headerText}>
                        We will complete the photo in your document with your selfie to confirm your identity
                    </Text>

                    <Image
                        source={ImagePath.faceScan}
                        style={styles.faceIllustration}
                        resizeMode="contain"
                    />

                    <View style={styles.infoBox}>
                        {/* <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/483/483408.png' }} // lock icon
          style={styles.lockIcon}
        /> */}
                        <Text style={styles.infoText}>
                            The data you share will be encrypted, stored securely, and only used to verify your identity
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.cameraButton} onPress={openCameraScreen}>
                        <Text style={styles.cameraButtonText}>Open Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.galleryButton} onPress={openGallery}>
                        <Text style={styles.galleryButtonText}>Choose from Gallery</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default SelfieIntroScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    headerText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#1F1F39',
        marginBottom: 40,
    },
    faceIllustration: {
        width: 200,
        height: 200,
        marginBottom: 40,
    },
    infoBox: {
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    lockIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    infoText: {
        fontSize: 12,
        color: '#555',
        flex: 1,
    },
    cameraButton: {
        backgroundColor: '#2979FF',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    cameraButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    galleryButton: {
        borderColor: '#2979FF',
        borderWidth: 1,
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    galleryButtonText: {
        color: '#2979FF',
        fontSize: 16,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterSemiBold,
        // color: theme.text,
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
});
