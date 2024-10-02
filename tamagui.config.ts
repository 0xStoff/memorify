import { createTamagui } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createInterFont } from '@tamagui/font-inter'

const interFont = createInterFont()

const config = createTamagui({
  defaultTheme: 'light',
  fonts: {
    body: interFont,
  },
  shorthands,
  themes,
  tokens,
})

export type AppConfig = typeof config

export default config
