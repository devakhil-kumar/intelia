import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import CustomInput from '../../../components/CustomInput';
import Fonts from '../../../styles/GolbalFonts';

const OwnerFields = ({ formData, setFormData, errors, theme, setErrors, isSubmitted, validateField }) => {
  const style = styles(theme);

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

      <Text style={style.inputHeader}>Company Name</Text>
      <CustomInput
        placeholder="enter your company name"
        value={formData.companyName}
        onChangeText={(text) => handleChange('companyName', text)}
        style={[{ marginTop: 8 }, errors.companyName && { borderColor: theme.validationColor, borderWidth: 1 }]}
      />
      {errors.companyName && <Text style={style.errorText}>{errors.companyName}</Text>}

      <Text style={style.inputHeader}>What Corresponded me</Text>
      <CustomInput
        placeholder="enter your reason"
        value={formData.reason}
        onChangeText={(text) => handleChange('reason', text)}
        style={[{ marginTop: 8 }, errors.reason && { borderColor: theme.validationColor, borderWidth: 1 }]}
      />
      {errors.reason && <Text style={style.errorText}>{errors.reason}</Text>}

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

      <Text style={style.inputHeader}>Confirm Password</Text>
      <CustomInput
        placeholder="enter your password again"
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
        secureTextEntry
        style={[{ marginTop: 8 }, errors.confirmPassword && { borderColor: theme.validationColor, borderWidth: 1 }]}
      />
      {errors.confirmPassword && <Text style={style.errorText}>{errors.confirmPassword}</Text>}

    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  secandBox: { marginTop: 15 },
  inputHeader: { fontSize: moderateScale(16), color: theme.text, fontFamily: Fonts.RubikBold, marginTop: 20 },
  errorText: { fontSize: moderateScale(12), color: theme.validationColor, fontFamily: Fonts.RubikRegular, marginTop: 3, marginLeft: 4 }
});

export default OwnerFields;
