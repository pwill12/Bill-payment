import { View, Text } from "react-native";
import React from "react";
import HeaderName from "../../components/HeaderName";
import CategoryActions from "../../components/CategoryCard";
import { CategoryProps, SuccessCategory } from "@/utils/data";
import LottieView from "lottie-react-native";
import { Assetimages } from "@/assets";
import { homestyles } from "@/assets/styles/home.styles";
import { router, useLocalSearchParams } from "expo-router";
import { categorystyle } from "@/types";

const Success = () => {
  const params = useLocalSearchParams();
  const amount = Array.isArray(params.amount)
    ? params.amount[0]
    : params.amount;

  const handlecategory = (category: CategoryProps) => {
    const page = category?.page;
    {
      page &&
        router.push({
          pathname: "/transaction-details",
          params: {
            id: category.id,
          },
        });
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
