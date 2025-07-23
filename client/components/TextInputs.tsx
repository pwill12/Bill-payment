import { View, Text, TextInput } from "react-native";
import React from "react";
import { homestyles } from "@/assets/styles/home.styles";

interface textInputprops {
  onChange: (e: string) => void;
  value: string;
  error?: boolean;
  placeholdervalue?: string
  multiline?: boolean
}
const TextInputs = ({ onChange, value, error , placeholdervalue , multiline}: textInputprops) => {
  return (
    <View style={homestyles.border}>
      <TextInput
        placeholder={!placeholdervalue ? "Enter recipent username" : placeholdervalue}
        className={`font-medium text-lg`}
        onChangeText={onChange}
        value={value}
        multiline={multiline}
      />
      {error === true && (
        <Text className="font-light text-xs color-red-500">Input contains unwanted characters</Text>
      )}
    </View>
  );
};

export default TextInputs;
