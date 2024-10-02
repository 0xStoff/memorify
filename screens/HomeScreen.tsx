import React from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { YStack, XStack, Button, Text } from 'tamagui'
import { useNavigation } from '@react-navigation/native'
import ThemeToggleButton from '../components/ThemeToggleButton'
import EventCard from '../components/EventCard'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import { Event } from 'types'
import { mockEvents } from 'data/mockData'

interface HomeScreenProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

type RootStackParamList = {
  Event: { event: typeof mockEvents[0] };
  // Add other screen names and their params here
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Event'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ isDark, setIsDark }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '$background' }}>
      <YStack flex={1} backgroundColor="$background">
        <XStack justifyContent="space-between" alignItems="center" padding="$4">
          <Text fontSize={24} fontWeight="bold" color="$color">Memorify</Text>
          <ThemeToggleButton isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </XStack>
        <FlatList
          data={mockEvents}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              date={item.date}
              imageUrl={item.imageUrl}
              memoryCount={item.memories.length}
              onPress={() => navigation.navigate('Event', { event: item })}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
        <Button
          size="$4"
          fontWeight={'bold'}
          onPress={() => console.log('Navigate to Add Event screen')}
          margin={10}
        >
          Add Event
        </Button>
      </YStack>
    </SafeAreaView>
  )
}

export default HomeScreen
