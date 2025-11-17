import React from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import HomeScreen from '../../screens/mainScreens/home/HomeScreen';
import AiResume from '../../screens/mainScreens/aiResume/AiResume';
import AibuildResume from '../../screens/mainScreens/aiResume/components/AibuildResume';
import Jobs from '../../screens/mainScreens/jobs/Jobs';
import SettingsDriver from '../../screens/mainScreens/settings/SettingsDriver';
import ImagePath from '../../contexts/ImagePath';
import { useTheme } from '../../contexts/ThemeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


 export const AIResumeNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                        opacity: progress,
                    },
                }),
            }}
        >
            <Stack.Screen
                name="AiResume"
                component={ AiResume }
            />
            <Stack.Screen
                name="AibuildResume"
                component={AibuildResume}
            />
            {/* <Stack.Screen
                name="ResumePreview"
                component={ResumePreview}
            />
            <Stack.Screen
                name="ResumeEdit"
                component={ResumeEdit}
            /> */}
        </Stack.Navigator>
    );
};




const CustomTabBar = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();
    const [activeIndex, setActiveIndex] = React.useState(0);
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const theme = useTheme();
    const styles = style(theme);

    React.useEffect(() => {
        Animated.spring(animatedValue, {
            toValue: state.index,
            useNativeDriver: true,
            friction: 8,
            tension: 100
        }).start();
        setActiveIndex(state.index);
    }, [state.index]);

    const barWidth = SCREEN_WIDTH - 20; // 16px padding on each side
    const tabWidth = barWidth / state.routes.length;

    const circleSize = 50;
    const circleRadius = 35;
    const curveDepth = 32; // Deeper curve
    const curveWidth = 50; // Wider curve

    const translateX = animatedValue.interpolate({
        inputRange: state.routes.map((_, i) => i),
        outputRange: state.routes.map((_, i) => i * tabWidth)
    });

    const getIconForRoute = (routeName, focused) => {
        const iconMap = {
            'DriverHome': focused ? ImagePath.dashboradHome : ImagePath.activeDashHome,
            'AIResume': focused ? ImagePath.activeAIresume : ImagePath.AIresume,
            'Jobs': focused ? ImagePath.activeJobs : ImagePath.jobs,
            'SettingsDriver': focused ? ImagePath.activeSetting : ImagePath.activeSetting,
        };
        return iconMap[routeName];
    };

    const getLabelForRoute = (routeName) => {
        const labelMap = {
            'DriverHome': 'Dashboard',
            'AIResume': 'AI Resume',
            'Jobs': 'Jobs',
            'SettingsDriver': 'Settings',
        };
        return labelMap[routeName];
    };

    const curveCenter = tabWidth * activeIndex + tabWidth / 2;
    const curveStart = curveCenter - curveWidth;
    const curveEnd = curveCenter + curveWidth;
    const bottomInset = Platform.OS === 'android' ? insets.bottom : 10;
    const borderRadius = 30;

    return (
        <View style={[styles.tabBarContainer, { bottom: 16 + bottomInset }]}>
            <View style={[styles.tabBar, { width: barWidth }]}>
                <Animated.View
                    style={[
                        styles.floatingCircle,
                        {
                            transform: [
                                { translateX: Animated.add(translateX, (tabWidth - circleSize) / 2) }
                            ]
                        }
                    ]}
                >
                    <View style={styles.innerCircle}>
                        <Image
                            source={getIconForRoute(state.routes[activeIndex].name, true)}
                            style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#ffffff' }}
                        />
                    </View>
                </Animated.View>
                <View style={styles.barBackground}>
                    <Svg height="80" width={barWidth} style={styles.svg}>
                        <Path
                            d={`
                                M 0 ${borderRadius - 30} 
                                Q 0 0 ${borderRadius} 0
                                L ${curveStart} 0 
                                Q ${curveStart + 10} 0 ${curveStart + 18} 8 
                                Q ${curveCenter - 20} ${curveDepth} ${curveCenter} ${curveDepth} 
                                Q ${curveCenter + 20} ${curveDepth} ${curveEnd - 17} 8 
                                Q ${curveEnd - 10} 0 ${curveEnd} 0 
                                L ${barWidth - borderRadius} 0
                                Q ${barWidth} 0 ${barWidth} ${borderRadius - 30} 
                                L ${barWidth} ${70 - borderRadius} 
                                Q ${barWidth} 70 ${barWidth - borderRadius} 70 
                                L ${borderRadius} 70 
                                Q 0 70 0 ${70 - borderRadius} 
                                Z
                            `}
                            fill="#1E3A5F"
                        />
                    </Svg>
                </View>
                <View style={styles.tabButtons}>
                    {state.routes.map((route, index) => {
                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };
                        return (
                            <TouchableOpacity
                                key={index}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                onPress={onPress}
                                style={styles.tabButton}
                                activeOpacity={0.7}
                            >
                                <View style={styles.tabContent}>
                                    {!isFocused ? (
                                        <>
                                            <Image
                                                source={getIconForRoute(route.name, false)}
                                                style={styles.inactiveIcon}
                                            />
                                            <Text style={styles.inactiveLabel}>{getLabelForRoute(route.name)}</Text>
                                        </>
                                    ) : (
                                        <Text style={styles.activeLabel}>{getLabelForRoute(route.name)}</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

const DriverBottomTabs = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="DriverHome" component={HomeScreen} />
            <Tab.Screen name="AIResume" component={AIResumeNavigator} />
            <Tab.Screen name="Jobs" component={Jobs} />
            <Tab.Screen name="SettingsDriver" component={SettingsDriver} />
        </Tab.Navigator>
    );
};

const style = (theme) => StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        left: 16,
        right: 16,
        height: 45,
        alignItems: 'center',
    },
    tabBar: {
        height: 70,
        position: 'relative',
    },
    floatingCircle: {
        position: 'absolute',
        top: -35,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    innerCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    barBackground: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
    },
    svg: {
        position: 'absolute',
        bottom: 0,
    },
    tabButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 5,
        justifyContent: 'center',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    tabContent: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
    },
    inactiveIcon: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
        opacity: 0.6,
    },
    activeLabel: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '600',
        // marginTop: 38,
    },
    inactiveLabel: {
        color: '#8BA3C7',
        fontSize: 10,
        fontWeight: '500',
        // marginTop: 4,
    },
});

export default DriverBottomTabs;