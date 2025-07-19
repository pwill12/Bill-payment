import { Text, TouchableOpacity } from "react-native";
import React from "react";

const TransactionButton = () => {
  return (
    <TouchableOpacity
      className="items-center justify-center bg-green-400 rounded-full py-3 px-6"
      onPress={() => {}}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <Text className="text-white text-xl">Next</Text>
    </TouchableOpacity>
  );
};

export default TransactionButton;
