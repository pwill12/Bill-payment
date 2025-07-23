import { View, Text, Image } from "react-native";
import React from "react";
import HeaderName from "@/components/HeaderName";
import { useLocalSearchParams } from "expo-router";
import AmountCard from "@/components/AmountCard";
import Remark from "@/components/Remark";


const TransferSummary = () => {
    const {name, firstname, img, lastname} = useLocalSearchParams()
  return (
    <HeaderName showhistorybutton={false} headertext="Complete transaction">
      <View className="flex-row gap-5">
        <Image source={{uri: `${img}`}} className="size-20 rounded-full"/>
        <View className="flex-col gap-1">
          <Text className="font-medium text-xl">{firstname} {lastname}</Text>
          <Text className="font-light text-gray-500">{name}</Text>
        </View>
      </View>
      <AmountCard />
      <Remark />
    </HeaderName>
  );
};

export default TransferSummary;
