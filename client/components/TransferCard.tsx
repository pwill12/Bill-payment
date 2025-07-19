import { View, Text, TextInput } from 'react-native'
import React from 'react'
import TransactionButton from './TransactionButton'

const TransferCard = () => {
  return (
    <View className='flex-col gap-6 rounded-xl bg-white px-3 py-7'>
      <Text className='font-semibold text-2xl'>Recipent Account</Text>
      <TextInput placeholder='Enter recipent username' className='font-medium text-xl'/>
      <TransactionButton/>
    </View>
  )
}

export default TransferCard