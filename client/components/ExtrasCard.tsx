import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { addMoneyCard, BonusCard, CategoryProps, Profile } from "@/utils/data";
import { categorystyle } from "@/types";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import TransactionButton, {
  ButtonSize,
  COLORS,
  TEXTCOLORS,
} from "./TransactionButton";

interface CategoryActionProps {
  categories?: CategoryProps[];
  onCategoryPress?: (categories: CategoryProps) => void;
  type: typeof BonusCard | typeof Profile | typeof addMoneyCard;
  styles?: categorystyle;
  bg?: boolean;
  card?: boolean;
  rewardstyle?: boolean;
  showspecial?: boolean;
  addmoney?: boolean;
  username?: string;
}
const BonusReward = ({
  categories,
  type,
  showspecial,
  bg,
  addmoney,
  username,
  onCategoryPress
}: CategoryActionProps) => {
  const Categories = categories || type;
  const handlePress = (category: CategoryProps) => {
    onCategoryPress?.(category)
  }
  return (
    <View
      className={`${addmoney ? "gap-8" : "gap-4 px-3 py-4 rounded-xl"} ${bg ? "bg-white" : addmoney ? "" : "bg-green-50"}`}
    >
      {showspecial && (
        <Text className="font-semibold">Special Bonus For You</Text>
      )}
      {Categories.map((category, index) => (
        <View
          key={category.id}
          className={`flex-col gap-2 ${addmoney ? "bg-white px-4 py-5 rounded-2xl" : ""}`}
        >
          <TouchableOpacity
            className={`flex-row gap-3 items-center`}
            onPress={() => handlePress(category)}
          >
            <View
              className={`${bg ? "bg-gray-100" : addmoney ? "bg-gray-200 h-11" : "bg-white"}
               py-3 px-4 items-center justify-center rounded-2xl 
               ${bg && "border border-gray-100"}`}
            >
              <MaterialCommunityIcons
                name={category.icon}
                size={bg || addmoney ? category.size : 24}
                color={"green"}
              />
            </View>
            <View className={`flex-col flex-1 justify-center ${addmoney ? "gap-2" : ""}`}>
              <Text className="font-semibold">{category.name}</Text>
              {category.text && (
                <Text className="font-light text-sm">{category.text}</Text>
              )}
            </View>
            <View className="justify-center">
              {addmoney ? (
                <TouchableOpacity>
                  <Feather name="arrow-right" />
                </TouchableOpacity>
              ) : (
                <TransactionButton title="GO" size={ButtonSize.custom} />
              )}
            </View>
          </TouchableOpacity>
          {addmoney && index === 0 && (
            <View className="gap-6">
              <View className="h-0.5 bg-gray-300 mt-4"></View>
              <View className="gap-2">
                <Text className="text-gray-400">App Account Number</Text>
                <Text className="font-semibold text-4xl">{username}</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <TransactionButton
                  title="Copy"
                  size="h-12 w-48"
                  color={COLORS.lightgreen}
                  textcolor={TEXTCOLORS.green}
                />
                <TransactionButton
                  title="Share Details"
                  size="h-12 w-48"
                  color="bg-green-500"
                />
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default BonusReward;
