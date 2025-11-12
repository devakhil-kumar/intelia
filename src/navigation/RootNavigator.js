// src/navigation/RootNavigator.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator'
import { loadInitialState } from '../app/features/registerSlice';
import DriverNavigation from '../navigation/DriverNavigator/DriverNavigation';
import CarOwnerNavigation from '../navigation/CarOwnerNavigator/CarOwnerNavigation';

const RootNavigator = () => {
    const dispatch = useDispatch();
    const { token, userRole, isLoggedIn, mainloading } = useSelector((state) => state.register);

    useEffect(() => {
        dispatch(loadInitialState());
    }, [dispatch]);

    if (mainloading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    console.log(token, isLoggedIn, userRole, 'token')

    if (isLoggedIn && token) {
        if (userRole === "driver") {
            return <DriverNavigation />;
        } else if (userRole === "owner") {
            return <CarOwnerNavigation />;
        }
    }
    return <AuthNavigator />
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default RootNavigator;