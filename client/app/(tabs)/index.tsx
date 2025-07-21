import React from "react";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { useSyncDb } from "@/hooks/useRegister";
import { useUser } from "@clerk/clerk-expo";
import Balance from "@/components/Balance";
import PayBills from "@/components/PayBills";
import TransactionCard from "@/components/TransactionCard";
import { navigate } from "expo-router/build/global-state/routing";
import { Redirect } from "expo-router";

const HomeScreen = () => {
  useSyncDb();

  const { user } = useUser();
  const username = user?.emailAddresses[0].emailAddress.split("@")[0];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
      <View className="flex-col px-3 py-1 bg-gray-50">
        <View className="flex-row justify-between py-7">
          <View className="flex-row items-center gap-4">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-12 h-12 rounded-full mr-1"
            />
            <Text className="text-lg font-bold">Hi, {username}</Text>
          </View>
          <View className="flex-row gap-6 items-center">
            <AntDesign name="customerservice" size={24} />
            <Ionicons name="scan" size={24} />
            <Ionicons name="notifications-outline" size={24} />
            <SignOutButton />
          </View>
        </View>

        <Balance />

        <View className="py-8 px-10 flex-row bg-white items-center mt-5 justify-between rounded-lg">
          <View className="flex-col items-center gap-1">
            <MaterialCommunityIcons
              name="bank-outline"
              size={25}
              color={"lightgreen"}
            />
            <Text>To Bank</Text>
          </View>
          <TouchableOpacity onPress={()=> navigate('/transfer')}>
          <View className="flex-col items-center gap-1">
            <MaterialCommunityIcons
              name="contacts-outline"
              size={25}
              color={"lightgreen"}
            />
            <Text>To username</Text>
          </View>
          </TouchableOpacity>
          <View className="flex-col items-center gap-1">
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={25}
              color={"lightgreen"}
            />
            <Text>Atm Card</Text>
          </View>
        </View>
        <PayBills/>
        <TransactionCard/>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
