import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BonusCard, CategoryProps, Profile } from "@/utils/data";
import { categorystyle } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TransactionButton, { ButtonSize } from "./TransactionButton";

interface CategoryActionProps {
  categories?: CategoryProps[];
  onCategoryPress?: (categories: CategoryProps) => void;
  type: typeof BonusCard | typeof Profile;
  styles?: categorystyle;
  bg?: boolean;
  card?: boolean;
  rewardstyle?: boolean;
  showspecial?: boolean;
}
const BonusReward = ({
  categories,
  type,
  showspecial,
  bg,
}: CategoryActionProps) => {
  const Categories = categories || type;
  return (
    <View
      className={`px-3 py-4 rounded-xl gap-4 ${bg ? "bg-white" : "bg-green-50"}`}
    >
      {showspecial && (
        <Text className="font-semibold">Special Bonus For You</Text>
      )}
      {Categories.map((category) => (
        <TouchableOpacity key={category.id} className="flex-row gap-2">
          <View className="bg-white py-3 px-4 items-center rounded-2xl">
            <MaterialCommunityIcons
              name={category.icon}
              size={bg ? category.size : 24}
              color={"green"}
            />
          </View>
          <View className={`flex-col flex-1 justify-center`}>
            <Text className="font-semibold">{category.name}</Text>
            {category.text && 
            <Text className="font-light text-sm">{category.text}</Text>
            }
          </View>
          <View className="justify-center">
            <TransactionButton title="GO" size={ButtonSize.custom} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BonusReward;
