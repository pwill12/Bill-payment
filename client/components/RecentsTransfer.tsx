import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TabsCategory } from "@/utils/data";

interface Data {
  data: typeof TabsCategory
}
const RecentTransfer = ({data}: Data) => {
  const [active, setactive] = useState<boolean>(false);
  console.log(data)
  return (
    <View className="p-2 bg-white rounded-xl">
      <View className="flex-row justify-between items-center pt-2">
        <View className="flex-row gap-3">
          {data.map((tab, index) => (
            <TouchableOpacity
              className={`border-b-2 ${tab.active ? "border-red-500" : "border-white"}`}
              key={tab.id}
              onPress={() => tab.active === true}
            >
              <Text>{tab.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Feather name="search" />
      </View>
    </View>
  );
};

export default RecentTransfer;
