import { View, Text, TextInput } from "react-native";
import React from "react";

interface textInputprops {
  onChange: (e: string) => void;
  value: string;
  error?: boolean;
  placeholdervalue?: string
  multiline?: boolean;
  border?: boolean;
}
const TextInputs = ({ onChange, value, error , placeholdervalue , multiline , border}: textInputprops) => {
  return (
    <View>
      <TextInput
        placeholder={!placeholdervalue ? "Enter recipent username" : placeholdervalue}
        className={`font-medium text-lg bg-gray-50 py-4 px-3 ${border ? "border focus:border-green-200 border-gray-100 rounded-md": "border-b-2 border-blue-50"}`}
        onChangeText={onChange}
        value={value}
        multiline={multiline}
        maxLength={30}
        numberOfLines={3}
      />
      {error === true && (
        <Text className="font-light text-xs color-red-500">Input contains unwanted characters</Text>
      )}
    </View>
  );
};

export default TextInputs;
