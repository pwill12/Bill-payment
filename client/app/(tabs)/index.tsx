import React from "react";
import {
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { useSyncDb } from "@/hooks/useRegister";
import { useUser } from "@clerk/clerk-expo";
import Balance from "@/components/Balance";
import CategoryActions, { categorystyle } from "@/components/CategoryCard";
import TransactionCard from "@/components/TransactionCard";
import { navigate } from "expo-router/build/global-state/routing";
import {
  CategoryProps,
  PaybillsCategory,
  SendMoneyorDeposit,
} from "@/utils/data";

const HomeScreen = () => {
  useSyncDb();

  const { user } = useUser();
  const username = user?.emailAddresses[0].emailAddress.split("@")[0];

  const handleCatPress = (category: CategoryProps) => {
    const page = category?.page;
    {
      page && navigate(`/${page}`);
    }
  };

  return (
    <ScrollView className="flex-1">
      <SafeAreaView className="bg-gray-50">
        <View className="flex-col px-3 py-3 gap-4">
          <View className="flex-row justify-between py-1">
            <View className="flex-row items-center gap-5">
              <Image
                source={{ uri: user?.imageUrl }}
                className="w-12 h-12 rounded-full"
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
          <CategoryActions
            type={SendMoneyorDeposit}
            onCategoryPress={handleCatPress}
            bg
            styles={categorystyle.medium}
          />
          <CategoryActions
            type={PaybillsCategory}
            onCategoryPress={handleCatPress}
            bg
          />
          <TransactionCard />
          <TransactionCard />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
