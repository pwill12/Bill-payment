import { View, Text } from "react-native";
import React from "react";
import HeaderName from "../../components/HeaderName";
import { Feather } from "@expo/vector-icons";
import CategoryActions, { categorystyle } from "../../components/CategoryCard";
import { SuccessCategory } from "@/utils/data";
import LottieView from "lottie-react-native";
import { Assetimages } from "@/assets";
import { homestyles } from "@/assets/styles/home.styles";
import { Redirect } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";

interface successtype {
  text: string;
}

const Success = ({ text }: successtype) => {
  const handlePress = () => {
    navigate('/')
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
        {/* Implement custom category bg */}
      </View>
    </HeaderName>
  );
};

export default Success;
