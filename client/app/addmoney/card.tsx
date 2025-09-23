import { View, Text, Alert } from 'react-native'
import React from 'react'
import HeaderName from '@/components/HeaderName'
import { StripeProvider } from "@stripe/stripe-react-native";
import { useStripePublic } from "@/hooks/useStripe";


const CardDeposit = () => {
    const { publicKey } = useStripePublic();
    console.log(publicKey)

    if (!publicKey) {
      Alert.alert("something went wrong")
    }
  
  return (
    <StripeProvider publishableKey={publicKey}>
    <HeaderName headertext='add card'>
      <View>
        <Text>card</Text>
      </View>
    </HeaderName>
    </StripeProvider>
  )
}

export default CardDeposit