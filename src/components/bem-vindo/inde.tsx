import { View, Text, Image } from 'react-native'
import { s } from  './style'

export default function BemVindo() {
  return (
    <View>
      <Image source={require('@/assets/logo.png')} style={s.logo} />

      <Text style={s.title}>Bem vindos ao Nearby!!</Text>

      <Text style={s.subtitle}>
        Tenha cupons de vantagem para usar em {'\n'} 
        seus estabelecimentos favoritos.
      </Text>

    </View>
  )
}