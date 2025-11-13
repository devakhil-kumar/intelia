import React, { useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import CustomBtn from '../../components/CustomBtn';
import Fonts from '../../styles/GolbalFonts';
import { useNavigation } from "@react-navigation/native";
import ImagePath from "../../contexts/ImagePath";
import { useTheme } from "../../contexts/ThemeContext";
import CustomDropdown from '../../components/CustomDropDown';
import OwnerFields from '../authScreens/components/OwnerFields';
import DriverFields from '../authScreens/components/DriverFields';
import {KeyboardAwareScrollView}from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from "react-redux";
import { registerOwner, } from "../../app/features/registerSlice"
import { showMessage } from "../../app/features/messageSlice";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
  validateName,
  validateLicenseNumber,
  validateDate
} from '../../units/validations';

const roleData = [
  { label: 'Owner', value: 'owner' },
  { label: 'Driver', value: 'driver' },
];


const SignupScreen = () => {

  const [selectedRole, setSelectedRole] = useState(null);
  const [roleError, setRoleError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
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
  });

  const navigation = useNavigation();
  const theme = useTheme();
  const style = styles(theme);

  const onHandleLogin = () => {
    navigation.navigate('Login')
  }


  const validateOwnerFields = () => {
    const newErrors = {};
    newErrors.fullName = validateName(formData.fullName, 'fullName');
    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required';
    } else if (formData.companyName.length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
    }
    if (!formData.reason) {
      newErrors.reason = 'This field is required';
    } else if (formData.reason.length < 10) {
      newErrors.reason = 'Please provide more details (at least 10 characters)';
    }
    newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    return newErrors;
  };

  const validateDriverFields = () => {
    const newErrors = {};
    newErrors.fullName = validateName(formData.fullName, 'fullName');
    newErrors.licenseNumber = validateLicenseNumber(formData.licenseNumber);
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
    if (!formData.municipality) {
      newErrors.municipality = 'Municipality is required';
    }
    newErrors.validUntil = validateDate(formData.validUntil);
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });
    return newErrors;
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

  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  const onNextDriverSide = () => {
    let validationErrors = {};
    if (selectedRole === 'driver') {
      validationErrors = validateDriverFields();
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      dispatch(showMessage({
        type: 'error',
        text: 'Please fix the errors in the form'
      }));
      setIsLoading(false);
      return;
    }
    if (selectedRole === 'driver') {
      const driverData = {
        fullName: formData.fullName,
        licenseNumber: formData.licenseNumber,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        municipality: formData.municipality,
        validUntil: formatDateForAPI(formData.validUntil),
      };
      navigation.navigate('OptionUpload', { driverData });
    }
  }


  const onSignup = async () => {
    setIsSubmitted(true);
    setIsLoading(true);
    if (!selectedRole) {
      setRoleError("Please select your role");
      dispatch(showMessage({
        type: 'error',
        text: 'Please select your role'
      }));
      setIsLoading(false);
      return;
    } else {
      setRoleError('');
    }

    let validationErrors = {};

    if (selectedRole === 'owner') {
      validationErrors = validateOwnerFields();
    } else if (selectedRole === 'driver') {
      validationErrors = validateDriverFields();
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      dispatch(showMessage({
        type: 'error',
        text: 'Please fix the errors in the form'
      }));
      setIsLoading(false);
      return;
    }

    try {
      if (selectedRole === 'owner') {
        const ownerData = {
          fullName: formData.fullName,
          surname: formData.surname,
          companyName: formData.companyName,
          correspondedMe: formData.reason,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
        };
        const response = await dispatch(registerOwner(ownerData)).unwrap();
        dispatch(showMessage({
          type: 'success',
          text: response?.message || 'Owner registered successfully!',
        }));
        navigation.navigate('Login');

      }
    } catch (error) {
      let errorMessage = 'Signup failed! Please try again.';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error) {
        errorMessage = error.error;
      }
      if (errorMessage.toLowerCase().includes('email already') ||
        errorMessage.toLowerCase().includes('already exists') ||
        errorMessage.toLowerCase().includes('already registered')) {
        dispatch(showMessage({
          type: 'error',
          text: 'This email is already registered. Please use a different email or try logging in.',
        }));
      } else {
        dispatch(showMessage({
          type: 'error',
          text: errorMessage,
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleSignup = () => {
    console.log('')
  }

  return (
    <SafeAreaView style={style.main}>
      <ImageBackground source={ImagePath.backgroundImage} style={style.main}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={100}
          enableOnAndroid={true}
        >
        <View style={style.innerMain}>
        <View>
          <View style={style.frontBox}>
            <Text style={style.headerText}>
              Join us{"\n"}Now!!
            </Text>
            <Text style={style.subHeaderText}>
              Let's Create your account
            </Text>

          </View>
          <View style={style.secandBox}>
            <CustomDropdown
              label="Select Your Role"
              data={roleData}
              placeholder="Select your role"
              value={selectedRole}
              onChange={item => {
                setSelectedRole(item.value);
                setRoleError('');
                setFormData('');
                setErrors('')
              }}
              customStyles={[roleError && { borderColor: theme.validationColor }]}
            />
            {roleError ? (
              <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>
                {roleError}
              </Text>
            ) : null}
          </View>
          {selectedRole === 'owner' && (
            <OwnerFields
              formData={formData}
              setFormData={setFormData}
              theme={theme}
              errors={errors}
              isSubmitted={isSubmitted}
              setErrors={setErrors}
              validateField={validateField}
            />
          )}
          {selectedRole === "driver" && (
            <DriverFields
              formData={formData}
              setFormData={setFormData}
              theme={theme}
              errors={errors}
              isSubmitted={isSubmitted}
              setErrors={setErrors}
              validateField={validateField}

            />
          )
          }
        </View>
        <View style={{ marginTop: 40 }}>
          {selectedRole === "driver" ? <CustomBtn
            title="Next"
            variant="primary"
            onPress={onNextDriverSide}
          /> : <CustomBtn
            title="Sign Up"
            variant="primary"
            onPress={onSignup}
          />}
          <View style={style.dividerContainer}>
            <View style={style.divider} />
            <Text style={style.dividerText}>OR</Text>
            <View style={style.divider} />
          </View>
          <CustomBtn
            title="Continue with Google"
            variant="outline"
            icon={
              <Image
                source={ImagePath.googleImage}
                style={style.googleIcon}
              />
            }
            onPress={onGoogleSignup}

          />
          <View style={style.signupContainer}>
            <Text style={style.signupText}>Already have an Account?</Text>
            <TouchableOpacity onPress={onHandleLogin}>
              <Text style={style.signupLink}>
                Login
              </Text>
            </TouchableOpacity>

          </View>
        </View>
        </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
      {isLoading && (
        <View style={style.loaderOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </SafeAreaView>
  )
}

export default SignupScreen;

const styles = (theme) => StyleSheet.create({
  main: {
    flex: 1
  },
  innerMain: {
    // flex: 1,
    paddingHorizontal: 18,

  },
  headerText: {
    fontSize: moderateScale(24),
    color: theme.text,
    fontFamily: Fonts.RubikBold
  },
  subHeaderText: {
    fontSize: moderateScale(12),
    color: theme.subText,
    fontFamily: Fonts.RubikMedium,
    marginTop: 10
  },
  frontBox: {
    marginTop: 20
  },
  secandBox: {
    marginTop: 15
  },
  inputHeader: {
    fontSize: moderateScale(16),
    color: theme.text,
    fontFamily: Fonts.RubikBold,
    marginTop: 20
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: "center"
  },
  divider: {
    flex: 0.1,
    height: 1,
    backgroundColor: theme.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: theme.subText,
    fontSize: moderateScale(14),
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  signupText: {
    color: theme.subText,
    fontSize: moderateScale(12),
    fontFamily: Fonts.RubikRegular
  },
  signupLink: {
    color: theme.primary,
    fontSize: moderateScale(12),
    fontFamily: Fonts.RubikSemiBold
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  }
})