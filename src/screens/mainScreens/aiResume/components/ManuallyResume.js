import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from "react-native-image-crop-picker";
import DriverFields from "../../../screens/authScreens/components/DriverFields";
import {
    validateConfirmPassword,
    validateDate,
    validateEmail,
    validateLicenseNumber,
    validateName,
    validatePassword,
    validatePhoneNumber,
} from "../../../units/validations";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { moderateScale } from "react-native-size-matters";
import { ThemeContext, useFocusEffect } from "@react-navigation/native";
import Fonts from "../../../styles/GolbalFonts";
import { useTheme } from "../../../contexts/ThemeContext";
import Feather from "@react-native-vector-icons/feather";
import CustomHeader from "../../../CarOwner/components/CustomHeader";

export default function StepForm({ navigation }) {
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        name: "",
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
        eduTitle: "",
        eduSchool: "",
    });

    const initialFormData = {
        fullName: "",
        companyName: "",
        reason: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        licenseNumber: "",
        municipality: "",
        validUntil: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const [licensePhoto, setLicensePhoto] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const theme = useTheme();
    const formStyles = step1Styles(theme);
    const styles = style(theme)

    useFocusEffect(
        useCallback(() => {
            setStep(1);
            setForm({
                name: "",
                jobTitle: "",
                company: "",
                startDate: "",
                endDate: "",
                location: "",
                description: "",
                eduTitle: "",
                eduSchool: "",
            });
            setFormData(initialFormData);
            setLicensePhoto(null);
            setErrors({});
            setIsSubmitted(false);
            return () => { };
        }, [])
    );


    const titles = ["Basic Info", "Experience", "Skills & Perferences", "AI Resume Preview"];

    const progress = new Animated.Value((step - 1) / 4);
    Animated.timing(progress, {
        toValue: step / 4,
        duration: 300,
        useNativeDriver: false,
    }).start();

    const nextStep = () => step < 4 && setStep(step + 1);
    const prevStep = () => step > 1 && setStep(step - 1);

    const validateField = (field, value) => {
        switch (field) {
            case "fullName":
                return validateName(value, "fullName");
            case "phoneNumber":
                return validatePhoneNumber(value);
            case "email":
                return validateEmail(value);
            case "password":
                return validatePassword(value);
            case "licenseNumber":
                return validateLicenseNumber(value);
            case "municipality":
                return !value ? "Municipality is required" : "";
            case "validUntil":
                return validateDate(value);
            default:
                return "";
        }
    };

    const handleNextStep1 = () => {
        setIsSubmitted(true);

        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        nextStep();
    };

    const showImagePickerOptions = () => {
        ImagePicker.openPicker({
            width: 800,
            height: 600,
            cropping: true,
            compressImageQuality: 0.8,
            mediaType: "photo",
        })
            .then((image) => {
                setLicensePhoto({
                    uri: image.path,
                    type: image.mime,
                    name: image.filename || `license_${Date.now()}.jpg`,
                });
            })
            .catch((error) => {
                if (error.code !== "E_PICKER_CANCELLED") {
                    Alert.alert("Error", "Failed to pick image");
                }
            });
    };

    const removeImage = () => setLicensePhoto(null);

    const input = (label, key, placeholder, big = false) => (
        <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                value={form[key]}
                onChangeText={(t) => setForm({ ...form, [key]: t })}
                style={[styles.input, big && styles.textarea]}
                multiline={big}
            />
        </View>
    );

    const renderStep = () => {
        if (step === 1) {
            return (
                <KeyboardAwareScrollView
                    extraScrollHeight={100}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                >
                    <View style={formStyles.content}>
                        <DriverFields
                            formData={formData}
                            setFormData={setFormData}
                            theme={theme}
                            errors={errors}
                            isSubmitted={isSubmitted}
                            setErrors={setErrors}
                            validateField={validateField}
                        />
                        {/* PHOTO SECTION */}
                        <View style={formStyles.imageSection}>
                            <Text style={formStyles.sectionTitle}>
                                Upload License Photo
                                <Text style={formStyles.optional}> (Optional)</Text>
                            </Text>

                            {licensePhoto ? (
                                <View style={formStyles.imagePreviewContainer}>
                                    <Image source={{ uri: licensePhoto.uri }} style={formStyles.imagePreview} />

                                    <TouchableOpacity style={formStyles.removeButton} onPress={removeImage}>
                                        <Text style={formStyles.removeButtonText}>✕</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={formStyles.changePhotoButton} onPress={showImagePickerOptions}>
                                        <Text style={formStyles.changePhotoText}>Change Photo</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity style={formStyles.uploadButton} onPress={showImagePickerOptions}>
                                    <Text style={formStyles.uploadIcon}>📷</Text>
                                    <Text style={formStyles.uploadText}>Upload Photo</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            );
        }

        if (step === 2)
            return (
                <>
                    {input("Company Name", "company", "e.g. Amazon")}
                    {input("Start Date", "startDate", "e.g. Jan 2021")}
                    {input("End Date", "endDate", "e.g. Present")}
                    {input("vehicle Type", "location", "Password")}
                    {input("Route Type", "jobTitle", "Driving License NUmber")}
                    {input("Description", "description", "write description", true)}
                </>
            );

        if (step === 3)
            return (
                <>
                    {input("Skills", "eduTitle", "enter your skills")}
                    {input("Additional Preferences", "eduSchool", "e.g. Delhi University")}
                </>
            );

        return (
            <View style={{ marginTop: 20 }}>
                <Text style={styles.previewTitle}>{form.name || "John Doe"}</Text>
                <Text style={styles.section}>Delivery Driver</Text>

                <Text style={styles.section}>Experience</Text>
                <Text style={styles.jobTitle}>{form.jobTitle || "Delivery Driver"}</Text>
                <Text style={styles.smallText}>
                    {form.company || "Amazon"} — {form.location || "Paris"}
                </Text>
                <Text style={styles.smallText}>
                    {/* {form.startDate || "Jan 2021"} - {form.endDate || "Present"} */}
                    {'Aug 2018 - Present - 1 year, Paris '}
                </Text>
                <Text style={styles.descText}>
                    {/* {form.description || "Worked closely with the logistics team and management to optimize delivery routes and ensure timely transportation of goods.  "} */}
                    {'Worked closely with the logistics team and management to optimize delivery routes and ensure timely transportation of goods.  '}
                </Text>

                <Text style={[styles.section, { marginTop: 20 }]}>Education</Text>
                <Text style={styles.jobTitle}>{form.eduTitle || "Bachelor in Logistics"}</Text>
                <Text style={styles.smallText}>{form.eduSchool || "Delhi University"}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={(step === 1) ? [0, 'bottom'] : ['top', 'bottom']}>
            {/* HEADER - Consistent for all steps */}
            {step === 1 ? (
                <CustomHeader />
            ) : (
                <View style={styles.headerback}>
                    <TouchableOpacity onPress={prevStep}>
                        <Feather name='chevron-left' color={'#000'} size={25} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Experience</Text>
                    <View style={{ width: 24 }} />
                </View>
            )}

            {/* MAIN CONTENT AREA */}
            <View style={styles.contentContainer}>
                {/* STEP HEADER & PROGRESS */}
                <View style={styles.headerSection}>
                    <View style={styles.header}>
                        <Text style={styles.stepTitle}>{titles[step - 1]}</Text>
                        <Text style={styles.stepCount}>Step {step} of 4</Text>
                    </View>

                    <View style={styles.progressBarBackground}>
                        <Animated.View
                            style={{
                                ...styles.progressBarFill,
                                width: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["0%", "100%"],
                                }),
                            }}
                        />
                    </View>
                </View>

                <ScrollView
                    style={styles.scrollContent}
                    contentContainerStyle={styles.scrollContentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {renderStep()}
                    <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep1}>
                        <Text style={styles.nextText}>{step === 4 ? "Download Pdf" : "Next"}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const step1Styles = (theme) =>
    StyleSheet.create({
        content: { marginBottom: 0 },
        imageSection: { marginBottom: 0 },
        sectionTitle: { fontSize: 16, fontFamily: Fonts.RubikBold, color: theme.text, marginTop: 15 },
        optional: { color: "#666", fontSize: 14 },
        uploadButton: {
            marginTop: 10,
            backgroundColor: "#F5F5F5",
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: "#ddd",
            padding: 32,
            alignItems: "center",
            borderRadius: 12,
        },
        uploadIcon: { fontSize: 48 },
        uploadText: { fontSize: 16, color: "#666" },
        imagePreviewContainer: { marginTop: 5, alignItems: "center" },
        imagePreview: { width: "100%", height: 200, borderRadius: 12 },
        removeButton: {
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "black",
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
        },
        removeButtonText: { color: "white", fontSize: 18 },
        changePhotoButton: {
            marginTop: 12,
            backgroundColor: "#F5F5F5",
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 8,
        },
        changePhotoText: { color: "#2563EB", fontWeight: "600" },
    });

const style = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headerSection: {
        paddingTop: 10,
        paddingBottom: 0,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    stepTitle: {
        fontSize: 18,
        color:theme.primary,
        fontWeight: "600"
    },
    stepCount: {
        fontSize: 14,
        color: "#555"
    },
    progressBarBackground: {
        width: "100%",
        height: 3,
        backgroundColor: "#E0E0E0",
        borderRadius: 5,
    },
    progressBarFill: {
        height: 3,
        backgroundColor:theme.primary,
        borderRadius: 5,
    },
    scrollContent: {
        flex: 1,
    },
    scrollContentContainer: {
        paddingBottom: 120,
    },
    label: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterMedium,
        color: theme.text
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 16,
        padding: 16,
        marginTop: 5,
        fontSize: moderateScale(14),
        color: theme.inputText
    },
    textarea: {
        height: 120,
        textAlignVertical: "top"
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingBottom: 20,
    },
    backBtn: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 10,
        width: "48%",
        alignItems: "center",
    },
    nextBtn: {
        padding: 12,
        backgroundColor: theme.primary,
        borderRadius: 8,
        width: "48%",
        alignItems: "center",
        alignSelf: 'center',
        marginTop: 20
    },
    backText: {
        color: "#333",
        fontWeight: "600",
    },
    nextText: {
        color: "#fff",
        fontWeight: "600",
    },
    previewTitle: {
        fontSize: 22,
        fontWeight: "700",
    },
    section: {
        fontSize: moderateScale(18),
        // marginTop: 20,
        fontFamily: Fonts.InterSemiBold,
        color: theme.text
    },
    jobTitle: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterRegular,
        color: theme.subText
        // marginTop: 10,
        // fontWeight: "600"
    },
    smallText: {
        marginTop: 4,
        fontSize: moderateScale(14),
        color: theme.subText,
        fontFamily: Fonts.InterRegular
    },
    descText: {
        // marginTop: 10,
        lineHeight: 20,
        fontSize: moderateScale(13),
        fontFamily: Fonts.InterMedium,
        color: theme.subText
    },
    headerback: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterSemiBold,
        color: '#000',
    },
});