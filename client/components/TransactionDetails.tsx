import { View, Text } from "react-native";
import React from "react";
import HeaderName from "./HeaderName";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGetTransaction } from "@/hooks/useTransactions";

interface details {
  id: number
}
const TransactionDetails = ({id}: details) => {
  const {transaction_details} = useGetTransaction(id)
  console.log(transaction_details)
  return (
    <HeaderName
      headertext="Transaction Details"
      showhistorybutton
      icon="customerservice"
    >
      <View className="gap-4 bg-white flex-col mt-6 rounded-md items-center p-3">
        <View className="items-center bottom-9 mb-4">
          <MaterialCommunityIcons
            name="bank"
            size={24}
            className="bg-blue-500 p-3 rounded-full absolute"
            color={"white"}
          />
        </View>
        <Text className="font-semibold text-xl">Transfer to will</Text>
        <Text className="font-bold text-3xl">${transaction_details?.amount}</Text>
        <View className="flex-row items-center gap-2">
          <Feather
            name="check"
            color={"white"}
            size={20}
            className="bg-green-400 rounded-full"
          />
          <View className="h-px w-1/4 bg-green-500"></View>
          <Feather
            name="check"
            color={"white"}
            size={20}
            className="bg-green-400 rounded-full"
          />
          <View className="h-px w-1/4 bg-green-500"></View>
          <Feather
            name="check"
            color={"white"}
            size={20}
            className="bg-green-400 rounded-full"
          />
        </View>
        <View className="flex-row gap-5 overflow-hidden flex-wrap">
          <Text className="text-xs color-slate-400">payment successful</Text>
          <Text className="text-xs color-slate-400">Processing by Bank</Text>
          <Text className="text-xs color-slate-400">Transfer successful</Text>
        </View>
        <View className="bg-gray-100 p-3 rounded-3xl">
            <Text className="text-sm text-gray-600">The recipient account is expected to be credited within seconds</Text>
        </View>
      </View>
    </HeaderName>
  );
};

export default TransactionDetails;
