import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderColor: COLORS.text,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: COLORS.text,
        tabBarInactiveTintColor: COLORS.inactive,

      }}>
        <Tabs.Screen name="index" options={
          {
            href: null,
          }

        } />
        <Tabs.Screen name="products"
          options={{
            headerShown: false,
            tabBarLabel: "Products",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="color-wand" color={color} size={size} />
            )
          }}
        />
        <Tabs.Screen name="brands"
          options={{
            title: "All Brands",
            tabBarLabel: "Brands",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pricetag" color={color} size={size} />
            )
          }}
        />
        <Tabs.Screen name="favs"
          options={{
            title: "Favorite Products",
            tabBarLabel: "Favs",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color={color} size={size} />
            )
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  )
}