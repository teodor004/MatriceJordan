import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Animated,
    Button,
} from "react-native";

const FoodDashboard: React.FC = () => {
    const [vegetarian, setVegetarian] = useState(false);
    const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

    const animationValues = Array(9) // 9 reИ›ete Г®n total
        .fill(0)
        .map(() => new Animated.Value(1));

    const mealCategories = [
        {
            title: "Breakfast",
            recipes: [
                {
                    name: "Pancakes",
                    details: "Fluffy pancakes with maple syrup",
                    vegetarian: true,
                    background: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FRecipes%2F2024-06-seo-pancakes%2Fseo-pancakes-232",
                },
                {
                    name: "Smoothie Bowl",
                    details: "Berry smoothie with granola",
                    vegetarian: true,
                    background: "https://images.immediate.co.uk/production/volatile/sites/30/2022/12/Smoothie-bowl-16df176.jpg",
                },
                {
                    name: "Oatmeal",
                    details: "Oatmeal with fruits and nuts",
                    vegetarian: true,
                    background: "https://joybauer.com/wp-content/uploads/2017/12/Oatmeal-with-berries2.jpg",
                },
            ],
        },
        {
            title: "Lunch",
            recipes: [
                {
                    name: "Grilled Chicken Salad",
                    details: "Chicken, greens, and vinaigrette",
                    vegetarian: false,
                    background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtBNG4k8JOq92tFO1MuDtIDP37RFB3y0g4Vw&s",
                },
                {
                    name: "Quinoa Bowl",
                    details: "Quinoa with roasted vegetables",
                    vegetarian: true,
                    background: "https://dudethatcookz.com/wp-content/uploads/2020/11/quinoa_roasted_veggies_5-scaled.jpg",
                },
                {
                    name: "Pasta Primavera",
                    details: "Pasta with seasonal vegetables",
                    vegetarian: true,
                    background: "https://images.themodernproper.com/billowy-turkey/production/posts/PastaPrimavera_10.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1719193287&s=0104e0b241aea73e5709db128503d749",
                },
            ],
        },
        {
            title: "Dinner",
            recipes: [
                {
                    name: "Steak and Potatoes",
                    details: "Grilled steak with mashed potatoes",
                    vegetarian: false,
                    background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRbQCkTsfr9-zwdZIdpx2VGe3-5-JXBPexsQ&s",
                },
                {
                    name: "Salmon and Asparagus",
                    details: "Grilled salmon with asparagus",
                    vegetarian: false,
                    background: "https://cdn-uploads.mealime.com/uploads/recipe/thumbnail/307/presentation_0ed152c0-47ef-4536-81b4-02dc6f31f876.jpg",
                },
                {
                    name: "Vegetable Stir-fry",
                    details: "Mixed vegetables with tofu",
                    vegetarian: true,
                    background: "https://natashaskitchen.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry-2.jpg",
                },
            ],
        },
    ];

    const toggleRecipeDetails = (index: number) => {
        const isExpanded = expandedRecipe === index;
        setExpandedRecipe(isExpanded ? null : index);

        Animated.timing(animationValues[index], {
            toValue: isExpanded ? 1 : 2,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    // Filtrare mealCategories pe baza stДѓrii `vegetarian`
    const filteredCategories = vegetarian
        ? mealCategories.map((category) => ({
            ...category,
            recipes: category.recipes.filter((recipe) => recipe.vegetarian),
        }))
        : mealCategories;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Daily Meal Plan</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title={`Switch to ${vegetarian ? "All Meals" : "Vegetarian"}`}
                    onPress={() => setVegetarian(!vegetarian)}
                />
            </View>

            {filteredCategories.map((category, categoryIndex) => (
                <View key={categoryIndex} style={styles.categorySection}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    {category.recipes.map((recipe, recipeIndex) => {
                        const globalIndex = categoryIndex * 3 + recipeIndex;

                        return (
                            <TouchableOpacity
                                key={recipeIndex}
                                activeOpacity={0.8}
                                onPress={() => toggleRecipeDetails(globalIndex)}
                            >
                                <Animated.View
                                    style={[
                                        styles.recipe,
                                        {
                                            height: animationValues[globalIndex].interpolate({
                                                inputRange: [1, 2],
                                                outputRange: [150, 300],
                                            }),
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
        paddingTop: 25
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
        marginBottom: 15,
        borderRadius: 8,
        overflow: "hidden",
        justifyContent: "flex-end",
    },
    recipeBackground: {
        flex: 1,
        justifyContent: "flex-end",
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
        marginTop: 5,
    },
    buttonContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
});

export default FoodDashboard;
