import { View, Text } from "react-native";
import React, { useEffect } from "react";
import TransferCard from "@/components/TransferCard";
import HeaderName from "@/components/HeaderName";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import { router } from "expo-router";
import { useReceiver } from "@/hooks/useReceiver";

const TransferPageCard = () => {
  const { fetchUsersandCache, data, loading } = useReceiver();

  const handlePress = () => {
    navigate("/");
  };

  const HandleTransfer = async (username: string) => {
    await fetchUsersandCache(username);
  };

  useEffect(() => {
    if (data?.status === 200) {
      router.push({
        pathname: "/transfer/summary",
        params: { name: data?.data.firstname, firstname: data?.data.username },
      });
    }
  }, [data]);

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
