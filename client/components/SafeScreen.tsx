import { COLORS } from '@/constants/color';
import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeScreen = ({children} : {children : React.ReactNode}) => {
    const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top, flex: 1, backgroundColor: COLORS.primary}}>
      {children}
    </View>
  )
}

export default SafeScreen