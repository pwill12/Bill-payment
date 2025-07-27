import { Redirect, Stack } from "expo-router";
import "../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { getItem } from "@/utils/asyncStorage";

const queryClient = new QueryClient();

export default function RootLayout() {
  const checkstate = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded === "true") {
      return <Redirect href={"/(auth)"} />;
      // navigate('/(auth)')
    } else {
      return <Redirect href={"/onboarding"} />;
    }
  };
  checkstate();

  // }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="onboarding" /> */}
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          {/* <Stack.Screen name="transferpage" /> */}
        </Stack>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
