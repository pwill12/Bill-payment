import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

const TransferLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/(auth)"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default TransferLayout;
