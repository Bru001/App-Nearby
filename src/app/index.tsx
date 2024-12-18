import BemVindo from '@/components/bem-vindo/inde'
import { Button } from '@/components/button'
import Steps from '@/components/steps'
import { View } from 'react-native'
import { router } from 'expo-router'


export default function Index() {
  return (

    <View style={{ flex: 1, padding: 40, gap: 40 }}>

      <BemVindo />
      <Steps />

      <Button onPress={() => router.navigate('/home')}>
        <Button.Title>Vamos lá!</Button.Title>
      </Button>

    </View>

  )
}