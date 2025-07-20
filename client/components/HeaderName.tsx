import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

interface HeaderProps {
  otherprops: boolean;
  headertext: string;
  children: React.ReactNode;
  onPress?: () => void;
}

const HeaderName = ({
  children,
  otherprops,
  headertext,
  onPress,
}: HeaderProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-gray-50 gap-4 flex-1">
        <View className="flex-row justify-between py-5 px-3 bg-white w-full">
          <TouchableOpacity
            className="flex-row items-center gap-3"
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" color={"lightgreen"} />
            <Text>{headertext}</Text>
          </TouchableOpacity>
          {otherprops && (
            <TouchableOpacity className="items-center" onPress={onPress}>
              <Text className="text-green-500">History</Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="px-3 gap-4">{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderName;
