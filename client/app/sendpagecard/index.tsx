import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import TransferCard from "@/components/TransferCard";

const TransferPageCard = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-gray-50 gap-4 flex-1">
        <View className="flex-row justify-between py-5 px-3 bg-white w-full">
          <TouchableOpacity className="flex-row items-center gap-3">
            <Feather name="arrow-left" color={"lightgreen"} />
            <Text>Transfer to Bank Account</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Text className="color-green-500">History</Text>
          </TouchableOpacity>
        </View>
        <View className="px-3 gap-4">
          <View className="bg-blue-100 px-3 py-4 flex-row gap-2 items-center rounded-lg ">
            <MaterialCommunityIcons name="bank-transfer" size={21}/>
            <Text>Free transfer for today 3</Text>
          </View>
          <TransferCard />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransferPageCard;
