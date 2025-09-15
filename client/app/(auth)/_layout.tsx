import { Redirect, router, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  // console.log(isSignedIn)

  useEffect(() => {
    if (isLoaded === false) {
      router.replace("/loadingauth");
    } else if (isSignedIn) {
      router.replace("/(tabs)");
    }
  }, [isLoaded, isSignedIn]);

  if (isLoaded === false || isSignedIn) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
}
