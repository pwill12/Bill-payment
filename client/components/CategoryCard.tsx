import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  CategoryProps,
  PaybillsCategory,
  Profile,
  RewardsCard,
  SendMoneyorDeposit,
  SuccessCategory,
} from "@/utils/data";
import { categorystyle } from "@/types";

interface CategoryActionProps {
  categories?: CategoryProps[];
  onCategoryPress?: (categories: CategoryProps) => void;
  type:
    | typeof PaybillsCategory
    | typeof SuccessCategory
    | typeof RewardsCard
    | typeof SendMoneyorDeposit
    | typeof Profile;
  styles?: categorystyle;
  bg?: boolean;
  card?: boolean;
  rewardstyle?: boolean;
  disabled?: boolean;
}

const CategoryActions = ({
  categories,
  onCategoryPress,
  type,
  styles,
  bg,
  card,
  rewardstyle,
  disabled,
}: CategoryActionProps) => {
  const Categories = categories || type;

  const handlePress = (category: CategoryProps) => {
    onCategoryPress?.(category);
  };
  return (
    <View
      className={`${styles ? styles : "py-4 px-5"} flex-row ${bg && "bg-white"} items-center mt-0 ${card ? "gap-3" : "justify-between"} rounded-lg`}
    >
      {Categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          className={`flex-col items-center gap-1 ${card ? "bg-white max-h-20 min-h-20 min-w-32 max-w-32 rounded-lg items-center justify-center" : rewardstyle ? "bg-white rounded-xl max-h-24 min-h-24 min-w-24 max-w-24 justify-center" : ""}`}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Select ${category.name}`}
          onPress={() => handlePress(category)}
          disabled={disabled}
        >
          <View className="items-center bg-green-50 rounded-lg p-2">
            <MaterialCommunityIcons
              name={category.icon}
              size={category.size}
              color={"lightgreen"}
            />
          </View>
          <Text
            className={`text-xs ${category.id === "favourites" ? (disabled ? "text-gray-300" : "") : ""}`}
          >
            {category.id === "favourites"
              ? disabled
                ? "Added to favorites"
                : "Add to favorite"
              : category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryActions;
