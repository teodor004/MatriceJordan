import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";

const FitnessDashboard: React.FC = () => {
    const muscleGroups = [
        {
            title: "Chest",
            exercises: "Push-ups, Bench Press",
            setsReps: "3 sets x 12 reps",
            background: "https://example.com/chest.jpg",
        },
        {
            title: "Back",
            exercises: "Pull-ups, Deadlifts",
            setsReps: "3 sets x 10 reps",
            background: "https://example.com/back.jpg",
        },
        {
            title: "Legs",
            exercises: "Squats, Lunges",
            setsReps: "4 sets x 15 reps",
            background: "https://example.com/legs.jpg",
        },
        {
            title: "Arms",
            exercises: "Bicep Curls, Tricep Dips",
            setsReps: "3 sets x 12 reps",
            background: "https://example.com/arms.jpg",
        },
        {
            title: "Shoulders",
            exercises: "Shoulder Press, Lateral Raises",
            setsReps: "3 sets x 10 reps",
            background: "https://example.com/shoulders.jpg",
        },
        {
            title: "Abs",
            exercises: "Crunches, Planks",
            setsReps: "4 sets x 20 reps",
            background: "https://example.com/abs.jpg",
        },
    ];

    const totalCalories = 3000;
    const burnedCalories = 2456;
    const progress = burnedCalories / totalCalories;

    const getBarColor = () => {
        if (progress < 0.5) return "#FF4500"; // Roșu
        if (progress < 0.8) return "#FFA500"; // Portocaliu
        return "#00FF7F"; // Verde
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header-ul aplicației */}
            <View style={styles.progressBarBox}>
                <Text style={styles.headerText}>Muschii lui MAXIM</Text>
                {/* Bara de progres pentru calorii */}
                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBar,
                            { width: '${progress * 100}%', backgroundColor: getBarColor() },
                            ]}
                    />
                </View>
                <Text style={styles.calorieText}>
                    {burnedCalories} / {totalCalories} calories burned
                </Text>
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
                    <Text style={styles.title}>Gym visits</Text>
                    <Text style={styles.large}>3/5</Text>
                </View>
                <View style={styles.progressItem}>
                    <Text style={styles.title}>Distance per day</Text>
                    <Text style={styles.large}>5 km</Text>
                </View>
            </View>

            {/* Grupele musculare */}
            <View style={styles.muscleGroups}>
                {muscleGroups.map((group, index) => (
                    <ImageBackground
                        key={index}
                        source={{ uri: group.background }}
                        style={styles.group}
                        imageStyle={styles.groupBackground}
                    >
                        <View style={styles.groupContent}>
                            <Text style={styles.groupTitle}>{group.title}</Text>
                            <Text style={styles.groupText}>{group.exercises}</Text>
                            <Text style={styles.groupText}>{group.setsReps}</Text>
                        </View>
                    </ImageBackground>
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
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        textTransform: "uppercase",
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
    progressBarBox: {
        backgroundColor: "#1e1e1e",
        padding: 20,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFA500", // Portocaliu pentru titluri
    },
    large: {
        fontSize: 24,
        color: "#ffffff",
    },
    muscleGroups: {
        marginVertical: 20,
    },
    group: {
        height: 200,
        marginBottom: 20,
        justifyContent: "flex-end",
        borderRadius: 8,
        overflow: "hidden",
    },
    groupBackground: {
        opacity: 0.7,
    },
    groupContent: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
    },
    groupTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFA500", // Portocaliu pentru titluri de grupuri musculare
    },
    groupText: {
        fontSize: 16,
        color: "#ffffff",
    },
});

export default FitnessDashboard;