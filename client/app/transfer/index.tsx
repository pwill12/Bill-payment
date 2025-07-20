import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import TransferCard from "@/components/TransferCard";
import HeaderName from "@/components/HeaderName";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import { useRouter } from "expo-router";
import { useReceiver } from "@/hooks/useReceiver";


const TransferPageCard = () => {

  const [loading, setloading] = useState<boolean>(false)

  const handlePress = () => {
    navigate("/");
  };

  const router = useRouter()

  const HandleTransfer = (username: string) => {
    const{receiver,isLoading,error}=useReceiver(username)
    setloading(isLoading)
    if (error) {
      Alert.alert(error.message)
      console.log(error)
    }
    router.push({pathname: '/transfer/summary', params: {name: username, userdetails: receiver}})
  };
  return (
    <HeaderName
      otherprops={true}
      headertext="Transfer to User Account"
      onPress={handlePress}
    >
      <View className="bg-blue-100 px-3 py-4 flex-row gap-2 items-center rounded-lg ">
        <MaterialCommunityIcons name="bank-transfer" size={21} />
        <Text>Free transfer for today 3</Text>
      </View>
      <TransferCard onTransfer={HandleTransfer} isLoading={loading}/>
    </HeaderName>
  );
};

export default TransferPageCard;
