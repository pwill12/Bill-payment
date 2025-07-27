import { Text, TouchableOpacity } from "react-native";
import React from "react";

export enum COLORS {
  lightblue = "bg-blue-300",
}

export enum ButtonSize {
  small = "px-4",
  medium = "px-6",
  large = "px-8",
  xl = "px-10"
}

interface TransactionButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  size?: ButtonSize;
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
      className={`items-center justify-center rounded-full py-3 shadow-sm ${size} ${disabled ? "bg-gray-200" : color ? color : "bg-green-400"}`}
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
