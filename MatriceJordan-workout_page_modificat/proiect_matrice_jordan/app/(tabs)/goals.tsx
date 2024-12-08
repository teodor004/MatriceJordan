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

// Define the type for the form data
interface FormData {
    age: string;
    weight: string;
    height: string;
    primaryGoal: string;
    workoutIntensity: number;
    dietaryPreferences: string[];
}

export default function GoalsScreen() {
    // Initialize formData with the type FormData
    const [formData, setFormData] = useState<FormData>({
        age: "",
        weight: "",
        height: "",
        primaryGoal: "Build muscle",
        workoutIntensity: 1,
        dietaryPreferences: [],
    });

    // Handle input changes for text fields
    const handleInputChange = <T extends keyof FormData>(key: T, value: FormData[T]) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Handle checkbox selection for dietary preferences
    const handleCheckboxChange = (value: string) => {
        setFormData((prev) => {
            const dietaryPreferences = [...prev.dietaryPreferences];
            if (dietaryPreferences.includes(value)) {
                return {
                    ...prev,
                    dietaryPreferences: dietaryPreferences.filter((item) => item !== value),
                };
            } else {
                return {
                    ...prev,
                    dietaryPreferences: [...dietaryPreferences, value],
                };
            }
        });
    };

    // Validate form to ensure all required fields are filled
    const validateForm = () => {
        const { age, weight, height, primaryGoal } = formData;
        if (!age || !weight || !height || !primaryGoal) {
            alert("Please fill out all fields.");
            return false;
        }
        return true;
    };

    // Function to process the form data
    const processFormData = (formData: FormData) => {
        const age = parseInt(formData.age);
        // Convert weight and height to floats
        const weight = parseFloat(formData.weight);
        const height = parseFloat(formData.height);

        // Convert primaryGoal (scop) to an integer based on the given criteria
        let scop = 0;  // Default value
        switch (formData.primaryGoal) {
            case "Build muscle":
                scop = 1;
                break;
            case "Lose weight":
                scop = 2;
                break;
            case "Improve endurance":
                scop = 3;
                break;
            case "Enhance flexibility":
                scop = 4;
                break;
            case "Maintain overall fitness":
                scop = 5;
                break;
            default:
                break;
        }

        // Convert dietaryPreferences to boolean values for "Vegetarian"
        const isVegetarian = formData.dietaryPreferences.includes("Vegetarian") ? 1 : 0;

        // Assuming "suplimente" refers to whether the user takes supplements, you can add a boolean for this
       // const suplimente = 0; // Placeholder value for now

        // Return the processed data ready to be sent to the backend as JSON
        const processedData = {
            age,
            weight,
            height,
            scop,
            isVegetarian,
            //suplimente,
        };

        console.log("Processed Data:", processedData);  // Log to check the output
        return processedData;
    };




    // Function to submit the form data
    const saveData = async () => {
        if (!validateForm()) return;

        // Process the form data
        const processedData = processFormData(formData);

        try {
            const response = await fetch("http://192.168.0.63:5000/api/goals/save/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(processedData),  // Send the processed data as JSON
            });

            if (response.ok) {
                alert("Data saved successfully!");
            } else {
                const errorText = await response.text();
                alert(`Error saving data: ${errorText || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
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

                {/* Primary Goal */}
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

                {/* Workout Intensity */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>Preferred workout intensity (1-5):</Text>
                    <Slider
                        value={formData.workoutIntensity}
                        onValueChange={(value) => handleInputChange("workoutIntensity", Math.round(value))}
                        minimumValue={1}
                        maximumValue={5}
                        step={1}
                        minimumTrackTintColor="#FFA500"
                        maximumTrackTintColor="#4b5563"
                        thumbTintColor="#FFA500"
                    />
                    <Text style={styles.sliderValue}>Intensity: {formData.workoutIntensity}</Text>
                </View>

                {/* Dietary Preferences */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>Dietary preferences:</Text>
                    {[
                        "Vegan",
                        "Vegetarian",
                        "Lactose intolerant",
                        "Allergic to nuts",
                        "Allergic to eggs",
                        "Gluten-free",
                    ].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => handleCheckboxChange(item)}
                            style={[
                                styles.checkbox,
                                formData.dietaryPreferences.includes(item) && styles.checkboxSelected,
                            ]}
                        >
                            <Text style={styles.checkboxText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Submit Button */}
                <Button title="Submit" onPress={saveData} color="#FFA500" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: "#000", padding: 20, alignItems: "center", paddingBottom: 100, paddingTop: 30 },
    card: { backgroundColor: "#1f2937", padding: 20, borderRadius: 10, width: "100%", maxWidth: 600 },
    heading: { fontSize: 24, color: "#FFA500", textAlign: "center", marginBottom: 20 },
    groupContainer: { marginBottom: 20 },
    label: { color: "#FFF", marginBottom: 10 },
    input: { backgroundColor: "#374151", padding: 10, color: "#FFF", borderRadius: 5 },
    select: { backgroundColor: "#374151", color: "#FFF" },
    checkbox: { padding: 10, backgroundColor: "#374151", borderRadius: 20, marginBottom: 10 },
    checkboxSelected: { backgroundColor: "#FFA500" },
    checkboxText: { color: "#FFF" },
    sliderValue: { color: "#FFF", textAlign: "center", marginTop: 10 },
});
