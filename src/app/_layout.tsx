import { colors } from '@/styles/colors'
import { Stack } from 'expo-router'
import {
  useFonts,
  Rubik_600SemiBold,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold
} from '@expo-google-fonts/rubik'
import { Loading } from '@/components/loading'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Layout() {
  const [Loaded] = useFonts({
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
  })

  if (!Loaded) {
    return <Loading />
  }

  return (
    < GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[100] },
        }} />
    </GestureHandlerRootView>
  )
}