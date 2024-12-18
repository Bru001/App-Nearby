import { useEffect, useState, useRef } from 'react'
import { View, Text, Alert, Modal, StatusBar, ScrollView } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { api } from '@/services/api'
import { Loading } from '@/components/loading'
import { PropsDetails, Details } from '@/components/market/details'
import { Capa } from '@/components/market/capa'
import { Coupon } from '@/components/market/coupon'
import { Button } from '@/components/button'
import { useCameraPermissions, CameraView } from 'expo-camera'

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {
  const [data, setData] = useState<DataProps | undefined>() // Permite que data seja undefined
  const [isLoading, setIsLoading] = useState(true)
  const [coupon, setCoupon] = useState<string | null>(null)
  const params = useLocalSearchParams<{ id: string }>() // Obtemos o id da rota
  const [isVicebleModalCamare, setIsVicebleModalCamare] = useState(false)
  const [_n, requestPermission] = useCameraPermissions()
  const [couponIsFetching, setCouponIsFetching] = useState(false)
  const qrLock = useRef(false)
  //console.log(params.id);


  async function fetchMarket() {
    try {
      const response = await api.get(`/markets/${params.id}`)
      setData(response.data) // Armazena os dados no estado
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      Alert.alert('Erro', 'Não foi possível carregar os dados', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ])
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()

      if (!granted) {
        return Alert.alert('Câmera', 'Você precisa habilatar o uso da câmera')
      }

      qrLock.current = false
      setIsVicebleModalCamare(true)
    } catch (error) {
      console.log(error);
      Alert.alert('Câmera', 'Não foi possìvel usar a câmera')

    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true)

      const { data } = await api.patch('/coupons/' + id)

      Alert.alert('Cupon', data.coupon)
      setCoupon(data.Cupon)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível utilizar o cupom')

    } finally {
      setCouponIsFetching(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVicebleModalCamare(false)

    Alert.alert('Cupom', 'Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?',
      [
        { style: 'cancel', text: 'Não' },
        { text: 'Sim', onPress: () => getCoupon(id) }
      ]
    )
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading) {
    // Mostra o componente de loading enquanto está carregando
    return <Loading />
  }

  if (!data) {
    // Garante que não renderize o resto do código se data for undefined
    return <Text>Erro ao carregar dados.</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' hidden={isVicebleModalCamare} />

      <ScrollView showsVerticalScrollIndicator={false}>

        <Capa uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVicebleModalCamare}>
        
        <CameraView
          style={{ flex: 1 }}
          facing='back'
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 700)
            }
          }}
        />

        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button onPress={() => setIsVicebleModalCamare(false)} isLoading={couponIsFetching}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
