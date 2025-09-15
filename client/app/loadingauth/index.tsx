import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
    <View>
      <Text>loading...</Text>
    </View>
    </SafeAreaView>
  );
}
