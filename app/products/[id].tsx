import { Product } from '@/types/interfaces'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native'
import { COLORS } from '@/constants/colors'


export default function ProductDetails() {
  const { id } = useLocalSearchParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <ActivityIndicator size='large' color={COLORS.text} />
  }

  return (
    <View style={styles.container}>
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