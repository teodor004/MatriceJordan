import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Import your custom favicons
const dumbbellIcon = require('@/assets/images/dumbellFavicon.png');
const bowlIcon = require('@/assets/images/bowlFavicon.png');
const fireIcon = require('@/assets/images/fireFavicon.png');

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'white', // Set the active icon color to white
                tabBarInactiveTintColor: 'white', // Set the inactive icon color to white
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute', // Transparent background on iOS
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Workouts',
                    tabBarIcon: () => (
                        <Image
                            source={dumbbellIcon}
                            style={{ width: 28, height: 28, tintColor: 'white' }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Meals',
                    tabBarIcon: () => (
                        <Image
                            source={bowlIcon}
                            style={{ width: 28, height: 28, tintColor: 'white' }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="goals"
                options={{
                    title: 'Goals',
                    tabBarIcon: () => (
                        <Image
                            source={fireIcon}
                            style={{ width: 28, height: 28, tintColor: 'white' }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
