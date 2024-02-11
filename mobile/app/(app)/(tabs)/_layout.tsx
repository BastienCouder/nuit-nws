import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text, Image, ActivityIndicator } from "react-native";
import themeColors from "@/constants/Colors";
import { usePathname } from 'expo-router';

export function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>["name"];
   color: string;
 }) {
   return (
     <FontAwesome
       size={28}
       style={{ marginBottom: -2,}}
       {...props}
     />
   );
 }
export default function TabLayout() {
  const pathname = usePathname ();

  const isUserPage = pathname.startsWith('/user/');

  return (
    <View style={{ flex: 1 }}>
      {/* Carré et texte en haut de la page */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#04061F",
          paddingTop: 20,
        }}
      >
        {/* Ajoutez l'Image */}
        <Image
          source={require("@/assets/images/logo-layout.svg")}
        />
      </View>

        <Tabs
          screenOptions={{
            tabBarActiveTintColor: themeColors.background,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: themeColors.primary,
              height: 55,
              borderWidth: 0,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: () => (
                <TabBarIcon name="user" color={themeColors.background} />
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="scan"
            options={{
              tabBarIcon: () => (
                <TabBarIcon name="camera" color={themeColors.background} />
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="ranking"
            options={{
              tabBarIcon: () => (
                <TabBarIcon name="trophy" color={themeColors.background} />
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="user/[userId]"
            options={{
              tabBarIcon: () => null,
              tabBarLabel: () => null,
              tabBarButton: () => null, 
            }}
          />
        </Tabs>
        

        {!isUserPage && (
      <View style={{ position: "absolute", bottom: 80, right: 30 }}>
        <Link href="/how-to-play">
          <Pressable>
            <Text
              style={{
                color: themeColors.text,
                fontSize: 25,
                fontFamily: "FugazOne",
                backgroundColor: themeColors.secondary,
                width: 50,
                height: 50,
                borderRadius: 50,
                paddingTop: 6,
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              ?
            </Text>
          </Pressable>
        </Link>
      </View>
        )}
    </View>
  );
}
