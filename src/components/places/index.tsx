import { useRef } from 'react'
import { Text, useWindowDimensions } from 'react-native'
import { Place, PlacePros } from '../place'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { s } from './style'
import { router } from 'expo-router'


type Props = {
  data: PlacePros[]
}

export function Places({ data }: Props) {
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.navigate(`/market/${item.id}`)}
          />
        )}
        contentContainerStyle={s.conteudo}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <Text style={s.title}>Explore locais perto de vocè</Text>
        )}
      />
    </BottomSheet>
  )
}