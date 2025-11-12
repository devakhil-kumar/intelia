import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OwnerHome from '../../CarOwner/home/OwnerHome';
import DriverList from '../../CarOwner/drivers/DriverList';
import Resources from '../../CarOwner/resources/Resources';
import SearchOwner from '../../CarOwner/search/SearchOwner';
import ImagePath from '../../contexts/ImagePath';

const Tab = createBottomTabNavigator();

const CarOwnerBottomTabs = () => {
    const insets = useSafeAreaInsets();
    // Only apply bottom inset on Android, not on iOS
    const bottomInset = Platform.OS === 'android' ? insets.bottom : 10;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    height: 65 + bottomInset,
                    paddingBottom: bottomInset,
                    paddingTop: 8,
                },
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    color: '#fff',
                },
            }}
        >
            <Tab.Screen
                name="OwnerHome"
                component={OwnerHome}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? ImagePath.dashborad : ImagePath.inActiveDashborad}
                            style={{ width: 24, height: 24, resizeMode: 'contain' }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#000000' : '#ccc', fontSize: 12 }}>Dashboard</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchOwner}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? ImagePath.search : ImagePath.inActiveSearch}
                            style={{ width: 24, height: 24, resizeMode: 'contain' }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#000000' : '#ccc', fontSize: 12 }}>Search</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Driver"
                component={DriverList}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? ImagePath.drivers : ImagePath.inActiveDrivers}
                            style={{ width: 24, height: 24, resizeMode: 'contain' }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#000000' : '#ccc', fontSize: 12 }}>DriverList</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Resources"
                component={Resources}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? ImagePath.resources : ImagePath.inActiveResources}
                            style={{ width: 24, height: 24, resizeMode: 'contain' }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#000000' : '#ccc', fontSize: 12 }}>Resources</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default CarOwnerBottomTabs;
