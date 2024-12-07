import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';  // Dacă ai deja un custom text component
import { ThemedView } from '@/components/ThemedView';  // Dacă ai deja un custom view component

export default function GoalsScreen() {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [scop, setScop] = useState('');

    // Functia pentru trimiterea datelor la server
    const saveData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    age,
                    weight,
                    height,
                    scop,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Datele au fost salvate cu succes!');
            } else {
                alert('Eroare la salvarea datelor: ' + data.message);
            }
        } catch (error) {
            console.error('Eroare:', error);
            alert('A apărut o eroare. Te rugăm să încerci din nou.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ThemedView style={styles.innerContainer}>
                    <ThemedText style={styles.title}>Setează-ți obiectivele</ThemedText>

                    <TextInput
                        style={styles.input}
                        placeholder="Vârsta"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Greutate"
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Înălțime"
                        value={height}
                        onChangeText={setHeight}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Scopul (ex: pierdere în greutate, creștere în masă)"
                        value={scop}
                        onChangeText={setScop}
                    />

                    <Button title="Salvează" onPress={saveData} />
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',  // Centrarea conținutului în ecran
        padding: 20,
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 45,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#f8f8f8',
    },
});
