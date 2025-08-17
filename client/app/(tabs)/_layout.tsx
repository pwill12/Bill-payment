import { useAuth } from "@clerk/clerk-expo";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Mytab() {
  const insets = useSafeAreaInsets();
  const {isSignedIn} = useAuth()
  if (!isSignedIn) {
    return <Redirect href='/(auth)'/>
  }
  return (
    <Tabs
      screenOptions={{
        animation: 'shift',
        transitionSpec: {
          animation: 'spring',
          config: {mass: 1}
        },
        tabBarVisibilityAnimationConfig: {hide: {animation: 'timing'}},
        tabBarActiveTintColor: "lightgreen",
        tabBarInactiveTintColor: "lightgray",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          borderTopColor: "#E1E8ED",
          height: 60 + insets.bottom,
          paddingTop: 1,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="home-outline" color={color} size={size}/>,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color, size }) => <Feather name="gift" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "Card",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "profile",
          tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
