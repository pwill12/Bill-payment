import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

interface textInputprops {
  onChange: (e: string) => void;
  value: string;
  error?: boolean;
  placeholdervalue?: string;
  multiline?: boolean;
  border?: boolean;
}
const TextInputs = ({
  onChange,
  value,
  error,
  placeholdervalue,
  multiline,
  border,
}: textInputprops) => {
  return (
    <View>
      <View
        className={`flex-row justify-between items-center`}>
        <TextInput
          placeholder={placeholdervalue ?? "Enter Text"}
          className={`font-medium text-lg flex-1 px-3 py-4
            ${border ? "border focus:border-green-200 border-gray-100 rounded-md" : "border-b-2 border-blue-50"}
          `}
          onChangeText={onChange}
          value={value}
          multiline={multiline}
          maxLength={30}
          numberOfLines={3}
        />
        {value ? (
          <TouchableOpacity
            onPress={() => onChange("")}
            accessibilityRole="button"
            accessibilityLabel="Clear input"
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            className="absolute right-1"
          >
            <Feather name="x" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        ) : null}
      </View>
      {error === true && (
        <Text className="font-light text-xs text-red-500">
          Input contains unwanted characters
        </Text>
      )}
    </View>
  );
};

export default TextInputs;
