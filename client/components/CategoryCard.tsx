import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  CategoryProps,
  PaybillsCategory,
  SendMoneyorDeposit,
  SuccessCategory,
} from "@/utils/data";

export enum categorystyle {
  small = "px-5 py-4",
  medium = "px-10 py-8",
}
interface CategoryActionProps {
  categories?: CategoryProps[];
  onCategoryPress?: (categories: CategoryProps) => void;
  type:
    | typeof PaybillsCategory
    | typeof SuccessCategory
    | typeof SendMoneyorDeposit;
  styles?: categorystyle;
  bg?: boolean;
  card?: boolean;
}

const CategoryActions = ({
  categories,
  onCategoryPress,
  type,
  styles,
  bg,
  card
}: CategoryActionProps) => {
  const Categories = categories || type;

  const handlePress = (category: CategoryProps) => {
    onCategoryPress?.(category);
  };
  return (
    <View
      className={`${styles ? styles : "py-4 px-5"} flex-row ${bg && "bg-white"} items-center mt-0 ${card ? 'gap-3' : "justify-between"} rounded-lg`}
    >
      {Categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          className={`flex-col items-center gap-1 ${card && 'bg-white px-6 py-3 rounded-lg'}`}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Pay ${category.name} bills`}
          onPress={() => handlePress(category)}
        >
          <View className="items-center bg-green-50 rounded-lg p-2">
          <MaterialCommunityIcons
            name={category.icon}
            size={category.size}
            color={"lightgreen"}
          />
          </View>
          <Text className="text-xs">{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryActions;
