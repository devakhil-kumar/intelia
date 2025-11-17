import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImagePath from '../../../contexts/ImagePath';
import CustomBtn from '../../../components/CustomBtn';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const AiResume = () => {
    const theme = useTheme();
    const styles = style(theme);
    const navigation = useNavigation();

    return (
        <View style={styles.pageBg}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                    style={styles.imageStyle}
                    source={ImagePath.resumeIcon}
                />
                <View style={styles.descriptionStyle}>
                    <Text style={styles.mediumText}>Choose Resume Creation Method</Text>
                    <Text style={styles.smallText}>Pick how you want to create our resume. Don’t worry you can switch methods anytime.</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() =>navigation.navigate('AibuildResume')}
                style={styles.buttonStyle}>
                <Text style={[styles.mediumText, { color: 'royalblue' }]}>Build with AI</Text>
            </TouchableOpacity>
            <CustomBtn title={'Create Manually'} customStyles={styles.btnManually} />
        </View>
    )
}

const style = (theme) => StyleSheet.create({
    pageBg: {
        flex: 1,
        padding: 16,
        backgroundColor: theme.background
    },
    smallText: {
        fontSize: 14,
        color: 'black'
    },
    mediumText: { fontSize: 16, fontWeight: '700' },
    descriptionStyle: { width: '75%', marginStart: 20 },
    imageStyle: {
        width: 50,
        height: 50,
    },
    buttonStyle: { borderWidth: 1, borderColor: 'royalblue', borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 50 },
    btnManually: {
        marginTop: 20
    }
});

export default AiResume;