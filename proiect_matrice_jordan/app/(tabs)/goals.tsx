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
import { Picker } from "@react-native-picker/picker";

// Definește tipurile pentru datele din formular
type FormData = {
    primaryGoal: string;
    workoutIntensity: number;
    dietaryPreferences: string[];
};

const FitnessGoalsSurvey = () => {
    const [formData, setFormData] = useState<FormData>({
        primaryGoal: "Build muscle",
        workoutIntensity: 1,
        dietaryPreferences: [],
    });

    // Funcție pentru selectarea unei opțiuni
    const handleSelectChange = <T extends keyof FormData>(key: T, value: FormData[T]) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Funcție pentru checkbox-uri
    const handleCheckboxChange = (value: string) => {
        setFormData((prev) => {
            const dietaryPreferences = [...prev.dietaryPreferences];
            if (dietaryPreferences.includes(value)) {
                // Dacă valoarea este deja selectată, o eliminăm
                return {
                    ...prev,
                    dietaryPreferences: dietaryPreferences.filter((item) => item !== value),
                };
            } else {
                // Dacă nu, o adăugăm
                return {
                    ...prev,
                    dietaryPreferences: [...dietaryPreferences, value],
                };
            }
        });
    };

    // Funcție pentru salvarea datelor
    const saveData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Datele au fost salvate cu succes!");
            } else {
                const result = await response.json();
                alert("Eroare la salvarea datelor: " + result.message);
            }
        } catch (error) {
            console.error("Eroare:", error);
            alert("A apărut o eroare. Te rugăm să încerci din nou.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.heading}>Setează-ți obiectivele</Text>

                {/* Primary Fitness Goal */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>Ce obiectiv fitness ai?</Text>
                    <Picker
                        selectedValue={formData.primaryGoal}
                        onValueChange={(value) => handleSelectChange("primaryGoal", value)}
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
                    <Text style={styles.label}>Cât de intens preferi antrenamentele? (1 - 5)</Text>
                    <TextInput
                        value={String(formData.workoutIntensity)}
                        keyboardType="numeric"
                        onChangeText={(value) =>
                            handleSelectChange("workoutIntensity", Math.max(1, Math.min(5, Number(value))))
                        }
                        style={styles.input}
                    />
                </View>

                {/* Dietary Preferences */}
                <View style={styles.groupContainer}>
                    <Text style={styles.label}>Ai preferințe sau restricții alimentare?</Text>
                    {["Vegan", "Vegetarian", "Lactose intolerant", "Gluten-free"].map((item) => (
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

                {/* Save Button */}
                <View style={styles.groupContainer}>
                    <Button title="Salvează" onPress={saveData} color="#FFA500" />
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
});

export default FitnessGoalsSurvey;