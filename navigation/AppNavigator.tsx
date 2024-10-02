import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import EventScreen from '../screens/EventScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ isDark, setIsDark }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} isDark={isDark} setIsDark={setIsDark} />}
        </Stack.Screen>
        <Stack.Screen name="Event" component={EventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default AppNavigator;
