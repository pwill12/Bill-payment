import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { CategoryProps, TabsCategory } from "@/utils/data";
import { Transactions, User } from "@/types";

type Tabs = {
  id: string;
  name: string;
};

interface RecentTabActionProps {
  data: readonly Tabs[];
  onChange?: (id: string) => void;
  categories?: Omit<User, "number" | "email" | "balance">[];
  onUserPress?: (
    user: Pick<User, "clerk_id" | "firstname" | "username" | "img">
  ) => void;
}

const RecentTransfer = ({
  data,
  onChange,
  categories,
  onUserPress,
}: RecentTabActionProps) => {
  const [activeId, setActiveId] = useState<string>(
    data.find((t) => t.id)?.id ?? data[0]?.id ?? ""
  );
  const [activePage, setActivePage] = useState<string>(
    data.find((t) => t.id)?.id ?? data[0]?.id ?? ""
  );
  const handleTabschange = (id: string) => {
    setActiveId(id);
    onChange?.(id);
    setActivePage(id);
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
      <View>
        {activePage === "recent" || activePage === "favorite" ? (
          categories?.map((category) => (
            <TouchableOpacity
              key={category.clerk_id ?? category.username}
            >
              <View>
                <Text>{category.firstname}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>no tabs data</Text>
        )}
      </View>
    </View>
  );
};

export default RecentTransfer;
