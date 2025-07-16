import { View, Text } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import AddMoney from './AddMoney'

const Balance = () => {
  return (
    <View className="px-5 py-5 bg-green-500 rounded-2xl justify-center">
          <View className="flex-row justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Feather name="shield" color={"white"} />
              <Text className="color-white">Available Balance</Text>
              <Feather name="eye" color={'white'}/>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="color-slate-100">Transaction history</Text>
              <Feather name="arrow-right" size={10} color={'#f1f5f9'}/>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Feather name="dollar-sign" size={23} color={"white"} />
              <Text className="color-white font-medium text-3xl">200</Text>
            </View>
            <AddMoney/>
          </View>
        </View>
  )
}

export default Balance