import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";

/*
* Mesaj pt TEO aici sunt salvate raspunsurile //////////////////////////////////////////
*
 */
type FormData = {
    age: string;                     // TEO varsta
    weight: string;                  // TEO
    height: string;                  // TEO
    primaryGoal: string;             // TEO
    workoutIntensity: number;
    dietaryPreferences: string[];    // TEO
    supplements: string[];           // TEO
    commitmentDays: string;
    topMuscleGroups: string[];
    experience: string;
    activityLevel: string;
    trainingEnvironment: string;
    injuries: string;
    equipmentPreference: string;
    motivation: string;
    workoutDuration: string;
    gender: string;
    ageRange: string;
};

const FitnessGoalsSurvey = () => {
    const [formData, setFormData] = useState<FormData>({
        age: "",
        weight: "",
        height: "",
        primaryGoal: "Build muscle",
        workoutIntensity: 1,
        dietaryPreferences: [],
        supplements: [],
        commitmentDays: "",
        topMuscleGroups: [],
        experience: "",
        activityLevel: "",
        trainingEnvironment: "",
        injuries: "",
        equipmentPreference: "",
        motivation: "",
        workoutDuration: "",
        gender: "",
        ageRange: "",
    });

    const handleInputChange = <T extends keyof FormData>(key: T, value: FormData[T]) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleCheckboxChange = (key: keyof FormData, value: string) => {
        setFormData((prev) => {
            const currentValues = [...(prev[key] as string[])];
            if (currentValues.includes(value)) {
                return {
                    ...prev,
                    [key]: currentValues.filter((item) => item !== value),
                };
            } else {
                return {
                    ...prev,
                    [key]: [...currentValues, value],
                };
            }
        });
    };
    /*
    * Info pt TEO /////////////////////////////////////////////////////////////
    * saveData converteste datele din obiectul "formData" in un JSON-formatted string
    *  uite mai jos unde am pus comentariu
    */
    const saveData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // TEO asta converteste in JSON string
            });

            if (response.ok) {
                alert("Your fitness goals have been saved successfully!");
            } else {
                const result = await response.json();
                alert("Error saving data: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>

                {/* Linie goala pt spacing */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>

                    </Text>
                </View>

                <Text style={styles.heading}>Set Your Fitness Goals</Text>

                {/* Age */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>What is your age?</Text>
                    <TextInput
                        value={formData.age}
                        keyboardType="numeric"
                        onChangeText={(value) => handleInputChange("age", value)}
                        placeholder="Enter your age"
                        placeholderTextColor="#9ca3af"
                        style={styles.input}
                    />
                </View>

                {/* Weight */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>What is your weight? (kg or lbs)</Text>
                    <TextInput
                        value={formData.weight}
                        keyboardType="numeric"
                        onChangeText={(value) => handleInputChange("weight", value)}
                        placeholder="Enter your weight"
                        placeholderTextColor="#9ca3af"
                        style={styles.input}
                    />
                </View>

                {/* Height */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>What is your height? (cm or inches)</Text>
                    <TextInput
                        value={formData.height}
                        keyboardType="numeric"
                        onChangeText={(value) => handleInputChange("height", value)}
                        placeholder="Enter your height"
                        placeholderTextColor="#9ca3af"
                        style={styles.input}
                    />
                </View>

                {/* Primary Fitness Goal */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>What is your primary fitness goal?</Text>
                    <Picker
                        selectedValue={formData.primaryGoal}
                        onValueChange={(value) => handleInputChange("primaryGoal", value)}
                        style={styles.select}
                    >
                        <Picker.Item label="Build muscle" value="Build muscle" />
                        <Picker.Item label="Lose weight" value="Lose weight" />
                        <Picker.Item label="Improve endurance" value="Improve endurance" />
                        <Picker.Item label="Enhance flexibility" value="Enhance flexibility" />
                        <Picker.Item label="Maintain overall fitness" value="Maintain overall fitness" />
                    </Picker>
                </View>

                {/* Supplements */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>Do you currently take any supplements? (Select all that apply)</Text>
                    {["Protein", "Creatine", "BCAA", "Multivitamins", "Pre-workout", "None"].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => handleCheckboxChange("supplements", item)}
                            style={[
                                styles.checkbox,
                                formData.supplements.includes(item) && styles.checkboxSelected,
                            ]}
                        >
                            <Text style={styles.checkboxText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Commitment Days */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>How many days per week can you commit to training?</Text>
                    {["1 day", "2–3 days", "4–5 days", "6–7 days"].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => handleInputChange("commitmentDays", item)}
                            style={[
                                styles.checkbox,
                                formData.commitmentDays === item && styles.checkboxSelected,
                            ]}
                        >
                            <Text style={styles.checkboxText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>


                {/* Dietary Preferences */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>
                        What dietary preferences or restrictions should we consider? (Select all that apply)
                    </Text>
                    {[
                        "Vegan",
                        "Vegetarian",
                        "Lactose intolerant",
                        "Allergic to nuts",
                        "Allergic to eggs",
                        "Gluten-free",
                        "No restrictions",
                    ].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => handleCheckboxChange("dietaryPreferences", item)}
                            style={[
                                styles.checkbox,
                                formData.dietaryPreferences.includes(item) && styles.checkboxSelected,
                            ]}
                        >
                            <Text style={styles.checkboxText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Workout Intensity */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>What level of workout intensity do you prefer? (Rate from 1 to 5)</Text>
                    <Slider
                        minimumValue={1}
                        maximumValue={5}
                        step={1}
                        value={formData.workoutIntensity}
                        onValueChange={(value) => handleInputChange("workoutIntensity", value)}
                        style={{ marginVertical: 10 }}
                        minimumTrackTintColor="#FFA500"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="#FFA500"
                    />
                    <Text style={styles.sliderText}>Intensity: {formData.workoutIntensity}</Text>
                </View>

                {/* Top Muscle Groups */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>What are your top priority muscle groups? (Select all that apply)</Text>
                    {["Back", "Arms", "Chest", "Shoulders", "Legs", "Core (abs, obliques)"].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => handleCheckboxChange("topMuscleGroups", item)}
                            style={[
                                styles.checkbox,
                                formData.topMuscleGroups.includes(item) && styles.checkboxSelected,
                            ]}
                        >
                            <Text style={styles.checkboxText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Training Environment */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>What is your preferred training environment? (Choose one)</Text>
                    {["Gym", "Home workouts", "Outdoor workouts", "No preference"].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => handleInputChange("trainingEnvironment", item)}
                            style={[
                                styles.checkbox,
                                formData.trainingEnvironment === item && styles.checkboxSelected,
                            ]}
                        >
                            <Text style={styles.checkboxText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Injuries */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>
                        Do you have any existing injuries or physical limitations? (Optional)
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Specify if any"
                        placeholderTextColor="#9ca3af"
                        value={formData.injuries}
                        onChangeText={(value) => handleInputChange("injuries", value)}
                    />
                </View>

                {/* Save Button */}
                <View style={styles.groupContainer}>
                    <Button title="Submit" onPress={saveData} color="#FFA500" />
                </View>

                {/* Linie goala pt spacing */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>

                    </Text>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    card: {
        width: "100%",
        maxWidth: 600,
        backgroundColor: "#1f2937",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFA500",
        textAlign: "center",
        marginBottom: 20,
    },
    groupContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#374151",
        borderColor: "#4b5563",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: "#FFF",
    },
    select: {
        backgroundColor: "#374151",
        color: "#FFF",
        borderRadius: 5,
    },
    checkbox: {
        backgroundColor: "#374151",
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        alignItems: "center",
    },
    checkboxSelected: {
        backgroundColor: "#FFA500",
    },
    checkboxText: {
        color: "#FFF",
    },
    sliderText: {
        color: "#FFF",
        textAlign: "center",
    },
});

export default FitnessGoalsSurvey;