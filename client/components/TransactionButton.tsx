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
  xss = "px-0 py-0",
  custom = "px-7 py-2",
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
      className={`items-center justify-center rounded-full shadow-sm ${size ?? "py-3"} ${disabled ? "bg-gray-200" : color ? color : "bg-green-400"}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className={`${(size === ButtonSize.xs || size === ButtonSize.xss) ? "text-xs" : size === ButtonSize.custom ? "text-xs" : "text-xl"} ${disabled ? "text-gray-500" : textcolor ? textcolor : "text-white"}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TransactionButton;
