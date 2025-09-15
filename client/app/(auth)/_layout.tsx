import { router, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  // console.log(isSignedIn)

  if (isLoaded === false) {
    router.push("/loadingauth");
  } else if (isSignedIn) {
    router.push("/(tabs)");
  } else {
    return <Stack screenOptions={{ headerShown: false }} />;
  }
}
