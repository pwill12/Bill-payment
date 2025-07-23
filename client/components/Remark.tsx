import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextInputs from './TextInputs'

const Remark = () => {
    const [Remarks, setRemarks] = useState<string>('')
  return (
    <View className='p-4 gap-4 flex-col bg-white rounded-lg'>
      <Text className='font-semibold'>Remark</Text>
      <TextInputs onChange={(text) => setRemarks(text)} value={Remarks} placeholdervalue='Enter Remark' multiline={true}/>
    </View>
  )
}

export default Remark