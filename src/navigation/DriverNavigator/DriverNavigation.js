import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import HomeScreen from '../../screens/mainScreens/home/HomeScreen';

const Stack = createNativeStackNavigator();

const DriverNavigation= () => {
  return (
    <Stack.Navigator  screenOptions={{ animation: Platform.OS === "android" ? 'default' : 'fade', animationDuration: 500 }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}

      />
    </Stack.Navigator>
  );
};

export default DriverNavigation;