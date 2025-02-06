import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { COLORS } from '@/constants/colors';
import { Product } from '@/types/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControl } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
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


  // so that the page updates without being refreshed
  useFocusEffect(
    useCallback(() => { 
      fetchFavorites()
    }, [])
  )


  function onRefresh() {
    setRefreshing(true)
    fetchFavorites()
    setRefreshing(false)
  }

  function renderItem({ item }: { item: Product }) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => {
          removeFavorite(item.id)
        }}>
          <Ionicons name='trash' size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

    )
  }

  async function removeFavorite(id: number) {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY)
      if (favorites) {
        const favoriteProducts = JSON.parse(favorites) as Product[];
        const updatedFavorites = favoriteProducts.filter((product) => product.id !== id)
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
        onRefresh()
      }

    } catch (error) {
      console.error('Error removing favorite:', error)
    }


  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={

          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }

      />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.containerBackground,
    padding: 16,
  },
  itemContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.containerBackground,
    borderWidth: 1,
    borderColor: COLORS.text,

  },
  productTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.inactive,
  },
  removeButton: {
    padding: 10,
  }

});
