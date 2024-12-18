import { View, Text } from 'react-native'
import { s } from './style'
import { IconProps } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'


type Props = {
  title: string
  description: string
  icon: React.ComponentType<IconProps>
}

export default function Step({ title, description, icon: Icons }: Props ) {
  return (
    <View style={s.container}>
      {Icons &&<Icons size={32} color={colors.red.base} />}

      <View style={s.details}>

        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>

      </View>
    </View>
  )
}