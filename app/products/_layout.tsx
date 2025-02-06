import { StyleSheet} from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { COLORS } from '@/constants/colors'

export default function ProductsLayout() {
  return (
    <Stack screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}>
      <Stack.Screen name="index" options={{title: 'All Products'}} />
      <Stack.Screen name="[id]" options={{title: 'Product Details'}} />
    </Stack>
  )

}


const styles = StyleSheet.create({})