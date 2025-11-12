import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { moderateScale } from 'react-native-size-matters';
import Fonts from '../styles/GolbalFonts';
import { useTheme } from '../contexts/ThemeContext';

const CustomDropdown = ({
    label,
    data,
    placeholder = 'Select an option',
    value,
    onChange,
    searchable = false,
    error = null,
    disabled = false,
    customStyles = {}
}) => {
    const [isFocus, setIsFocus] = useState(false);
    const theme = useTheme();
    const styles = style(theme);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Dropdown
                style={[
                    styles.dropdown,
                    customStyles,
                    isFocus && styles.dropdownFocused,
                    error && styles.dropdownError,
                    disabled && styles.dropdownDisabled
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={searchable}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    onChange(item);
                    setIsFocus(false);
                }}
                disable={disabled}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.itemText}
                activeColor="#f5f5f5"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const style = (theme) => StyleSheet.create({
    container: {
        // marginBottom: 16,
    },
    label: {
        fontSize: moderateScale(16),
        color: theme.text,
        fontFamily: Fonts.RubikBold,
    },
    dropdown: {
        borderColor: theme.subText,
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 15,
        backgroundColor: theme.white,
        fontSize: moderateScale(14)
    },
    dropdownFocused: {
        borderColor:theme.primary,
    },
    dropdownError: {
        borderColor: '#f44336',
    },
    dropdownDisabled: {
        backgroundColor: '#f5f5f5',
    },
    placeholderStyle: {
        fontSize: moderateScale(14),
        color: '#999',
    },
    selectedTextStyle: {
        fontSize: 15,
        color: '#333',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    dropdownContainer: {
        borderRadius: 8,
        marginTop: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    itemText: {
        fontSize: 15,
        color: '#333',
        padding: 10,
    },
    errorText: {
        fontSize: 12,
        color: '#f44336',
        marginTop: 4,
    },
});

export default CustomDropdown;