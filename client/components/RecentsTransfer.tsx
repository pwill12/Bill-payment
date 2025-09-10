import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { User } from "@/types";
import TabsComponents from "./TabsComponents";
import { router } from "expo-router";

type Tabs = {
  id: string;
  name: string;
};

interface RecentTabActionProps {
  data: readonly Tabs[];
  loading: boolean;
  favoriteloading: boolean;
  onChange?: (id: string) => void;
  categories: Pick<User, "firstname" | "lastname" | "img" | "username">[];
  favorites: Pick<User, "firstname" | "lastname" | "img" | "username">[];
}

const RecentTransfer = ({
  data: user,
  onChange,
  categories,
  loading,
  favoriteloading,
  favorites,
}: RecentTabActionProps) => {
  const [activeId, setActiveId] = useState<string>(
    user.find((t) => t.id)?.id ?? user[0]?.id ?? ""
  );
  const [activePage, setActivePage] = useState<string>(
    user.find((t) => t.id)?.id ?? user[0]?.id ?? ""
  );
  const handleTabschange = (id: string) => {
    setActiveId(id);
    onChange?.(id);
    setActivePage(id);
  };

  const handleCategoryPress = (
    user: Pick<User, "lastname" | "firstname" | "username" | "img">
  ) => {
    router.push({
      pathname: "/transfer/summary",
      params: {
        name: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        img: user.img,
      },
    });
  };
  return (
    <View className="py-2 px-4 bg-white rounded-xl gap-3">
      <View className="flex-row justify-between items-center pt-2">
        <View className="flex-row gap-5 items-center">
          {user.map((tab, index) => (
            <TouchableOpacity
              className={`border-b-2 ${activeId === tab.id ? "border-green-500" : "border-transparent"}`}
              key={tab.id}
              onPress={() => handleTabschange(tab.id)}
            >
              <Text
                className={`${activeId === tab.id && "text-green-600"} ${index === 0 ? "text-xl" : ""}`}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="justify-center items-center w-11">
          <Feather name="search" size={15} color={"green"} />
        </View>
      </View>
      {activePage === "recent" ? (
        loading ? (
          <View className="px-4 justify-center items-center bg-gray-50">
            <ActivityIndicator size={"large"} />
          </View>
        ) : categories?.length === 0 ? (
          <View>
            <Text>no recent transfer</Text>
          </View>
        ) : (
          <TabsComponents
            categories={categories}
            onUserPress={handleCategoryPress}
          />
        )
      ) : activeId === "favorite" ? (
        favoriteloading ? (
          <View className="px-4 justify-center items-center bg-gray-50">
            <ActivityIndicator size={"large"} />
          </View>
        ) : favorites?.length === 0 ? (
          <View>
            <Text>no recent transfer</Text>
          </View>
        ) : (
          <TabsComponents categories={favorites} />
        )
      ) : (
        <Text>no tabs data</Text>
      )}
    </View>
  );
};

export default RecentTransfer;
