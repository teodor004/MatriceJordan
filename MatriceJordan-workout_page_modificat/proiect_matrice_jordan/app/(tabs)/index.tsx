import React, { useRef, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Animated,
    TouchableWithoutFeedback,
} from "react-native";

const FitnessDashboard: React.FC = () => {
    const muscleGroups = [
        {
            title: "Chest",
            exercises: "Push-ups, Bench Press",
            setsReps: "3 sets x 12 reps",
            additionalInfo: "Chest exercises build pectoral muscles for strength.",
            background: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Chest",
        },
        {
            title: "Back",
            exercises: "Pull-ups, Deadlifts",
            setsReps: "3 sets x 10 reps",
            additionalInfo: "Back exercises improve posture and core strength.",
            background: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Back",
        },
        {
            title: "Legs",
            exercises: "Squats, Lunges",
            setsReps: "4 sets x 15 reps",
            additionalInfo: "Leg exercises strengthen quads, hamstrings, and calves.",
            background: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Legs",
        },
        {
            title: "Arms",
            exercises: "Bicep Curls, Tricep Dips",
            setsReps: "3 sets x 12 reps",
            additionalInfo: "Arm exercises focus on biceps, triceps, and forearms.",
            background: "https://via.placeholder.com/150/FFFF00/FFFFFF?text=Arms",
        },
        {
            title: "Shoulders",
            exercises: "Shoulder Press, Lateral Raises",
            setsReps: "3 sets x 10 reps",
            additionalInfo: "Shoulder exercises improve upper body stability.",
            background: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Shoulders",
        },
        {
            title: "Abs",
            exercises: "Crunches, Planks",
            setsReps: "4 sets x 20 reps",
            additionalInfo: "Core exercises enhance overall strength and balance.",
            background: "https://via.placeholder.com/150/00FFFF/FFFFFF?text=Abs",
        },
    ];

    const progressBarWidth = useRef(new Animated.Value(0)).current;
    const progress = 2456 / 3000; // Progresul caloric în procente

    const heightAnimations = useRef(
        muscleGroups.map(() => new Animated.Value(100)) // Înălțimea inițială a casetelor
    ).current;
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

    useEffect(() => {
        Animated.timing(progressBarWidth, {
            toValue: progress * 100,
            duration: 1500,
            useNativeDriver: false,
        }).start();
    }, []);

    const handlePressIn = (index: number) => {
        setSelectedGroup(index);
        Animated.spring(heightAnimations[index], {
            toValue: 200, // Dublăm înălțimea
            useNativeDriver: false,
        }).start();
    };

    const handlePressOut = (index: number) => {
        setSelectedGroup(null);
        Animated.spring(heightAnimations[index], {
            toValue: 100, // Revenim la înălțimea inițială
            useNativeDriver: false,
        }).start();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header-ul aplicației */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Today's calories</Text>
                <View style={styles.progressBarContainer}>
                    <Animated.View
                        style={[
                            styles.progressBar,
                            {
                                width: progressBarWidth.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ["0%", "100%"],
                                }),
                            },
                        ]}
                    />
                </View>
                <Text style={styles.calorieText}>2456 / 3000 calories burned</Text>
            </View>

            {/* Statistici */}
            <View style={styles.stats}>
                <View style={styles.statItem}>
                    <Text style={styles.bold}>2 km</Text>
                    <Text style={styles.text}>Distance</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.bold}>52 min</Text>
                    <Text style={styles.text}>Time</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.bold}>2 km</Text>
                    <Text style={styles.text}>Distance</Text>
                </View>
            </View>

            {/* Vizite la sală și alte statistici */}
            <View style={styles.progress}>
                <View style={styles.progressItem}>
                    <Text style={styles.title}>Workouts this week</Text>
                    <Text style={styles.large}>3/5</Text>
                </View>
                <View style={styles.progressItem}>
                    <Text style={styles.title}>Distance per day</Text>
                    <Text style={styles.large}>5 km</Text>
                </View>
            </View>

            {/* Grupele musculare animate */}
            <View style={styles.muscleGroups}>
                {muscleGroups.map((group, index) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPressIn={() => handlePressIn(index)}
                        onPressOut={() => handlePressOut(index)}
                    >
                        <Animated.View
                            style={[
                                styles.group,
                                { height: heightAnimations[index] }, // Animația doar pe înălțime
                            ]}
                        >
                            <ImageBackground
                                source={{ uri: group.background }}
                                style={styles.groupBackground}
                                imageStyle={styles.groupImage}
                            >
                                <View style={styles.groupContent}>
                                    <Text style={styles.groupTitle}>{group.title}</Text>
                                    <Text style={styles.groupText}>{group.exercises}</Text>
                                    <Text style={styles.groupText}>{group.setsReps}</Text>
                                    {selectedGroup === index && (
                                        <Text style={styles.additionalInfo}>{group.additionalInfo}</Text>
                                    )}
                                </View>
                            </ImageBackground>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    contentContainer: {
        padding: 20,
    },
    header: {
        backgroundColor: "#FFA500",
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: "center",
        borderRadius: 15,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        textTransform: "capitalize",
    },
    progressBarContainer: {
        width: "100%",
        height: 10,
        backgroundColor: "#2a2a2a",
        borderRadius: 5,
        overflow: "hidden",
        marginTop: 10,
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#00FF00",
        borderRadius: 5,
    },
    calorieText: {
        fontSize: 14,
        color: "#ffffff",
        marginTop: 5,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    statItem: {
        alignItems: "center",
    },
    bold: {
        fontWeight: "bold",
        color: "#ffffff",
    },
    text: {
        color: "#ffffff",
    },
    progress: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    progressItem: {
        backgroundColor: "#1e1e1e",
        padding: 20,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFA500",
    },
    large: {
        fontSize: 24,
        color: "#ffffff",
    },
    muscleGroups: {
        marginVertical: 20,
    },
    group: {
        marginBottom: 20,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#333333",
    },
    groupBackground: {
        flex: 1,
    },
    groupImage: {
        opacity: 0.8,
    },
    groupContent: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        flex: 1,
        justifyContent: "center",
    },
    groupTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    groupText: {
        fontSize: 16,
        color: "#FFFFFF",
    },
    additionalInfo: {
        marginTop: 10,
        fontSize: 14,
        color: "#FFFFFF",
    },
});

export default FitnessDashboard;