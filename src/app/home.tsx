import { useEffect, useState } from 'react';
import { View, Text, Alert, Image } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps';
import { api } from '@/services/api'
import { Categories, CategoriesProps } from '@/components/categories';
import { PlacePros } from '@/components/place';
import { Places } from '@/components/places';
import * as Location from 'expo-location'
import { colors, fontFamily } from '@/styles/theme';
import { router } from 'expo-router';

type MarketsProps = PlacePros & {
  latitude: number
  longitute: number

}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState('')
  const [markets, setMakets] = useState<MarketsProps[]>([])


  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data);
      setCategory(data[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert('Categorias', 'Não foi possível carregar as categorias.')

    }

  }

  async function fethMarkets() {
    try {
      if (!category) {
        return
      }

      const { data } = await api.get('/markets/category/' + category)
      setMakets(data)


    } catch (error) {
      console.log(error)
      Alert.alert('Locais', 'Não foi possível carregar os locais')
    }

  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()

      if (granted) {
        const location = await Location.getCurrentPositionAsync({})
        //console.log(location);

      }
    } catch (error) {
      console.log(error)


    }

  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fethMarkets()
  }, [category])

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        onSelected={setCategory}
        selected={category}
      />

      <MapView style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >

        <Marker

          identifier='current'
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require('@/assets/location.png')}
        />

        {markets.map((item) => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitute,
            }}
            image={require('@/assets/pin.png')}
          >
            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
              <View>
                <Text style={{
                  fontSize: 14,
                  fontFamily: fontFamily.medium,
                  color: colors.gray[600]
                }}>
                  {item.name}
                </Text>
                <Text style={{
                  fontSize: 12,
                  fontFamily: fontFamily.regular,
                  color: colors.gray[600]
                }}>
                  {item.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}


      </MapView>

      <Places
        data={markets}
      />
    </View>
  )
}