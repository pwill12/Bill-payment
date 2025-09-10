import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { User } from "@/types";

interface RecentTabActionProps {
  loading?: boolean;
  categories: Pick<User, "firstname" | "lastname" | "img" | "username">[];
  onUserPress?: (
    user: Pick<User, "lastname" | "firstname" | "username" | "img">
  ) => void;
}

const TabsComponents = ({ categories , onUserPress}: RecentTabActionProps) => {

    const handleCategoryPress = (category: Pick<User, "lastname" | "firstname" | "username" | "img">) => {
        onUserPress?.(category)
    }
  return (
    <>
      {categories?.map((category) => (
        <TouchableOpacity
          key={category.username}
          className="flex-row justify-between mb-2 items-center"
          onPress={() => handleCategoryPress(category)}
        >
          <View className="flex-col">
            <Text className="text-xl">
              {category.firstname} {category.lastname}
            </Text>
            <Text className="text-gray-400">{category.username}</Text>
          </View>
          <Image
            source={{ uri: category.img }}
            className="w-11 h-11 rounded-full"
          />
        </TouchableOpacity>
      ))}
    </>
  );
};

export default TabsComponents;
