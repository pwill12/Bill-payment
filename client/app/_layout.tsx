
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="onboarding"/>
        {/* <Stack.Screen name="(auth)"/> */}
        {/* <Stack.Screen name="(tabs)"/> */}
        <StatusBar barStyle={'light-content'}/>
      </Stack>
  )

}
