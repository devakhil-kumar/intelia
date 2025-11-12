import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { logout } from "../../../app/features/registerSlice";
import { useDispatch } from "react-redux";


const HomeScreen = () => {

    const dispatch = useDispatch();
    const handleLogout = async () => {
        dispatch(logout());
    };

    return (
        <View>
            <Text>
                Driver
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF4D4F',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});