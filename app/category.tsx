import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors';

export default function category() {
  return (
    <View style={styles.container}>
      <Text>category</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
  },
});
