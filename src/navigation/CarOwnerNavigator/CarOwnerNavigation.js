import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Platform, Settings, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import CarOwnerBottomTabs from '../CarOwnerNavigator/CarOwnerBottomTabs';
import { logout } from '../../app/features/registerSlice';
import Profile from '../../CarOwner/profileOwner/Profile';
import TalentHub from '../../CarOwner/talentHub/TalentHub';
import SettingsOwner from '../../CarOwner/settings/Settings';
import CustomHeader from '../../CarOwner/components/CustomHeader';
import ImagePath from '../../contexts/ImagePath';
import { useTheme } from '../../contexts/ThemeContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <View style={styles.drawerWrapper}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
        <View style={styles.profileSection}>

        </View>
        <View style={styles.menuSection}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Image
            source={ImagePath.logout}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OwnerDrawer = () => {
  const  theme  = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        drawerActiveTintColor:theme.primary,
        drawerInactiveTintColor: '#ccc',
        drawerLabelStyle: { fontSize: 15 },
      }}
    >
      <Drawer.Screen
        name="DashBorad"
        component={CarOwnerBottomTabs}
        options={{
          drawerIcon: ({ focused }) => (
            <Image
              source={focused ? ImagePath.home : ImagePath.home}
              style={{ width: 22, height: 22, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => (
            <Image
              source={focused ? ImagePath.profile : ImagePath.inActiveProfile}
              style={{ width: 22, height: 22, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="TalentHub"
        component={TalentHub}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => (
            <Image
              source={focused ? ImagePath.talentHub : ImagePath.inActivetalentHub}
              style={{ width: 22, height: 22, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Settings"
        component={SettingsOwner}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => (
            <Image
              source={focused ? ImagePath. : ImagePath.eventLight}
              style={{ width: 22, height: 22, resizeMode: 'contain' }}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>

  );
};




const CarOwnerNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: Platform.OS === "android" ? 'default' : 'fade', animationDuration: 500 }}>
      <Stack.Screen
        name="OwnerHome"
        component={OwnerDrawer}
        options={{ headerShown: false }}

      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerWrapper: {
    flex: 1,
  },
  drawerContainer: {
    flexGrow: 1,
    paddingTop: 0,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 13,
    color: '#6B7280',
  },
  menuSection: {
    flex: 1,
    paddingTop: 8,
  },
  logoutSection: {
    // borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 40
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 12,
    // tintColor: '#EF4444',
  },
  logoutText: {
    fontSize: 15,
    // color: '#EF4444',
    fontWeight: '500',
  },
});

export default CarOwnerNavigation;