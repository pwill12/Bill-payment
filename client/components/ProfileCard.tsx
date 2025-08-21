import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { User } from "@/types";
import { Feather } from "@expo/vector-icons";
import { ProfileCards1, ProfileCards2, ProfileName, ProfileProps } from "@/utils/data";

interface Profile {
  currentUser: User | undefined;
  categories?: ProfileProps[];
  showimg?: boolean;
  type: typeof ProfileCards1 | typeof ProfileCards2
}

const ProfileCard = ({ currentUser, categories, showimg=false, type}: Profile) => {
    const Categories = categories || type

    const displayUserdata = (type: ProfileProps['name']) => {
        switch (type) {
          case type=ProfileName.USERNAME:
            return currentUser?.username;
          case type=ProfileName.ACCOUNT_TIER:
            return 'Tier 2';
          case type=ProfileName.MOBILE_NUMBER:
            return currentUser?.number;
          default:
            return "";
        }
      };
  return (
    <View className="">
      {currentUser !== undefined &&
          <View
            className="flex-col px-4 gap-4 bg-white py-3 rounded-xl"
          >
            {Categories.map((category) => (
              <View key={category.id}>
            {showimg && (
              <View className="flex-col items-center gap-2">
                <Image
                  source={{ uri: currentUser.img}}
                  className="h-20 w-20 rounded-full"
                />
                <Text className="font-semibold text-xl">
                  {currentUser?.firstname}
                </Text>
              </View>
            )}
            <View className="flex-row justify-between">
              <Text>{category.name}</Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="font-light">{displayUserdata(category?.name)}</Text>
                <Feather name="copy" />
              </TouchableOpacity>
            </View>
            </View>
            ))}
          </View>
          }
    </View>
  );
};

export default ProfileCard;
