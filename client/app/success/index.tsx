import { View, Text, Alert } from "react-native";
import React from "react";
import HeaderName from "../../components/HeaderName";
import CategoryActions from "../../components/CategoryCard";
import { CategoryProps, Routes, SuccessCategory } from "@/utils/data";
import LottieView from "lottie-react-native";
import { Assetimages } from "@/assets";
import { homestyles } from "@/assets/styles/home.styles";
import { router, useLocalSearchParams } from "expo-router";
import { categorystyle } from "@/types";
import { useAddFavorite } from "@/hooks/useFavorite";

const Success = () => {
  const params = useLocalSearchParams();
  const amount = Array.isArray(params.amount)
    ? params.amount[0]
    : params.amount;
  const param_id = Array.isArray(params.id) ? params.id[0] : params.id;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const { createFavorite } = useAddFavorite(name);

  const handlecategory = (category: CategoryProps) => {
    const page = category?.page === Routes.TRANSACTION_DETAILS;
    const addFav = category.id === "favourites";
    if (page) {
      router.push({
        pathname: "/transaction-details",
        params: {
          id: param_id,
        },
      });
    }

    if (addFav) {
      createFavorite();
    }
    if (!page || addFav) {
      Alert.prompt("Upcoming", "Feature will be added soon");
    }
  };

  return (
    <HeaderName showhistorybutton done="Done" onPress={() => router.push("/")}>
      <View className="items-center">
        <View className="items-center gap-1">
          <LottieView
            source={Assetimages.success_img}
            style={homestyles.success}
            autoPlay
            loop
          />
          <Text className="text-2xl font-semibold">Transfer SuccessFul</Text>
          <Text className="text-xl font-medium">${amount}</Text>
        </View>
        <CategoryActions
          type={SuccessCategory}
          card
          styles={categorystyle.medium}
          onCategoryPress={handlecategory}
        />
      </View>
    </HeaderName>
  );
};

export default Success;
