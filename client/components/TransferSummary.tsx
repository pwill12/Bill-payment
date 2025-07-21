import { View, Text} from 'react-native'
import React from 'react'
import HeaderName from './HeaderName'
import { Feather } from '@expo/vector-icons'

const TransferSummary = () => {
  return (
    <HeaderName showhistorybutton={false} headertext='Complete transaction'>
    <View className='flex-row gap-5'>
      <Feather name='user' size={21}/>
      <View className='flex-col gap-2 items-center'>
        <Text className='font-medium text-xl'>Princewill Okechukwu</Text>
        <Text className='font-light text-gray-500'>pwill2339</Text>
      </View>
    </View>
    </HeaderName>
  )
}

export default TransferSummary