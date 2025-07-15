import React from "react";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddMoney from "@/components/AddMoney";
import SignOutButton from "@/components/SignOutButton";
import { useSyncDb } from "@/hooks/useRegister";

const HomeScreen = () => {

  useSyncDb()
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-col px-3 py-2 bg-gray-50">
        <View className="flex-row justify-between py-7">
          <View className="flex-row items-center gap-4">
            <Feather name="user" size={27}/>
            <Text className="text-lg font-bold">Hi, Princewill</Text>
          </View>
          <View className="flex-row gap-6 items-center">
            <AntDesign name="customerservice" size={24}/>
            <Ionicons name="scan" size={24}/>
            <Ionicons name="notifications-outline" size={24}/>
            <SignOutButton/>
          </View>
        </View>
        <View className="px-5 py-5 bg-green-500 rounded-2xl justify-center">
          <View className="flex-row justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Feather name="shield" color={"white"} />
              <Text className="color-white">Available Balance</Text>
              <Feather name="eye" color={'white'}/>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="color-slate-100">Transaction history</Text>
              <Feather name="arrow-right" size={10} color={'#f1f5f9'}/>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Feather name="dollar-sign" size={23} color={"white"} />
              <Text className="color-white font-medium text-3xl">200</Text>
            </View>
            <AddMoney/>
          </View>
        </View>
        <View className="py-8 px-10 flex-row bg-white items-center mt-5 justify-between rounded-lg">
          <View className="flex-col items-center gap-1">
            <MaterialCommunityIcons name="bank-outline" size={25} color={'lightgreen'}/>
            <Text>To Bank</Text>
          </View>
          <View className="flex-col items-center gap-1">
            <MaterialCommunityIcons name="contacts-outline" size={25} color={'lightgreen'}/>
            <Text>To Paystack</Text>
          </View>
          <View className="flex-col items-center gap-1">
            <MaterialCommunityIcons name="credit-card-outline" size={25} color={'lightgreen'}/>
            <Text>Atm Card</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
