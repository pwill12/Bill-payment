import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useCurrentUser } from "@/hooks/useCurrentuser";
import { router } from "expo-router";

const Balance = () => {
  const { currentUser, isLoading } = useCurrentUser();

  return (
    <View className="px-5 py-5 bg-green-500 rounded-2xl justify-center">
      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Feather name="shield" color={"white"} />
          <Text className="color-white">Available Balance</Text>
          <Feather name="eye" color={"white"} />
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/history",
              params: {
                username: currentUser?.username,
              },
            })
          }
        >
          <View className="flex-row items-center gap-2">
            <Text className="color-slate-100">Transaction history</Text>
            <Feather name="arrow-right" size={10} color={"#f1f5f9"} />
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Feather name="dollar-sign" size={23} color={"white"} />
          <Text className="color-white font-medium text-xl">
            {isLoading ? "loading" : currentUser?.balance}
          </Text>
        </View>
        <TouchableOpacity
          className="flex-row items-center justify-center bg-white rounded-full py-1 px-2"
          onPress={() => router.push("/addmoney")}
        >
          <Feather name="plus" size={17} color={"lightgreen"} />
          <Text className="text-sm color-lime-600">Add Money</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Balance;
