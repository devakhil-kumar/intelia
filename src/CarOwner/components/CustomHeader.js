import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import FontAwesome from "@react-native-vector-icons/fontawesome";
import Feather from "@react-native-vector-icons/feather";
import ImagePath from '../../contexts/ImagePath';
import { useNavigation, useRoute } from '@react-navigation/native';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const CustomHeader = () => {
    const [selectedActivities, setSelectedActivities] = useState(false);
    const navigation = useNavigation()
    const route = useRoute();
    const isNotificationScreen = route.name === 'NotificationsOwner';

    const handlePressBell = () => {
        if (isNotificationScreen) {
            navigation.goBack();
        } else {
            navigation.navigate('NotificationsOwner');
        }
    };

    const handlePressActivities = () => setSelectedActivities(!selectedActivities);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <FontAwesome name="bars" color={'black'} size={20} />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <Feather name="search" color={'lightgray'} size={16} />
                    <TextInput
                        placeholder="Search"
                        style={styles.searchInput}
                    />
                </View>
            </View>
            <View style={styles.rightIconsContainer}>
                <TouchableOpacity onPress={handlePressActivities}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={selectedActivities ? ImagePath.chat : ImagePath.chat}
                            style={styles.iconImageChat}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressBell}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={isNotificationScreen ? ImagePath.announcement : ImagePath.inActiveannouncement}
                            style={styles.iconImage}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        borderRadius: 20,
        width: windowWidth / 2,
        paddingHorizontal: 7,
        alignItems: 'center',
        marginLeft: 10,
    },
    searchInput: {
        fontSize: 12,
        height: 35,
    },
    rightIconsContainer: {
        flexDirection: "row",
    },
    iconContainer: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        backgroundColor: 'transparent',
    },
    selectedContainer: {
        backgroundColor: '#000',
        borderRadius: 16,
    },
    iconImage: {
        width: 30,
        height: 30
    },
    iconImageChat: {
        width: 30,
        height: 20
    }
});

export default CustomHeader;
