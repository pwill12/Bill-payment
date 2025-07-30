import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

interface HeaderProps {
  showhistorybutton?: boolean;
  headertext?: string;
  children: React.ReactNode;
  onPress?: () => void;
  done?: string;
}

const HeaderName = ({
  children,
  showhistorybutton,
  headertext,
  onPress,
  done,
}: HeaderProps) => {
  return (
    <SafeAreaView className={`flex-1 ${done ? 'bg-gray-50' : 'bg-white'}`}>
      <View className="bg-gray-50 gap-4 flex-1 sticky">
        <View className={`flex-row py-5 px-3 ${done ? "justify-end" : "justify-between"} ${done ? '' : 'bg-white'}`}>
          {headertext && (
            <TouchableOpacity
              className="flex-row items-center gap-3"
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" color={"lightgreen"} />
              <Text>{headertext}</Text>
            </TouchableOpacity>
          )}
          {showhistorybutton && (
            <TouchableOpacity
              className=""
              onPress={onPress}
              accessibilityLabel={done ? done : "History"}
              role="button"
            >
              <Text className="text-green-500">{done ? done : "History"}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="px-3 gap-4">{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderName;
