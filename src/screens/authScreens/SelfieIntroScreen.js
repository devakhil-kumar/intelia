import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ImageBackground,
    Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePath from '../../contexts/ImagePath';
import { moderateScale } from 'react-native-size-matters';
import Fonts from '../../styles/GolbalFonts';
import Feather from '@react-native-vector-icons/feather';
import CustomBtn from '../../components/CustomBtn';
import { useTheme } from '../../contexts/ThemeContext';
import Lucide from '@react-native-vector-icons/lucide';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


const SelfieIntroScreen = () => {
    const theme = useTheme();
    const styles = style(theme);
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
            navigation.navigate('UploadScreen', {
                driverData,
                galleryImage: image,
            });
        } catch (error) {
            console.log('Gallery access cancelled or failed:', error);
        }
    };

    const openCameraScreen = () => {
        navigation.navigate('UploadScreen', { driverData });
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={ImagePath.backgroundImage} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name='chevron-left' color={'#0000'} size={25} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>License verification</Text>
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
                        <Lucide name='lock-keyhole' size={20} color={theme.text} />
                        <Text style={styles.infoText}>
                            The data you share will be encrypted, stored{'\n'} securely, and only used to verify your identity
                        </Text>
                    </View>
                    <CustomBtn title={"Open Camera"} onPress={openCameraScreen} />
                    <TouchableOpacity style={styles.galleryButton} onPress={openGallery}>
                        <Text style={styles.galleryButtonText}>Choose from Gallery</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

export default SelfieIntroScreen;

const style = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    headerText: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterMedium,
        textAlign: 'center',
        color: theme.text,
    },
    faceIllustration: {
        width: windowWidth / 1.2,
        height: windowHeight / 3.2,
        marginTop:10 * 5
    },
    infoBox: {
        backgroundColor: theme.subText,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        padding:8
    },
    lockIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    infoText: {
        fontSize: moderateScale(12),
        fontFamily:Fonts.InterRegular,
        color: '#555',
    },
    galleryButton: {
        borderColor: theme.primary,
        borderWidth: 1,
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    galleryButtonText: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterSemiBold,
        color: theme.text,
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
