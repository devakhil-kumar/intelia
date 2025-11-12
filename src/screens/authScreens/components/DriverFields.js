import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import CustomInput from '../../../components/CustomInput';
import Fonts from '../../../styles/GolbalFonts';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DriverFields = ({ formData, setFormData, errors, theme, isSubmitted, setErrors, validateField }) => {
    const style = styles(theme);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });

        if (isSubmitted) {
            const errorMsg = validateField(field, value);
            setErrors(prev => ({
                ...prev,
                [field]: errorMsg || undefined
            }));
        }
    };

    const handleConfirm = (date) => {
        const formattedDate = formatDate(date);
        handleChange('validUntil', formattedDate);
        setDatePickerVisible(false);
    };

    const handleCancel = () => {
        setDatePickerVisible(false);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const parseDate = (dateString) => {
        if (!dateString) return new Date();
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };

    return (
        <View style={style.secandBox}>

            <Text style={[style.inputHeader, { marginTop: 0 }]}>First Name</Text>
            <CustomInput
                placeholder="enter your first name"
                value={formData.firstName}
                onChangeText={(text) => handleChange('firstName', text)}
                style={[{ marginTop: 8 }, errors.firstName && { borderColor: theme.validationColor, borderWidth: 1 }]}
            />
            {errors.firstName && <Text style={style.errorText}>{errors.firstName}</Text>}

            <Text style={style.inputHeader}>Surname</Text>
            <CustomInput
                placeholder="enter your surname"
                value={formData.surname}
                onChangeText={(text) => handleChange('surname', text)}
                style={[{ marginTop: 8 }, errors.surname && { borderColor: theme.validationColor, borderWidth: 1 }]}
            />
            {errors.surname && <Text style={style.errorText}>{errors.surname}</Text>}

            <Text style={style.inputHeader}>License Number</Text>
            <CustomInput
                placeholder="enter your license number"
                value={formData.licenseNumber}
                onChangeText={(text) => handleChange('licenseNumber', text.toUpperCase())}
                autoCapitalize="characters"
                style={[{ marginTop: 8 }, errors.licenseNumber && { borderColor: theme.validationColor, borderWidth: 1 }]}
            />
            {errors.licenseNumber && <Text style={style.errorText}>{errors.licenseNumber}</Text>}

            <Text style={style.inputHeader}>Email</Text>
            <CustomInput
                placeholder="enter your email"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text.toLowerCase())}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[{ marginTop: 8 }, errors.email && { borderColor: theme.validationColor, borderWidth: 1 }]}
            />
            {errors.email && <Text style={style.errorText}>{errors.email}</Text>}

            <Text style={style.inputHeader}>Password</Text>
            <CustomInput
                placeholder="enter your password"
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry
                style={[{ marginTop: 8 }, errors.password && { borderColor: theme.validationColor, borderWidth: 1 }]}
            />
            {errors.password && <Text style={style.errorText}>{errors.password}</Text>}

            <Text style={style.inputHeader}>Phone Number</Text>
            <CustomInput
                placeholder="enter your phone number"
                value={formData.phoneNumber}
                onChangeText={(text) => handleChange('phoneNumber', text)}
                keyboardType="phone-pad"
                maxLength={10}
                style={[{ marginTop: 8 }, errors.phoneNumber && { borderColor: theme.validationColor, borderWidth: 1 }]}
            />
            {errors.phoneNumber && <Text style={style.errorText}>{errors.phoneNumber}</Text>}

            <Text style={style.inputHeader}>Municipality</Text>
            <CustomInput
                placeholder="enter your municipality"
                value={formData.municipality}
                onChangeText={(text) => handleChange('municipality', text)}
                style={[{ marginTop: 8 }, errors.municipality && { borderColor: theme.validationColor, borderWidth: 1 }]}
            />
            {errors.municipality && <Text style={style.errorText}>{errors.municipality}</Text>}

            <Text style={style.inputHeader}>Vehicle Registration</Text>
            <CustomInput
                placeholder="enter vehicle registration"
                value={formData.vehicleRegistration}
                onChangeText={(text) => handleChange('vehicleRegistration', text.toUpperCase())}
                autoCapitalize="characters"
                style={[{ marginTop: 8 }, errors.vehicleRegistration && { borderColor: theme.validationColor, borderWidth: 1 }]}
            />
            {errors.vehicleRegistration && <Text style={style.errorText}>{errors.vehicleRegistration}</Text>}

            <Text style={style.inputHeader}>Valid Until</Text>
            <TouchableOpacity
                onPress={() => setDatePickerVisible(true)}
                activeOpacity={0.7}
            >
                <View pointerEvents="none">
                    <CustomInput
                        placeholder="DD/MM/YYYY"
                        value={formData.validUntil}
                        editable={false}
                        style={[
                            { marginTop: 8 },
                            errors.validUntil && { borderColor: theme.validationColor, borderWidth: 1 }
                        ]}
                    />
                </View>
            </TouchableOpacity>
            {errors.validUntil && <Text style={style.errorText}>{errors.validUntil}</Text>}

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                minimumDate={new Date()}
                date={formData.validUntil ? parseDate(formData.validUntil) : new Date()}
            />

        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    secandBox: { marginTop: 15 },
    inputHeader: { fontSize: moderateScale(16), color: theme.text, fontFamily: Fonts.RubikBold, marginTop: 20 },
    errorText: { fontSize: moderateScale(12), color: theme.validationColor, fontFamily: Fonts.RubikRegular, marginTop: 4, marginLeft: 4 }
});

export default DriverFields;
