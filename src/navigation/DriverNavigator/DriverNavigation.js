import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Platform, Settings, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { logout } from '../../app/features/registerSlice';
import Profile from '../../CarOwner/profileOwner/Profile';
import TalentHub from '../../CarOwner/talentHub/TalentHub';
import CustomHeader from '../../CarOwner/components/CustomHeader';
import ImagePath from '../../contexts/ImagePath';
import { useTheme } from '../../contexts/ThemeContext';
import NotificationsOwner from '../../CarOwner/notification/NotificationOwner';
import DriverBottomTabs from './DriverBottomTabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@react-native-vector-icons/feather';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const userName = "James Bond";
  const userEmail = "jamesbond@gmail.com";
  const userImage = { uri: "https://i.pravatar.cc/150?img=12" };

  const handleLogout = async () => {
    dispatch(logout());
  };

  //   return (
  //     <View style={styles.drawerWrapper}>
  //       <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
  //         <View style={styles.profileSection}>

  //         </View>
  //         <View style={styles.menuSection}>
  //          <View>

  //          </View>
  //           <DrawerItemList {...props} />
  //         </View>
  //       </DrawerContentScrollView>

  //       <View style={styles.logoutSection}>
  //         <TouchableOpacity
  //           style={styles.logoutButton}
  //           onPress={handleLogout}
  //           activeOpacity={0.7}
  //         >
  //           <Image
  //             source={ImagePath.logout}
  //             style={styles.logoutIcon}
  //           />
  //           <Text style={styles.logoutText}>Logout</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };
  return (
    <SafeAreaView style={[styles.drawerWrapper, { paddingTop: insets.top + 10 }]} edges={[0, 'bottom']}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 5 }}>

        <View style={styles.profileSection}>
          <Image
            source={userImage}
            style={styles.profileImage}
          />

          <View style={{ marginLeft: 12 }}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          {props.state.routes.map((route, index) => {
            const { drawerIcon, drawerLabel } =
              props.descriptors[route.key].options;

            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => props.navigation.navigate(route.name)}
                style={styles.menuItem}
              >
                <View style={styles.iconLeft}>
                  {drawerIcon && drawerIcon({ focused: false })}
                </View>
                <Text style={styles.menuLabel}>
                  {drawerLabel || route.name}
                </Text>
                <Feather name={'chevron-right'} size={20} color={'#0000'} />
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
};

const DriverDrawer = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: '#ccc',
        drawerLabelStyle: { fontSize: 15 },
      }}
    >
      {/* <Drawer.Screen
        name="DashBorad"
        component={DriverBottomTabs}
        options={{

          drawerIcon: ({ focused }) => (
            <Image
              source={focused ? ImagePath.home : ImagePath.home}
              style={{ width: 22, height: 22, resizeMode: 'contain' }}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="DashBorad"
        component={DriverBottomTabs}
        options={({ navigation, route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';
          // const hideHeader = routeName === 'AIResume';
          return {
            // header: hideHeader ? undefined : () => <CustomHeader navigation={navigation} />,
            // headerShown: hideHeader ? false : true,
            drawerIcon: ({ focused }) => (
              <Image
                source={focused ? ImagePath.home : ImagePath.home}
                style={{ width: 22, height: 22, resizeMode: 'contain' }}
              />
            ),
            drawerLabel: 'Dashboard',
          };
        }}
      />
      <Drawer.Screen
        name="NotificationsOwner"
        component={NotificationsOwner}
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
      {/* <Drawer.Screen
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
      /> */}
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




const DriverNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: Platform.OS === "android" ? 'default' : 'fade', animationDuration: 500 }}>
      <Stack.Screen
        name="DriverHome"
        component={DriverDrawer}
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
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    elevation: 8,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
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
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3565E3',
    justifyContent: 'center'
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
    color: '#3565E3',
    fontWeight: '500',
  },
  // profileSection: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingVertical: 20,
  //   paddingHorizontal: 16,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#E5E7EB",
  //   backgroundColor: "#fff",
  // },

  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  profileEmail: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  menuWrapper: {
    paddingTop: 10,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  iconLeft: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },

  menuLabel: {
    fontSize: 15,
    color: "#111",
    flex: 1,
  },

  // logoutButton: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },

});

export default DriverNavigation;