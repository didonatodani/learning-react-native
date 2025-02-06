import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '@/constants/colors';
import { Product } from '@/types/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites'

export default function favs() {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [refreshing, setRefreshing] = useState(false)

  async function fetchFavorites() {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY)
      if (favorites) {
        const favoriteProducts = JSON.parse(favorites) as Product[];
        setFavorites(favoriteProducts)
      }
    } catch (error) {
      console.error('Error checking favorite status:', error)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.productTitle}>{item.title}</Text>}
        refreshing={refreshing}
          onRefresh={() => {
          setRefreshing(true)
          fetchFavorites()
          setRefreshing(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
    padding: 16,
    gap: 16,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.inactive,
    padding: 16,
  },
});
