import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
} from 'react-native';

const FitnessAppScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header with App Name */}
            <View style={styles.header}>
                <Text style={styles.appName}>Fitness App</Text>
            </View>

            {/* Main Content with Background Image */}
            <ImageBackground
                source={{ uri: 'https://example.com/your-background-image.jpg' }} // Change the URL here
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={styles.mainContent}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Featured Workouts</Text>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Full Body Workout</Text>
                            <Text style={styles.cardDescription}>
                                A comprehensive workout targeting all major muscle groups.
                            </Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Start Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Cardio Blast</Text>
                            <Text style={styles.cardDescription}>
                                High-intensity cardio exercises to get your heart pumping.
                            </Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Start Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Strength Training</Text>
                            <Text style={styles.cardDescription}>
                                Build muscle and strength with these targeted exercises.
                            </Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Start Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText}>Workouts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText}>Nutrition</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#007AFF',
        padding: 16,
        alignItems: 'center',
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    backgroundImage: {
        flex: 1,
    },
    mainContent: {
        padding: 16,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#FFFFFF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#007AFF',
        paddingVertical: 12,
    },
    navButton: {
        alignItems: 'center',
    },
    navText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FitnessAppScreen;