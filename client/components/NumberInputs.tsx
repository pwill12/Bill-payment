import { TextInput, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

interface textInputprops{
    onchange: (e: string) => void
    value: string;
}
const NumberInputs = ({onchange , value} : textInputprops) => {
    const numericValue: number = parseFloat(value)
  return (
    <View className='flex-row items-center'>
      <Feather name='dollar-sign' size={16}/>
    <TextInput keyboardType='numeric' placeholder='Enter Amount' onChangeText={onchange} value={value} className={`font-medium text-xl min-w-72 border-b border-b-white flex-1 rounded p-3 ${numericValue < 1? 'border-b-red-400' : 'border-b-purple-500' }`}/>
    </View>
  )
}

export default NumberInputs