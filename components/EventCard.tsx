import React, { useState } from 'react'
import { Card, Text, YStack, XStack, useTheme } from 'tamagui'
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface EventCardProps {
  title: string;
  date: string;
  imageUrl: string;
  memoryCount: number;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, imageUrl, memoryCount, onPress }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const theme = useTheme()

  return (
    <Card onPress={onPress} elevate bordered height={200} margin={10} overflow="hidden">
      {imageLoading && (
        <View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={theme.color?.val ?? '#000000'} />
        </View>
      )}
      <Image 
        source={{ uri: imageUrl }} 
        style={StyleSheet.absoluteFillObject} 
        onLoad={() => setImageLoading(false)}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.7)']}
        style={StyleSheet.absoluteFillObject}
      />
      <YStack flex={1} justifyContent="space-between" padding="$3">
        <YStack>
          <Text fontSize={20} fontWeight="bold" color="white">{title}</Text>
          <Text fontSize={14} color="rgba(255,255,255,0.8)">{date}</Text>
        </YStack>
        <Text fontSize={14} color="rgba(255,255,255,0.8)">{memoryCount} memories</Text>
      </YStack>
    </Card>
  )
}

export default EventCard
