import React, { useState } from "react";
import { ActivityIndicator, Image, ImageBackground, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import Fonts from '../../styles/GolbalFonts';
import ImagePath from '../../contexts/ImagePath';
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import { validateEmail, validatePassword } from '../../units/validations';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../app/features/messageSlice';
import { loginUser } from "../../app/features/registerSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();
  const style = styles(theme);
  const dispatch = useDispatch();

  const onHandleSignup = () => navigation.navigate('Signup');

  const validateField = (field, value) => {
    switch (field) {
      case 'email': return validateEmail(value);
      case 'password': return validatePassword(value);
      default: return '';
    }
  };

  const handleChange = (field, value) => {
    if (field === 'email') setEmail(value.toLowerCase());
    else if (field === 'password') setPassword(value);
    if (isSubmitted) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const onLogin = async () => {
    setIsSubmitted(true);
    setIsLoading(true);
    const validationErrors = {
      email: validateField('email', email),
      password: validateField('password', password),
    };
    Object.keys(validationErrors).forEach(key => {
      if (!validationErrors[key]) delete validationErrors[key];
    });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      dispatch(showMessage({ type: 'error', text: 'Please fix the errors in the form' }));
      setIsLoading(false);
      return;
    }
    try {
      const userData = { email, password };
      const result = await dispatch(loginUser(userData)).unwrap();
      console.log(result, 'result')
      dispatch(showMessage({
        type: 'success',
        text: result?.message || 'Login successful'
      }));
    } catch (error) {
      dispatch(showMessage({
        type: 'error',
        text: error || 'Login failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleLogin = () => {
    console.log('Google login');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={style.main}>
        <ImageBackground source={ImagePath.backgroundImage} style={style.main}>
          <View style={style.innerMain}>
            <View>
              <View style={style.frontBox}>
                <Text style={style.headerText}>Hey, {"\n"}Welcome Back</Text>
                <Text style={style.subHeaderText}>Please login your account</Text>
              </View>

              <View style={style.secandBox}>
                <Text style={style.inputHeader}>Email</Text>
                <CustomInput
                  placeholder="admin@gmail.com"
                  value={email}
                  onChangeText={(text) => handleChange('email', text)}
                  style={[{ marginTop: 10 }, errors.email && { borderColor: theme.validationColor, borderWidth: 1 }]}
                />
                {errors.email && <Text style={style.errorText}>{errors.email}</Text>}

                <Text style={[style.inputHeader, { marginTop: 20 }]}>Password</Text>
                <CustomInput
                  placeholder="enter your password"
                  value={password}
                  onChangeText={(text) => handleChange('password', text)}
                  secureTextEntry
                  style={[{ marginTop: 10 }, errors.password && { borderColor: theme.validationColor, borderWidth: 1 }]}
                />
                {errors.password && <Text style={style.errorText}>{errors.password}</Text>}

                <Text style={style.forgetText}>Forget Password</Text>
              </View>
            </View>

            <View>
              <CustomBtn title="Login" variant="primary" onPress={onLogin} />

              <View style={style.dividerContainer}>
                <View style={style.divider} />
                <Text style={style.dividerText}>OR</Text>
                <View style={style.divider} />
              </View>

              <CustomBtn
                title="Continue with Google"
                variant="outline"
                icon={<Image source={ImagePath.googleImage} style={style.googleIcon} />}
                onPress={onGoogleLogin}
              />

              <View style={style.signupContainer}>
                <Text style={style.signupText}>Didn't have an Account? </Text>
                <TouchableOpacity onPress={onHandleSignup}>
                  <Text style={style.signupLink}>Sign-up</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ImageBackground>
        {isLoading && (
          <View style={style.loaderOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = (theme) => StyleSheet.create({
  main: { flex: 1 },
  innerMain: { flex: 1, padding: 18, justifyContent:"space-around" },
  headerText: { fontSize: moderateScale(24), color: theme.text, fontFamily: Fonts.RubikBold },
  subHeaderText: { fontSize: moderateScale(12), color: theme.subText, fontFamily: Fonts.RubikMedium },
  frontBox: { marginTop: 10 },
  secandBox: { marginTop: 25 },
  inputHeader: { fontSize: moderateScale(16), color: theme.text, fontFamily: Fonts.RubikBold },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 15, justifyContent: "center" },
  divider: { flex: 0.1, height: 1, backgroundColor: theme.border },
  dividerText: { marginHorizontal: 16, color: theme.subText, fontSize: moderateScale(14) },
  googleIcon: { width: 20, height: 20 },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 },
  signupText: { color: theme.subText, fontSize: moderateScale(12), fontFamily: Fonts.RubikRegular },
  signupLink: { color: theme.primary, fontSize: moderateScale(12), fontFamily: Fonts.RubikSemiBold },
  forgetText: { alignSelf: 'flex-end', marginTop: 13, color: theme.primary, fontSize: moderateScale(14), fontFamily: Fonts.RubikMedium },
  errorText: { fontSize: moderateScale(12), color: theme.validationColor, fontFamily: Fonts.RubikRegular, marginTop: 3, marginLeft: 4 },
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
});
