import { Product } from '@/types/interfaces'
import { useLocalSearchParams, Stack } from 'expo-router' 
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { COLORS } from '@/constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'

const FAVORITES_KEY = 'favorites'
export default function ProductDetails() {
  const { id } = useLocalSearchParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        setProduct(data)
        checkFavoriteStatus()
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return <ActivityIndicator size='large' color={COLORS.text} />
  }

  async function checkFavoriteStatus() {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY)


      if (favorites) {
        const favoriteProducts = JSON.parse(favorites) as Product[];
        setIsFavorite(favoriteProducts.some(product => product.id.toString() === id))
      }
    } catch (error) {
      console.error('Error checking favorite status:', error)
    }
  }

  async function toggleFavorite() {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY) 
      let favoriteProducts = favorites ? JSON.parse(favorites) as Product[] : []


      if(isFavorite){
        favoriteProducts = favoriteProducts.filter(product => product.id.toString() !== id)
      } else {
        favoriteProducts.push(product as Product)
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteProducts))
      setIsFavorite(!isFavorite)

    } catch (error) {
      console.error('Error toggling favorite:', error)
    }

  } 

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerRight: () => (
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={COLORS.text} />
          </TouchableOpacity>
        )
      }}/>
      <Image source={{ uri: product?.image }} style={styles.image} />
      <View style={styles.productDetailsContainer}>

        <Text style={styles.productTitle}>{product?.title}</Text>
        <Text style={styles.productPrice}>{product?.price} €</Text>
        <Text style={styles.productCategory}>{product?.category.toUpperCase()}</Text>
        <Text style={styles.productDescription}>{product?.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.containerBackground,
    flex: 1,
    alignItems: 'center',
  },
  productDetailsContainer: {
    padding: 20,
    gap: 10,
  },
  productTitle: {
    color: COLORS.inactive,
    fontSize: 20,
    fontWeight: 'bold',
  },
  productPrice: {
    color: COLORS.text,
    fontSize: 18,
  },
  productCategory: {
    color: COLORS.text,
    fontSize: 16,
  },
  productDescription: {
    color: COLORS.inactive,
    fontSize: 16,
    lineHeight: 24,
  },

  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  }

})