import { Stack } from "expo-router";
import "../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
// import { getItem } from "@/utils/asyncStorage";

const queryClient = new QueryClient();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

export default function RootLayout() {
  // Debug: Log environment variable
  console.log(
    "[DEBUG] EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:",
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  );
  console.log(
    "[DEBUG] Using publishableKey:",
    publishableKey ? "Key found" : "Key missing",
  );
  // const checkstate = async () => {
  //   let onboarded = await getItem("onboarded");
  //   if (onboarded === "true") {
  //     return <Redirect href={"/(auth)"} />;
  //     // navigate('/(auth)')
  //   } else {
  //     return <Redirect href={"/onboarding"} />;
  //   }
  // };
  // checkstate();

  // }

  console.log(
    "[DEBUG] Using publishableKey:",
    publishableKey ? "Key found" : "Key missing",
  );

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          {/* <Stack.Screen name="transferpage" /> */}
        </Stack>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
