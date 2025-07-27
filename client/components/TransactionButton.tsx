import { Text, TouchableOpacity } from "react-native";
import React from "react";

export enum COLORS {
  lightblue = "bg-blue-300",
}

interface TransactionButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  size?: string;
  color?: COLORS;
}

const TransactionButton = ({
  onPress,
  title,
  disabled,
  size,
  color,
}: TransactionButtonProps) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center rounded-full py-3 ${size ? `px-${size}` : "px-6"} shadow-sm ${
        disabled ? "bg-gray-200" : color ? color : "bg-green-400"
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
