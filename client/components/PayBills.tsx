import { View, Text } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'

const PayBills = () => {
  return (
    <View className="py-4 px-5 flex-row bg-white items-center mt-5 justify-between rounded-lg">
          <View className="flex-col items-center gap-1">
            <Ionicons
              name="cellular"
              size={21}
              color='lightgreen'
            />
            <Text className='text-sm'>Airtime</Text>
          </View>
          <View className="flex-col items-center gap-1">
            <Feather
              name="wifi"
              size={21}
              color={"lightgreen"}
            />
            <Text className='text-sm'>Data</Text>
          </View>
          <View className="flex-col items-center gap-1">
            <Ionicons
              name="football"
              size={21}
              color={"lightgreen"}
            />
            <Text className='text-sm'>Betting</Text>
          </View>
          <View className="flex-col items-center gap-1">
            <Feather
              name="tv"
              size={21}
              color={"lightgreen"}
            />
            <Text className='text-sm'>Tv</Text>
          </View>
        </View>
  )
}

export default PayBills