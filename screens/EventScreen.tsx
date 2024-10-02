import React, { useState } from 'react'
import { SafeAreaView, Image, Dimensions, View, ActivityIndicator } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { YStack, Text, Card, useTheme } from 'tamagui'
import { RootStackParamList } from 'types'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  runOnJS,
  Easing,
  useAnimatedReaction
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useAnimatedScrollHandler, useAnimatedRef } from 'react-native-reanimated';

type EventScreenProps = NativeStackScreenProps<RootStackParamList, 'Event'>

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SWIPE_THRESHOLD = 100

const EventScreen: React.FC<EventScreenProps> = ({ route }) => {
  const { event } = route.params
  const theme = useTheme()
  const navigation = useNavigation()
  const translateX = useSharedValue(0)
  const scrollEnabled = useSharedValue(true);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const isScrolling = useSharedValue(false);
  const startX = useSharedValue(0);

  const [mainImageLoading, setMainImageLoading] = useState(true);
  const [memoryImagesLoading, setMemoryImagesLoading] = useState<{[key: string]: boolean}>({});

  useAnimatedReaction(
    () => translateX.value === 0,
    (isEnabled) => {
      scrollEnabled.value = isEnabled;
    }
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      isScrolling.value = event.contentOffset.y > 0;
    },
  });

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      startX.value = event.absoluteX;
    })
    .onUpdate((event) => {
      const dx = event.absoluteX - startX.value;
      if (dx > 20) { // Allow swipe-back if horizontal movement is significant
        translateX.value = Math.max(0, Math.min(dx, SCREEN_WIDTH));
      }
    })
    .onEnd((event) => {
      const dx = event.absoluteX - startX.value;
      if (dx > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH, {
          duration: 300,
          easing: Easing.out(Easing.ease)
        }, () => {
          runOnJS(navigation.goBack)()
        });
      } else {
        translateX.value = withTiming(0, {
          duration: 300,
          easing: Easing.out(Easing.ease)
        });
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{ flex: 1 }, rStyle]}>
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.ScrollView
            ref={scrollRef}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
          >
            <YStack flex={1} backgroundColor="$background" padding="$4">
              <View style={{ position: 'relative', width: '100%', height: 150 }}>
                {mainImageLoading && (
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.color?.val ?? '#000000'} />

                  </View>
                )}
                <Image 
                  source={{ uri: event.imageUrl }} 
                  style={{ width: '100%', height: 150, borderRadius: 10 }} 
                  onLoad={() => setMainImageLoading(false)}
                />
              </View>
              <Text fontSize={24} fontWeight="bold" marginTop="$4">{event.title}</Text>
              <Text fontSize={16} color="$gray10">{event.date}</Text>
              <Text fontSize={18} fontWeight="bold" marginTop="$4" marginBottom="$2">Memories</Text>
              {event.memories.map(item => (
                <Card key={item.id} marginBottom="$3" padding="$3">
                  <View style={{ position: 'relative', width: '100%', height: 150 }}>
                    {memoryImagesLoading[item.id] && (
                      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={theme.color?.val ?? '#000000'} />
                      </View>
                    )}
                    <Image 
                      source={{ uri: item.imageUrl }} 
                      style={{ width: '100%', height: 150, borderRadius: 10 }} 
                      onLoad={() => setMemoryImagesLoading(prev => ({ ...prev, [item.id]: false }))}
                    />
                    {/*<Video />*/}
                  </View>
                  <Text fontSize={16} marginTop="$2">{item.description}</Text>
                  <Text fontSize={14} color="$gray10" marginTop="$1">Shared by: {item.userName}</Text>
                </Card>
              ))}
            </YStack>
          </Animated.ScrollView>
        </SafeAreaView>
      </Animated.View>
    </GestureDetector>
  )
}

export default EventScreen

