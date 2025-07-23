import { View, Text, TextInput, TouchableOpacity, GestureResponderEvent } from "react-native";
import React, { useState } from "react";
import NumberInputs from "./NumberInputs";

const AmountCard = () => {
  const [amount, setamount] = useState<string>("");
  const handleChange = (text: string) => {
    setamount(text);
  };

  const handlePress = (value: string) => {
    // const numericValue: string | number = parseFloat(value)
    setamount(value)
  }
  return (
    <View className="gap-4 bg-white p-4 rounded-lg">
      <Text className="font-semibold">Amount</Text>
      <NumberInputs onchange={handleChange} value={amount} />
      <View className="flex-row gap-2 overflow-hidden flex-wrap">
        <TouchableOpacity className="bg-gray-200 justify-center items-center px-10 py-4 rounded-xl" onPress={() => handlePress('10')}>
          <Text className="text-sm">10</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 justify-center items-center px-10 py-4 rounded-xl" onPress={() => handlePress('15')}>
          <Text className="text-sm">15</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 justify-center items-center px-10 py-4 rounded-xl" onPress={() => handlePress('20')}>
          <Text className="text-sm">20</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 justify-center items-center px-10 py-4 rounded-xl" onPress={() => handlePress('25')}>
          <Text className="text-sm">25</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 justify-center items-center px-10 py-4 rounded-xl" onPress={() => handlePress('30')}>
          <Text className="text-sm">30</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 justify-center items-center px-10 py-4 rounded-xl" onPress={() => handlePress('35')}>
          <Text className="text-sm">35</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AmountCard;
