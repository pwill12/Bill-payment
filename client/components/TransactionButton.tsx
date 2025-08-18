import { Text, TouchableOpacity } from "react-native";
import React from "react";

export enum COLORS {
  lightblue = "bg-blue-300",
  lightgreen = "bg-green-50",
}

export enum TEXTCOLORS {
  green = "color-green-400",
}

export enum ButtonSize {
  small = "px-4",
  medium = "px-6",
  large = "px-8",
  xl = "px-10",
  xs = "px-1 py-0",
  custom = "px-6 py-1",
}

interface TransactionButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  size?: ButtonSize;
  color?: COLORS;
  textcolor?: TEXTCOLORS;
}

const TransactionButton = ({
  onPress,
  title,
  disabled,
  size,
  color,
  textcolor,
}: TransactionButtonProps) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center rounded-full py-3 shadow-sm ${size} ${disabled ? "bg-gray-200" : color ? color : "bg-green-400"}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className={`${size === ButtonSize.xs ? "text-xs" : size === ButtonSize.custom ? "text-xs" : "text-xl"} ${disabled ? "text-gray-500" : textcolor ? textcolor : "text-white"}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TransactionButton;
