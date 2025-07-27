import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TransferLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/(auth)"} />;
  }

  return <GestureHandlerRootView><Stack screenOptions={{ headerShown: false }} /></GestureHandlerRootView>
};

export default TransferLayout;
