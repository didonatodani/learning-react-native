import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors';

export default function favs() {
  return (
    <View style={styles.container}>
      <Text>favs</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
  },
});
