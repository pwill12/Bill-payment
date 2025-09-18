import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

    if (isLoaded === false) {
      return <Redirect href={'/loadingauth'}/>
    } else if (isSignedIn) {
      return <Redirect href={'/(tabs)'}/>
    }

  return <Stack screenOptions={{ headerShown: false }} />;
}
