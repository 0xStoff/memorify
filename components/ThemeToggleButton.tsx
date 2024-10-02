import React from 'react'
import { Button } from 'tamagui'
import { Sun, Moon } from '@tamagui/lucide-icons'

interface ThemeToggleButtonProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ isDark, onToggle }) => {
  return (
    <Button
      size="$3"
      theme={isDark ? 'yellow' : 'blue'}
      onPress={onToggle}
      icon={isDark ? Sun : Moon}
      circular
    />
  )
}

export default ThemeToggleButton
