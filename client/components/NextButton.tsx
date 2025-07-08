import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { homestyles } from '@/assets/styles/home.styles'
const NextButton = ({...props}) => {

  return (
    <TouchableOpacity style={homestyles.nextbutton} {...props}>
        <Text>done</Text>
    </TouchableOpacity>
  )
}

export default NextButton