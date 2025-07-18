import { View, Text } from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";

interface BillCategory {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof Feather>['name'] | React.ComponentProps<typeof Ionicons>['name'] | undefined
  iconSet: "Ionicons" | "Feather";
  size?: number
}


interface PayBillsProps {
  categories?: BillCategory[];
  onCategoryPress?: (category: BillCategory) => void;
}

const PayBills = ({categories, onCategoryPress} : PayBillsProps) => {

  const defaultCategories: BillCategory[] = [
    { id: "airtime", name: "Airtime", icon: 'cellular', iconSet: "Ionicons" ,size: 21},
    { id: "data", name: "Data", icon: "wifi", iconSet: "Feather" },
    { id: "betting", name: "Betting", icon: "football", iconSet: "Ionicons" },
    { id: "tv", name: "TV", icon: "tv", iconSet: "Feather" },
  ];

  const billCategories = categories || defaultCategories;
  const iconNames = 'cellular'
  return (
    <View className="py-4 px-5 flex-row bg-white items-center mt-5 justify-between rounded-lg">
      {billCategories.map((category)=>(
        <View
        key={category.id}
        className="flex-col items-center gap-1"
             accessible={true}
             accessibilityRole="button"
             accessibilityLabel={`Pay ${category.name} bills`}
        >
          {category.iconSet === 'Ionicons' && (<Ionicons name={category.icon} size={category.size}/>)}
          {category.iconSet === 'Feather' && <Feather name={category.icon} size={21}/>}
          <Text className="text-xs">{category.name}</Text>
        </View>
      ))}
    </View>

  );
};

export default PayBills;
