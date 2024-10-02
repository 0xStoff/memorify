import React, { useState } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import config from './tamagui.config';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config}>
        <Theme name={isDark ? 'dark' : 'light'}>
          <AppNavigator isDark={isDark} setIsDark={setIsDark} />
        </Theme>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}