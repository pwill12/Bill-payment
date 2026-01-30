import BonusReward from "@/components/ExtrasCard";
import TransactionButton, { ButtonSize } from "@/components/TransactionButton";
import { useCurrentUser } from "@/hooks/useCurrentuser";
import { Profile } from "@/utils/data";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Account = () => {
  const { currentUser } = useCurrentUser();

  return (
    <SafeAreaView className=" bg-gray-50 flex-1" edges={['top']}>
      <View className="flex-col gap-4 px-4 py-3">
        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-row gap-3 items-center" onPress={()=> router.push('/profile')}>
            <Image
              source={{ uri: currentUser?.img }}
              className="w-11 h-11 rounded-full"
            />
            <View className="flex-col self-center justify-center">
              <Text className="font-semibold text-2xl">
                Hi, {currentUser?.username}
              </Text>
              <TransactionButton
                disabled
                title="upgrade to tier 3"
                size={ButtonSize.xss}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="settings" size={24} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{}}
          contentContainerStyle={{ paddingBottom: 100, gap: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <View className=" gap-4 flex-col">
            <View className="flex-row justify-between">
              <View className="flex-col gap-3">
                <View className="flex-row gap-1 items-center">
                  <Text className="font-light">Total Balance</Text>
                  <Feather name="eye" className="items-center" size={15} />
                </View>
                <View className="flex-row items-center">
                  <Feather
                    name="dollar-sign"
                    className="items-center"
                    size={20}
                  />
                  <Text className="font-semibold text-4xl">
                    {currentUser?.balance}
                  </Text>
                </View>
              </View>
              <Feather name="shield" size={70} color={"gray"} />
            </View>
            <View className="bg-sky-200 flex-row px-3 gap-1 py-4 rounded-xl">
              <Feather name="shield" className="items-start" size={14} />
              <View className="flex-1">
                <View className="">
                  <Text className="-top-1 text-white">
                    Security check is not turned on
                  </Text>
                  <Text className="-top-1 text-white">
                    Make Your account more secure with extra security check
                  </Text>
                </View>
              </View>
              <View className="">
                <TransactionButton title="Turn on" size={ButtonSize.custom} />
              </View>
            </View>
            <BonusReward type={Profile} bg/>
            <BonusReward type={Profile} bg/>
            <BonusReward type={Profile} bg/>
            <BonusReward type={Profile} bg/>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Account;
