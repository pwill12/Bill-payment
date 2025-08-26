import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { useUser } from "@clerk/clerk-expo";
import Balance from "@/components/Balance";
import CategoryActions from "@/components/CategoryCard";
import {
  CategoryProps,
  PaybillsCategory,
  SendMoneyorDeposit,
} from "@/utils/data";
import { categorystyle } from "@/types";
import { useTransactions } from "@/hooks/useTransactions";
import TransactionCard from "@/components/TransactionCard";
import { useCurrentUser } from "@/hooks/useCurrentuser";
import { router } from "expo-router";
import { useValidatepaystack } from "@/hooks/useValidate";
import { useSyncDb } from "@/hooks/useRegister";

const HomeScreen = () => {
  useValidatepaystack()
  // useSyncDb()
  const { user } = useUser();
  const username = user
    ? (user.emailAddresses?.[0]?.emailAddress?.split("@")[0] ?? "")
    : "";
  const { transactionslog,isLoading ,refetch} = useTransactions(username, 4);
  const { refetch: refetchbalance} = useCurrentUser();

  const [isRefetching, setIsRefetching] = useState(false);

  const handleCatPress = (category: CategoryProps) => {
    const page = category?.page;
    {
      page && router.push(`/${page}`);
    }
  };

  const handlePullToRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    await refetchbalance();
    setIsRefetching(false);
  };

  return (
    <SafeAreaView className="bg-gray-50 flex-1">
      <View className="flex-col py-3 px-4 gap-4">
        <View className="flex-row justify-between py-1">
          <View className="flex-row items-center gap-5">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-11 h-11 rounded-full"
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80, gap: 16 }}
          pagingEnabled
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handlePullToRefresh}
              tintColor={"#1DA1F2"}
            />
          }
        >
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
          <TransactionCard transactions={transactionslog} loading={isLoading} username={username}/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
