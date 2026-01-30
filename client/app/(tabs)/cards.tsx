import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const logouts = () => {
  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <View>
        <Text>logouts</Text>
      </View>
    </SafeAreaView>
  )
}

export default logouts