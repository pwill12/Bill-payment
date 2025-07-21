import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import TransferCard from "@/components/TransferCard";
import HeaderName from "@/components/HeaderName";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import { useRouter } from "expo-router";
import { useReceiver } from "@/hooks/useReceiver";
import { useQueryClient } from "@tanstack/react-query";

const TransferPageCard = () => {
  const [username, setUsername] = useState<string>("");
  const [enabled, setenabled] = useState<boolean>(false);
  const { receiver, isLoading, error, refetch } = useReceiver(
    username,
    enabled
  );

  const [loading, setloading] = useState<boolean>(false);

  const handlePress = () => {
    navigate("/");
  };

  const router = useRouter();

  React.useEffect(() => {
    setloading(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    if (error) {
      Alert.alert(error.message);
      console.log(error);
    }
  }, [error]);

  const HandleTransfer = async (username: string) => {
    setUsername(username);
    setenabled(true);

    await receiver;

    setenabled(false);

    if (receiver?.username !== undefined) {
      setenabled(false);
      router.push({
        pathname: "/transfer/summary",
        params: { name: username, firstname: receiver?.firstname },
      });
      console.log(receiver?.username);
      // setenabled(false)
    }
  };

  console.log(enabled);

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
