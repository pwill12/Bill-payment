import { useAuth } from "@clerk/clerk-expo";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

export default function Mytab() {
  const insets = useSafeAreaInsets();
  const {isSignedIn} = useAuth()
  
  // Consistent tab bar height across platforms
  // Use minimum bottom padding to ensure visibility on all devices
  const MIN_BOTTOM_PADDING = 8;
  const BASE_TAB_BAR_HEIGHT = 60;
  
  // Calculate bottom padding with minimum fallback
  const bottomPadding = Math.max(insets.bottom, MIN_BOTTOM_PADDING);
  
  // Consistent height calculation for both platforms
  const tabBarHeight = BASE_TAB_BAR_HEIGHT + bottomPadding;
  
  if (!isSignedIn) {
    return <Redirect href='/(auth)'/>
  }
  return (
    <Tabs
      screenOptions={{
        tabBarVisibilityAnimationConfig: {hide: {animation: 'timing'}},
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#6b7280", // Darker gray for better visibility on white
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: tabBarHeight,
          paddingTop: 8,
          paddingBottom: bottomPadding,
          // Use elevation for Android, shadow for iOS
          ...Platform.select({
            android: {
              elevation: 8,
            },
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
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
          title: "Account",
          tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
