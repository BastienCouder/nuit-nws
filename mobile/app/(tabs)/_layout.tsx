import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, usePathname } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import themeColors from "@/constants/Colors";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const pathname = usePathname();

  const isUserPage = pathname.startsWith("/user/");

  return (
    <View style={{ flex:1}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#04061F",
          paddingTop: 20,
        }}
      >
        <Image source={require("@/assets/images/logo-layout.svg")} />
      </View>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: themeColors.background,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, false),
          tabBarStyle: {
            backgroundColor: themeColors.primary,
            height: 55,
            borderWidth: 0,
          },
        }}
      >
        {/* <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: () => <TabBarIcon name="code" color={themeColors.background} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }:any) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={themeColors.background}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      /> */}
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
          name="user/[token]"
          options={{
            tabBarIcon: () => null,
            tabBarLabel: () => null,
            tabBarButton: () => null,
          }}
        />
      </Tabs>

      {!isUserPage && (
        <View style={{ position: "absolute", bottom: 80, right: 30 }}>
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }: any) => (
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
                    opacity: pressed ? 0.5 : 1,
                  }}
                >
                  ?
                </Text>
              )}
            </Pressable>
          </Link>
        </View>
      )}
    </View>
  );
}
