import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import DriverFields from "../../screens/authScreens/components/DriverFields";
import { useTheme } from "../../contexts/ThemeContext";
import { validateConfirmPassword, validateDate, validateEmail, validateLicenseNumber, validateName, validatePassword, validatePhoneNumber } from "../../units/validations";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomBtn from "../../components/CustomBtn";
import Fonts from "../../styles/GolbalFonts";
import { moderateScale } from "react-native-size-matters";
import { useFocusEffect } from "@react-navigation/native";

const DriverList = () => {
    const initialFormData = {
        fullName: '',
        companyName: '',
        reason: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        licenseNumber: '',
        municipality: '',
        validUntil: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [licensePhoto, setLicensePhoto] = useState(null);
    const theme = useTheme();
    const styles = style(theme);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setFormData(initialFormData);
                setLicensePhoto(null);
                setErrors({});
                setIsSubmitted(false);
            };
        }, [])
    );

    const handleCancel = () => {
        setFormData(initialFormData);
        setLicensePhoto(null);
        setErrors({});
        setIsSubmitted(false);
    };

    const validateField = (field, value) => {
        switch (field) {
            case 'fullName': return validateName(value, 'fullName');
            case 'companyName':
                if (!value) return 'Company name is required';
                else if (value.length < 2) return 'Company name must be at least 2 characters';
                else return '';
            case 'reason':
                if (!value) return 'This field is required';
                else if (value.length < 10) return 'Please provide more details (at least 10 characters)';
                else return '';
            case 'phoneNumber': return validatePhoneNumber(value);
            case 'email': return validateEmail(value);
            case 'password': return validatePassword(value);
            case 'confirmPassword': return validateConfirmPassword(formData.password, value);
            case 'licenseNumber': return validateLicenseNumber(value);
            case 'municipality': return !value ? 'Municipality is required' : '';
            case 'validUntil': return validateDate(value);
            default: return '';
        }
    };

    const showImagePickerOptions = () => {
        ImagePicker.openPicker({
            width: 800,
            height: 600,
            cropping: true,
            cropperCircleOverlay: false,
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 0.8,
            mediaType: 'photo',
        }).then(image => {
            setLicensePhoto({
                uri: image.path,
                type: image.mime,
                name: image.filename || `license_${Date.now()}.jpg`,
            });
        }).catch(error => {
            if (error.code !== 'E_PICKER_CANCELLED') {
                Alert.alert('Error', 'Failed to pick image');
            }
        });
    };

    const removeImage = () => {
        setLicensePhoto(null);
    };

    const handleAddDriver = () => {
        setIsSubmitted(true);
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Alert.alert('Validation Error', 'Please fix all errors before submitting');
            return;
        }
        if (!licensePhoto) {
            Alert.alert('Missing Photo', 'Please upload a license photo');
            return;
        }
        Alert.alert('Success', 'Driver added successfully!');
        setFormData(initialFormData);
        setLicensePhoto(null);
        setErrors({});
        setIsSubmitted(false);
    };

    return (
        <SafeAreaView style={styles.container} edges={[0]}>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                extraScrollHeight={100}
                enableOnAndroid={true}
            >
                <View style={styles.content}>
                    <DriverFields
                        formData={formData}
                        setFormData={setFormData}
                        theme={theme}
                        errors={errors}
                        isSubmitted={isSubmitted}
                        setErrors={setErrors}
                        validateField={validateField}
                    />
                    <View style={styles.imageSection}>
                        <Text style={styles.sectionTitle}>
                            Upload License Photo
                            <Text style={styles.optional}> (Optional but Recommended)</Text>
                        </Text>

                        {licensePhoto ? (
                            <View style={styles.imagePreviewContainer}>
                                <Image
                                    source={{ uri: licensePhoto.uri }}
                                    style={styles.imagePreview}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={removeImage}
                                >
                                    <Text style={styles.removeButtonText}>✕</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.changePhotoButton}
                                    onPress={showImagePickerOptions}
                                >
                                    <Text style={styles.changePhotoText}>Change Photo</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={showImagePickerOptions}
                            >
                                <Text style={styles.uploadIcon}>📷</Text>
                                <Text style={styles.uploadText}>Upload Photo</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        <CustomBtn title={'Add Driver'} onPress={handleAddDriver} />
                        <TouchableOpacity style={styles.galleryButton} onPress={handleCancel} >
                            <Text style={styles.galleryButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const style = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    imageSection: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: moderateScale(16),
        color: theme.text,
        fontFamily: Fonts.RubikBold,
        marginTop: 20
    },
    optional: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
    },
    uploadButton: {
        backgroundColor: '#F5F5F5',
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    uploadIcon: {
        fontSize: 48,
        marginBottom: 8,
    },
    uploadText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    imagePreviewContainer: {
        position: 'relative',
        alignItems: 'center',
        marginTop: 10
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    changePhotoButton: {
        marginTop: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    changePhotoText: {
        color: '#2563EB',
        fontSize: 14,
        fontWeight: '500',
    },
    buttonContainer: {
        // marginTop:15,
        // gap: 12,
    },
    addButton: {
        backgroundColor: '#2563EB',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    cancelButtonText: {
        color: '#2563EB',
        fontSize: 16,
        fontWeight: '600',
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
});

export default DriverList;