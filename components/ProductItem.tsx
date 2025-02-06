import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Product } from '@/types/interfaces'
import { COLORS } from '@/constants/colors'
import { Link } from 'expo-router'

interface ProductItemProps {
    product: Product
}

export default function ProductItem({ product }: ProductItemProps) {
    return (
        <Link href={`/products/${product.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.productItemContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.productTitle}>{product.name}</Text>
                        <Text style={styles.productBrand}>{product.brand.toUpperCase()}</Text>
                    </View>
                    <Ionicons name='chevron-forward' size={20} color={COLORS.text} />
                </View>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    productItemContainer: {
        backgroundColor: COLORS.containerBackground,
        padding: 10,
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.text
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    productTitle: {
        color: COLORS.inactive,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    productBrand: {
        color: COLORS.text,
        fontSize: 16,
    }
})