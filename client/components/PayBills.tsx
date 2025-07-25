import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface BillCategory {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  size?: number
}


interface PayBillsProps {
  categories?: BillCategory[];
  onCategoryPress?: (category: BillCategory) => void;
}

const PayBills = ({categories, onCategoryPress} : PayBillsProps) => {

  const defaultCategories: BillCategory[] = [
    { id: "airtime", name: "Airtime", icon: 'cellphone-wireless' ,size: 21},
    { id: "data", name: "Data", icon: "wifi", size: 21},
    { id: "betting", name: "Betting", icon: "soccer", size: 21},
    { id: "tv", name: "TV", icon: "youtube-tv" , size: 21},
  ];

  const billCategories = categories || defaultCategories;
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
          <MaterialCommunityIcons name={category.icon} size={category.size} color={'lightgreen'}/>
          <Text className="text-xs">{category.name}</Text>
        </View>
      ))}
    </View>

  );
};

export default PayBills;
