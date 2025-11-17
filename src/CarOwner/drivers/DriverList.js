import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, FlatList } from 'react-native';
import { useTheme } from "../../contexts/ThemeContext";
import { moderateScale } from "react-native-size-matters";
import Fonts from "../../styles/GolbalFonts";
import ImagePath from "../../contexts/ImagePath";
import CustomBtn from "../../components/CustomBtn";
import DriverListCard from './components/DriverListcard';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const DATA = [
    {
        id: '1',
        name: 'Jordana Niclany',
        phone: '+1234567890',
        email: 'jordan@mail.com',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    },
    {
        id: '2',
        name: 'Michael Johnson',
        phone: '+9876543210',
        email: 'michael@mail.com',
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    },
    {
        id: '3',
        name: 'Michael Johnson',
        phone: '+9876543210',
        email: 'michael@mail.com',
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    },
];


const DriverList = () => {

    const theme = useTheme();
    const styles = style(theme);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 16, flex: 1, paddingTop: 10 }}>
                <Text style={styles.firstHeader}>Contact</Text>
                <View style={styles.gridContainer}>
                    <View style={styles.card}>
                        <Image source={ImagePath.driverIcons} style={styles.icon} />
                        <View >
                            <Text style={styles.cardValue}>932</Text>
                            <Text style={styles.cardTitle}>Total Driver</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Image source={ImagePath.incidents} style={styles.icon} />
                        <View >
                            <Text style={styles.cardValue}>0</Text>
                            <Text style={styles.cardTitle}>Low Risk</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Image source={ImagePath.inquiries} style={styles.icon} />
                        <View >
                            <Text style={styles.cardValue}>1,032</Text>
                            <Text style={styles.cardTitle}>Risk Scored</Text>

                        </View>
                    </View>

                    <View style={styles.card}>
                        <Image source={ImagePath.licenses} style={styles.icon} />
                        <View >
                            <Text style={styles.cardValue}>32K</Text>
                            <Text style={styles.cardTitle}>Assets</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center",marginBottom:10 }}>
                        <Text style={styles.firstHeader}>Driverlist</Text>
                        <CustomBtn title={'Add driver'} icon={'plus'} customStyles={styles.addBtn} />
                    </View>
                    <FlatList
                        data={DATA}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <DriverListCard item={item} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    />
                </View>
            </View>
        </View>
    )
}

export default DriverList;

const style = (theme) => StyleSheet.create({
    card: {
        width: (windowWidth - 48) / 2,
        backgroundColor: "#fff",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
        flexDirection: 'row'
    },
    icon: {
        width: 50,
        height: 50,
    },
    cardTitle: {
        fontSize: moderateScale(13),
        color: theme.subText,
        fontFamily: Fonts.InterRegular
    },
    cardValue: {
        fontSize: moderateScale(15),
        color: theme.primaryText,
        fontFamily: Fonts.InterSemiBold
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 5,
    },
    firstHeader: {
        fontFamily: Fonts.InterSemiBold,
        fontSize: moderateScale(16),
        color: theme.primaryText
    },
    addBtn: {
        width: '40%',
        paddingVertical: 10,
        borderRadius: 8
    }
})