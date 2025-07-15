import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading() {
  const { isSignedIn,isLoaded } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(tabs)"} />;
  }else if (isLoaded === true){
    return <Redirect href={"/(auth)"} />;

  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
    <View>
      <Text>loading...</Text>
    </View>
    </SafeAreaView>
  );
}
