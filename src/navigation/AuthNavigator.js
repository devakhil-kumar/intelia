import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/authScreens/LoginScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';
import { Platform } from 'react-native';
import UploaddriverImage from '../screens/authScreens/UploaddriverImage';
import SelfieIntroScreen from '../screens/authScreens/SelfieIntroScreen';
import VerificationCompleted from '../screens/authScreens/VerificationCompleted';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ animation: Platform.OS === "android" ? 'default' : 'fade', animationDuration: 500 }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="OptionUpload"
        component={SelfieIntroScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="UploadScreen"
        component={UploaddriverImage}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="verificationScreen"
        component={VerificationCompleted}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};

export default AuthNavigator;