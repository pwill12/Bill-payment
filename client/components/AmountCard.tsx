import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import NumberInputs from "./NumberInputs";

interface AmountProps {
  amount: string
  handleChange: (e: string) => void
}
const AmountCard = ({handleChange, amount }: AmountProps) => {
  const handlePress = (value: string) => {
    handleChange?.(value);
  };
  

  return (
    <View className="gap-4 bg-white p-4 rounded-lg">
      <Text className="font-semibold">Amount</Text>
      <NumberInputs onchange={handlePress} value={amount} />
      <View className="flex-row gap-1 overflow-hidden flex-wrap">
        <TouchableOpacity className="bg-gray-200 justify-center items-center min-h-12 max-w-24 min-w-24 rounded-xl" onPress={() => handlePress('10')}>
          <Text className="text-sm">10</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 justify-center items-center min-h-12 max-w-24 min-w-24 rounded-xl" onPress={() => handlePress('15')}>
          <Text className="text-sm">15</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 justify-center items-center min-h-12 max-w-24 min-w-24 rounded-xl" onPress={() => handlePress('20')}>
          <Text className="text-sm">20</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 justify-center items-center min-h-12 max-w-24 min-w-24 rounded-xl" onPress={() => handlePress('25')}>
          <Text className="text-sm">25</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 justify-center items-center min-h-12 max-w-24 min-w-24 rounded-xl" onPress={() => handlePress('30')}>
          <Text className="text-sm">30</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 justify-center items-center min-h-12 max-w-24 min-w-24 rounded-xl" onPress={() => handlePress('35')}>
          <Text className="text-sm">35</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AmountCard;
