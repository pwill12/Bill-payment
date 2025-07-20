import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn,isLoaded } = useAuth();
  // console.log(isSignedIn)

  if (isLoaded === false) {
    return <Redirect href={"/loadingauth/loadingauth"} />;
  }else if (isSignedIn){
    return <Redirect href={"/(tabs)"} />;
  }
  else {
    return <Stack screenOptions={{ headerShown: false }} />;
  }

}
