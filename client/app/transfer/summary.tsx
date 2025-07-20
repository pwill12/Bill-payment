import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderName from "@/components/HeaderName";
import { useLocalSearchParams } from "expo-router";

const TransferSummary = () => {
    const {name} = useLocalSearchParams()
  return (
    <HeaderName otherprops={false} headertext="Complete transaction">
      <View className="flex-row gap-5">
        <MaterialCommunityIcons name="account-circle-outline" color={'lightgray'} size={40}/>
        <View className="flex-col gap-1">
          <Text className="font-medium text-xl">Princewill Okechukwu</Text>
          <Text className="font-light text-gray-500">{name}</Text>
        </View>
      </View>
    </HeaderName>
  );
};

export default TransferSummary;
