import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TabsCategory } from "@/utils/data";

type Tabs = {
  id: string;
  name: string;
  active?: boolean;
};
interface Data {
  data: readonly Tabs[];
  onChange?: (id: string) => void;
}
const RecentTransfer = ({ data, onChange }: Data) => {
  const [activeId, setActiveId] = useState<string>(
    data.find((t) => t.active)?.id ?? data[0]?.id ?? ""
  );
  const handleTabschange = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };
  return (
    <View className="p-2 bg-white rounded-xl">
      <View className="flex-row justify-between items-center pt-2">
        <View className="flex-row gap-3">
          {data.map((tab, index) => (
            <TouchableOpacity
              className={`border-b-2 ${activeId === tab.id ? "border-red-500" : "border-transparent"}`}
              key={tab.id}
              onPress={() => handleTabschange(tab.id)}
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
