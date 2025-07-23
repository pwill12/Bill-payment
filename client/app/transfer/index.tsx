import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import TransferCard from "@/components/TransferCard";
import HeaderName from "@/components/HeaderName";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import { router } from "expo-router";
import { useReceiver } from "@/hooks/useReceiver";
import { useAuth } from "@clerk/clerk-expo";

const TransferPageCard = () => {
  const { fetchUsersandCache, data, loading } = useReceiver();
  const {userId} = useAuth()

  const handlePress = () => {
    navigate("/");
  };

  const HandleTransfer = async (username: string) => {
    await fetchUsersandCache(username);
  };

  useEffect(() => {

    if (data?.clerk_id === userId) {
      Alert.alert("You cannot send to yourself")
    }
    else if (data?.username) {
      router.push({
        pathname: "/transfer/summary",
        params: { name: data?.username, firstname: data?.firstname, lastname: data?.lastname, img: data?.img },
      });
    }
  }, [data,userId]);

  return (
    <HeaderName
      showhistorybutton={true}
      headertext="Transfer to User Account"
      onPress={handlePress}
    >
      <View className="bg-blue-100 px-3 py-4 flex-row gap-2 items-center rounded-lg ">
        <MaterialCommunityIcons name="bank-transfer" size={21} />
        <Text>Free transfer for today 3</Text>
      </View>
      <TransferCard onTransfer={HandleTransfer} isLoading={loading} />
    </HeaderName>
  );
};

export default TransferPageCard;
