import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";

export enum COLORS {
  lightblue = "bg-blue-300",
  lightgreen = "bg-green-100",
}

export enum TEXTCOLORS {
  green = "color-green-400",
}

export enum ButtonSize {
  small = "px-4",
  medium = "px-6",
  large = "px-8 py-3",
  xl = "px-10 py-3",
  xs = "px-1 py-0",
  xss = "px-0 py-0",
  custom = "px-7 py-2",
}

interface TransactionButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  size?: ButtonSize | string;
  color?: COLORS | string;
  textcolor?: TEXTCOLORS;
  loading?: boolean
}

const TransactionButton = ({
  onPress,
  title,
  disabled,
  size,
  color,
  textcolor,
  loading
}: TransactionButtonProps) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center rounded-full shadow-sm ${size ?? "py-3"} ${disabled ? "bg-gray-200" : color ? color : "bg-green-400"}`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text
        className={`${(size === ButtonSize.xs || size === ButtonSize.xss) ? "text-xs" : size === ButtonSize.custom ? "text-xs" : "text-lg"} ${disabled ? "text-gray-500" : textcolor ? textcolor : "text-white"}`}
      >
        {loading ? <ActivityIndicator size={'small'} color={'green'}/> : title}
      </Text>
    </TouchableOpacity>
  );
};

export default TransactionButton;
