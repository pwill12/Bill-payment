import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CategoryActions from "@/components/CategoryCard";
import { BonusCard, RewardsCard } from "@/utils/data";
import { categorystyle } from "@/types";
import TransactionButton, { ButtonSize } from "@/components/TransactionButton";
import BonusReward from "@/components/BonusReward";

const rewards = () => {
  const { height } = Dimensions.get("screen");

  return (
    <SafeAreaView
      className="flex-1 bg-teal-100 rounded-b-3xl"
      style={{ maxHeight: height * 0.265 }}
    >
      <View className="p-3 gap-4">
        <View className="flex flex-row justify-between py-3 items-center">
          <Text className="font-bold text-3xl">Rewards</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={20} />
          </TouchableOpacity>
        </View>
        <View className="px-2 gap-2">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Cashback</Text>
            <Text>Voucher</Text>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Feather name="dollar-sign" size={24} />
              <Text className="text-2xl font-bold">2</Text>
            </View>
            <Feather name="gift" size={24} />
          </View>
        </View>
        <View className="">
          <CategoryActions
            type={RewardsCard}
            styles={categorystyle.none}
            rewardstyle
          />
        </View>
        <View className="flex-col gap-2">
          <View className="flex-row gap-1">
            <Text className="text-sm">Welcome Bonus</Text>
            <TransactionButton disabled title="total bonus" size={ButtonSize.xs}/>
          </View>
          <BonusReward type={BonusCard}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default rewards;
