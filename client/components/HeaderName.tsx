import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  ExternalPathString,
  RelativePathString,
  Router,
  router,
} from "expo-router";
import { Routes } from "@/utils/data";
import { navigate } from "expo-router/build/global-state/routing";

interface HeaderProps {
  showhistorybutton?: boolean;
  headertext?: string;
  children: React.ReactNode;
  onPress?: () => void;
  done?: string;
  icon?: React.ComponentProps<typeof AntDesign>["name"];
  customheadernavigate?: Routes;
}

const HeaderName = ({
  children,
  showhistorybutton,
  headertext,
  onPress,
  done,
  icon,
  customheadernavigate,
}: HeaderProps) => {
  const handleHeadernav = () => {
    if (customheadernavigate) {
      // router.push('/account');
      // navigate('/account')
      router.back()
    }
    router.back();
  };
  return (
    <SafeAreaView className={`flex-1 ${done ? "bg-gray-50" : "bg-white"}`}>
      <View className="bg-gray-50 gap-4 flex-1 sticky">
        <View
          className={`flex-row py-5 px-4 ${done ? "justify-end" : "justify-between"} ${done ? "" : "bg-white"}`}
        >
          {headertext && (
            <TouchableOpacity
              className="flex-row items-center gap-3"
              onPress={handleHeadernav}
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
              {icon ? (
                <AntDesign name={icon} size={20} />
              ) : (
                <Text className="text-green-500">
                  {done ? done : "History"}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
        <View className="px-4 gap-4">{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderName;
