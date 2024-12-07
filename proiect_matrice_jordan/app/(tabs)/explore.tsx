import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";

const FoodDashboard: React.FC = () => {
    const mealCategories = [
        {
            title: "Breakfast",
            recipes: [
                { name: "Pancakes", details: "Fluffy pancakes with maple syrup", background: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Breakfast" },
                { name: "Smoothie Bowl", details: "Berry smoothie with granola", background: "https://via.placeholder.com/150/FF6347/FFFFFF?text=Breakfast" },
                { name: "Oatmeal", details: "Oatmeal with fruits and nuts", background: "https://via.placeholder.com/150/FFA500/FFFFFF?text=Breakfast" },
            ],
        },
        {
            title: "Lunch",
            recipes: [
                { name: "Grilled Chicken Salad", details: "Chicken, greens, and vinaigrette", background: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Lunch" },
                { name: "Quinoa Bowl", details: "Quinoa with roasted vegetables", background: "https://via.placeholder.com/150/32CD32/FFFFFF?text=Lunch" },
                { name: "Pasta Primavera", details: "Pasta with seasonal vegetables", background: "https://via.placeholder.com/150/228B22/FFFFFF?text=Lunch" },
            ],
        },
        {
            title: "Dinner",
            recipes: [
                { name: "Steak and Potatoes", details: "Grilled steak with mashed potatoes", background: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Dinner" },
                { name: "Salmon and Asparagus", details: "Grilled salmon with asparagus", background: "https://via.placeholder.com/150/1E90FF/FFFFFF?text=Dinner" },
                { name: "Vegetable Stir-fry", details: "Mixed vegetables with tofu", background: "https://via.placeholder.com/150/4682B4/FFFFFF?text=Dinner" },
            ],
        },
        {
            title: "Snack",
            recipes: [
                { name: "Fruit Salad", details: "Fresh mixed fruits", background: "https://via.placeholder.com/150/FFFF00/FFFFFF?text=Snack" },
                { name: "Yogurt and Granola", details: "Greek yogurt with granola", background: "https://via.placeholder.com/150/FFD700/FFFFFF?text=Snack" },
                { name: "Nut Mix", details: "Assorted nuts and seeds", background: "https://via.placeholder.com/150/FFEC8B/FFFFFF?text=Snack" },
            ],
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Titlul aplicației */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Daily Meal Plan</Text>
            </View>

            {/* Categorii de mese */}
            <View style={styles.mealCategories}>
                {mealCategories.map((category, index) => (
                    <View key={index} style={styles.categorySection}>
                        <Text style={styles.categoryTitle}>{category.title}</Text>
                        {category.recipes.map((recipe, recipeIndex) => (
                            <ImageBackground
                                key={recipeIndex}
                                source={{ uri: recipe.background }}
                                style={styles.recipe}
                                imageStyle={styles.recipeBackground}
                            >
                                <View style={styles.recipeContent}>
                                    <Text style={styles.recipeName}>{recipe.name}</Text>
                                    <Text style={styles.recipeDetails}>{recipe.details}</Text>
                                </View>
                            </ImageBackground>
                        ))}
                    </View>
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
        backgroundColor: "#FFA500", // Culoare solidă portocalie
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: "center",
        borderRadius: 15, // Marginile rotunjite
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        textTransform: "capitalize",
    },
    mealCategories: {
        marginVertical: 20,
    },
    categorySection: {
        marginBottom: 30,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFA500",
        marginBottom: 10,
        textAlign: "center",
    },
    recipe: {
        height: 150,
        marginBottom: 15,
        justifyContent: "flex-end",
        borderRadius: 8,
        overflow: "hidden",
    },
    recipeBackground: {
        opacity: 0.7,
    },
    recipeContent: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFA500",
    },
    recipeDetails: {
        fontSize: 14,
        color: "#ffffff",
    },
});

export default FoodDashboard;