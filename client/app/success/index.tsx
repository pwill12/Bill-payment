import { View, Text } from "react-native";
import React from "react";
import HeaderName from "../../components/HeaderName";
import CategoryActions from "../../components/CategoryCard";
import { SuccessCategory } from "@/utils/data";
import LottieView from "lottie-react-native";
import { Assetimages } from "@/assets";
import { homestyles } from "@/assets/styles/home.styles";
import { router } from "expo-router";
import { categorystyle } from "@/types";

interface successtype {
  text: string;
}

const Success = ({ text }: successtype) => {
  const handlePress = () => {
    router.push('/')
  }
  return (
    <HeaderName showhistorybutton done="Done" onPress={handlePress}>
      <View className="items-center">
        <View className="items-center gap-1">
          <LottieView
            source={Assetimages.success_img}
            style={homestyles.success}
            autoPlay
            loop
          />
          <Text className="text-2xl font-semibold">Transfer SuccessFul</Text>
        <Text className="text-xl font-medium">$1</Text>
        </View>
        <CategoryActions
          type={SuccessCategory}
          card
          styles={categorystyle.medium}
        />
      </View>
    </HeaderName>
  );
};

export default Success;
