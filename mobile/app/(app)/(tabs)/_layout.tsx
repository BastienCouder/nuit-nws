import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3, color: props.color }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, false),
        tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'light'].text }, // Set the background color here
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color="#04061F" />,
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
        name="two"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color="#04061F" />,
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color="#04061F" />,
        }}
      />
    </Tabs>
  );
}
