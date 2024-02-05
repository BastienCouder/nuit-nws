import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, Image } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -2, color: '#04061F' }} {...props} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Carré et texte en haut de la page */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#04061F' }}>

        {/* Ajoutez l'Image */}
        <Image
          source={require('@/assets/images/Logo.png')}
          style={{ width: 100, height: 100, marginLeft: 10 }}
        />

        {/* Texte "La nuit de la NWS" avec la couleur du background */}
        <Text style={{ color: themeColors.primary, fontSize: 24, fontWeight: 'bold', marginLeft: 10, fontFamily: 'FugazOne' }}>
          La nuit de la NWS
        </Text>
      </View>

      {/* Le reste de votre interface utilisateur */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: themeColors.background,
          headerShown: useClientOnlyValue(false, false),
          tabBarStyle: {
            backgroundColor: themeColors.primary,
            height: 55,
            borderWidth: 0,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            tabBarLabel: () => null,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }: any) => (
                    <FontAwesome
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
            tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="ranking"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
            tabBarLabel: () => null,
          }}
        />
      </Tabs>
    </View>
  );
}
