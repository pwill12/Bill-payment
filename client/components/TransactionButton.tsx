import { Text, TouchableOpacity } from "react-native";
import React from "react";

interface TransactionButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
}

const TransactionButton = ({
  onPress,
  title,
  disabled,
}: TransactionButtonProps) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center rounded-full py-3 px-6 shadow-sm ${
        disabled ? "bg-gray-200" : "bg-green-400"
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={`text-xl ${disabled ? "text-gray-500" : "text-white"}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TransactionButton;
