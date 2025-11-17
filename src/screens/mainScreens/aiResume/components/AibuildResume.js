import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated,
    Dimensions,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@react-native-vector-icons/feather';
import ImagePath from '../../../../contexts/ImagePath';

const { width } = Dimensions.get('window');

const AibuildResume = () => {
    const [isListening, setIsListening] = useState(false);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isListening) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.2,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [isListening]);

    return (
        <SafeAreaView style={styles.container} edges={[0, 'bottom']}>
            <ScrollView>
                <View style={styles.headerCard}>
                    <Text style={styles.cardTitle}>Create Resume</Text>
                    <Text style={styles.cardSubtitle}>
                        Create your resume by simply talking to Mia, your smart assistant.
                    </Text>
                    <TouchableOpacity style={styles.manualButton}>
                        <Text style={styles.manualButtonText}>Create Manually</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mainContent}>
                    <View style={styles.titleSection}>
                        <Text style={styles.mainTitle}>Mia - Assistant Vocal</Text>
                        <Text style={styles.subtitle}>
                            Specialized AI Assistant for Ivory Coast
                        </Text>
                    </View>

                    <View style={styles.waveContainer}>
                        <Image
                           source={ImagePath.lineIcon}
                            style={styles.waveImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Status Text */}
                    <Text style={styles.statusText}>Active Leader - Voice Ready</Text>

                    {/* Listening Status */}
                    <Text style={styles.listeningText}>
                        {isListening ? 'Recording...' : 'Listening...'}
                    </Text>

                    {/* Microphone Button */}
                    <TouchableOpacity
                        style={styles.micButtonContainer}
                        onPress={() => setIsListening(!isListening)}
                        activeOpacity={0.8}
                    >
                        <Animated.View
                            style={[
                                styles.micButton,
                                {
                                    backgroundColor: isListening ? '#EF4444' : '#FBBF24',
                                    transform: [{ scale: pulseAnim }],
                                },
                            ]}
                        >
                            <Feather name="mic" size={32} color="#FFFFFF" />
                        </Animated.View>
                    </TouchableOpacity>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => console.log('Submit pressed')}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>

                {/* Bottom Instruction */}
                <View style={styles.bottomInstruction}>
                    <Text style={styles.instructionText}>
                        Tap the microphone to start speaking
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
export default AibuildResume;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'#FFFFF',
        paddingBottom:80
    },
    headerCard: {
        backgroundColor: '#FFFFFF',
        margin: 20,
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        marginBottom: 16,
    },
    manualButton: {
        backgroundColor: '#2563EB',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        width:'50%'
    },
    manualButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    waveContainer: {
        width: width - 80,
        height: 120,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    waveImage: {
        width: '100%',
        height: '100%',
    },
    statusText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
        marginBottom: 12,
    },
    listeningText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 30,
    },
    micButtonContainer: {
        marginBottom: 30,
    },
    micButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    submitButton: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 60,
        paddingVertical: 14,
        borderRadius: 12,
        shadowColor: '#2563EB',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomInstruction: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    instructionText: {
        fontSize: 12,
        color: '#9CA3AF',
    },
});