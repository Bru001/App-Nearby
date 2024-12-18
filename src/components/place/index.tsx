import { 
    View, 
    Text, 
    TouchableOpacity,
    Image, 
    TouchableOpacityProps 
} from 'react-native'
import { s } from './style'
import { IconTicket } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'

export type PlacePros = {
    id: string
    name: string
    description: string
    coupons: number
    cover: string
    address: string
} 

type Props = TouchableOpacityProps & {
    data: PlacePros
}

export function Place({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={s.container} {...rest}>
        <Image style={s.img} source={{ uri: data.cover}}/>
        <View style={s.conteudo}>
            <Text style={s.name}>{data.name}</Text>
            <Text style={s.description} numberOfLines={2}> {data.description} </Text>

            <View style={s.footer}>
                 <IconTicket size={16} color={colors.red.base} />
                 <Text style={s.ticket}>{data.coupons} Cupons disponíveis</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}