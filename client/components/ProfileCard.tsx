import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { User } from "@/types";
import { Feather } from "@expo/vector-icons";
import {
  ProfileCards1,
  ProfileCards2,
  ProfileName,
  ProfileProps,
} from "@/utils/data";
import { displayUserdata } from "@/utils/Displayuserdata";

interface Profile {
  currentUser: User | undefined;
  categories?: ProfileProps[];
  type: typeof ProfileCards1 | typeof ProfileCards2;
  onProfilePress?: (category: string, type: string) => void;
}

const ProfileCard = ({
  currentUser,
  categories,
  type,
  onProfilePress,
}: Profile) => {
  const Categories = categories || type;

  const handleUpdate = (category: string | undefined, type?: string) => {
    onProfilePress?.(category!, type!);
  };

  return (
    <View className="">
      {currentUser !== undefined && (
        <View className="flex-col px-4 gap-8 bg-white py-3 rounded-xl">
          {Categories.map((category) => (
            <View key={category.id}>
              {category.name === ProfileName.USERNAME && (
                <View className="flex-col items-center gap-3 mb-8">
                  <Image
                    source={{ uri: currentUser.img }}
                    className="h-20 w-20 rounded-full"
                  />
                  <Text className="font-semibold text-xl">
                    {currentUser?.firstname}
                  </Text>
                </View>
              )}
              <View className="flex-row justify-between">
                <Text>{category.name}</Text>
                <TouchableOpacity
                  className="flex-row items-center gap-1"
                  onPress={() => {
                    if (category.name === ProfileName.USERNAME) {
                      Alert.alert("Username Copied");
                    } else {
                      handleUpdate(
                        displayUserdata(category?.name, currentUser),
                        category.name
                      );
                    }
                  }}
                  disabled={
                    category.name === ProfileName.ACCOUNT_TIER ||
                    category.name === ProfileName.EMAIL
                  }
                >
                  <Text className="text-gray-400">
                    {displayUserdata(category?.name, currentUser)}
                  </Text>
                  {category.name === ProfileName.USERNAME ? (
                    <Feather name="copy" color={"gray"} />
                  ) : (
                    <Feather name="arrow-right" color={"lightgray"} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ProfileCard;
