import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Animated,
} from "react-native";

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
    ];

    // State pentru a urmări ce rețetă este mărită
    const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);
    const [animationValues, setAnimationValues] = useState(
        Array(mealCategories.reduce((acc, category) => acc + category.recipes.length, 0)).fill(0).map(() => new Animated.Value(1))
    );

    const toggleRecipeDetails = (index: number) => {
        const newExpandedRecipe = expandedRecipe === index ? null : index;
        setExpandedRecipe(newExpandedRecipe);

        // Animate the clicked recipe
        Animated.timing(animationValues[index], {
            toValue: newExpandedRecipe !== null ? 1.2 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Titlul aplicației */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Daily Meal Plan</Text>
            </View>

            {/* Categorii de mese */}
            {mealCategories.map((category, categoryIndex) => (
                <View key={categoryIndex} style={styles.categorySection}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    {category.recipes.map((recipe, recipeIndex) => {
                        const globalIndex = categoryIndex * 3 + recipeIndex; // Calculează indexul global pentru animație
                        return (
                            <TouchableOpacity
                                key={recipeIndex}
                                activeOpacity={0.7}
                                onPress={() => toggleRecipeDetails(globalIndex)}
                            >
                                <Animated.View
                                    style={[
                                        styles.recipe,
                                        {
                                            transform: [{ scale: animationValues[globalIndex] }],
                                        },
                                    ]}
                                >
                                    <ImageBackground
                                        source={{ uri: recipe.background }}
                                        style={styles.recipeBackground}
                                        imageStyle={styles.recipeBackgroundImage}
                                    >
                                        <View style={styles.recipeContent}>
                                            <Text style={styles.recipeName}>{recipe.name}</Text>
                                            {expandedRecipe === globalIndex && (
                                                <Text style={styles.recipeDetails}>{recipe.details}</Text>
                                            )}
                                        </View>
                                    </ImageBackground>
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
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
        borderRadius: 8,
        overflow: "hidden",
        justifyContent: "flex-end",
    },
    recipeBackground: {
        opacity: 0.8,
        flex: 1,
    },
    recipeBackgroundImage: {
        borderRadius: 8,
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