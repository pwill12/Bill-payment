import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const TransactionCard = () => {
  return (
    <View className="flex-col mt-4 bg-white rounded-xl">
      <View className="p-5 py-4 flex-row justify-between">
        <View className="flex-row items-center gap-2">
          <View className="size-12 justify-center items-center bg-green-100 rounded-full">
            <Feather name="arrow-up" color={'green'} size={15}/>
          </View>
          <View className="flex-col gap-1">
            <Text className="text-sm">Transfer to boku store</Text>
            <Text className="font-thin text-sm">july 17, 9pm</Text>
          </View>
        </View>
        <View className="flex-col gap-1 items-center">
          <Text className="font-semibold text-xl">-$2,000</Text>
          <View className="p-1 bg-green-300 rounded-3xl">
            <Text className="text-xs font-light text-green-900">
              success
            </Text>
          </View>
        </View>
      </View>

      <View className="p-5 flex-row justify-between">
        <View className="flex-row items-center gap-2">
          <View className="size-12 justify-center items-center bg-green-100 rounded-full">
            <Feather name="arrow-up" color={'green'} size={15}/>
          </View>
          <View className="flex-col gap-1">
            <Text className="text-sm">Transfer to boku store</Text>
            <Text className="font-thin text-sm">july 17, 9pm</Text>
          </View>
        </View>
        <View className="flex-col gap-1 items-center">
          <Text className="font-semibold text-xl">-$2,000</Text>
          <View className="p-1 bg-red-300 rounded-3xl">
            <Text className="text-xs font-light text-red-900">
              failed
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransactionCard;
