import { View, Text, Alert, ScrollView } from "react-native";
import React, { useEffect } from "react";
import TransferCard from "@/components/TransferCard";
import HeaderName from "@/components/HeaderName";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useReceiver } from "@/hooks/useReceiver";
import { useAuth } from "@clerk/clerk-expo";
import RecentTransfer from "@/components/RecentsTransfer";
import { TabsCategory } from "@/utils/data";
import { useRecentUsers } from "@/hooks/useTransactions";
import { useCurrentUser } from "@/hooks/useCurrentuser";
import { useGetFavorites } from "@/hooks/useFavorite";

const TransferPageCard = () => {
  const { currentUser } = useCurrentUser();
  const { fetchUsersandCache, data, loading } = useReceiver();
  const { userId } = useAuth();

  const handlePress = () => {
    router.push({
      pathname: "/history",
      params: {
        username: currentUser?.username,
      },
    });
  };

  const HandleTransfer = async (username: string) => {
    await fetchUsersandCache(username);
  };

  useEffect(() => {
    if (data?.clerk_id === userId) {
      Alert.alert("You cannot send to yourself");
    } else if (data?.username) {
      router.push({
        pathname: "/transfer/summary",
        params: {
          name: data?.username,
          firstname: data?.firstname,
          lastname: data?.lastname,
          img: data?.img,
        },
      });
    }
  }, [data, userId]);

  const { recentUsers, isLoading } = useRecentUsers(currentUser?.username, 4);
  const { favoriteUser, favloading } = useGetFavorites(4);

  return (
    <HeaderName
      showhistorybutton={true}
      headertext="Transfer to User Account"
      onPress={handlePress}
      // customheadernavigate={Routes.PROFILE_PAGE}
    >
      <ScrollView
        contentContainerStyle={{
          gap: 16,
        }}
      >
        <View className="bg-blue-50 px-3 py-4 flex-row gap-2 items-center rounded-xl ">
          <MaterialCommunityIcons name="bank-transfer" size={21} />
          <Text>Free transfer for today 3</Text>
        </View>
        <TransferCard onTransfer={HandleTransfer} isLoading={loading} />
        <RecentTransfer
          data={TabsCategory}
          categories={recentUsers ?? []}
          favorites={favoriteUser ?? []}
          loading={isLoading}
          favoriteloading={favloading}
        />
      </ScrollView>
    </HeaderName>
  );
};

export default TransferPageCard;
