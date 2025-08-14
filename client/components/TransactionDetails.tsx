import { View, Text, ActivityIndicator, ScrollView, Dimensions } from "react-native";
import React from "react";
import HeaderName from "./HeaderName";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGetTransaction } from "@/hooks/useTransactions";
import { Monthdate } from "@/utils/dateFormat";
import TransactionButton, { ButtonSize, COLORS, TEXTCOLORS } from "./TransactionButton";

interface details {
  id?: number;
}
const TransactionDetails = ({ id }: details) => {
  const { transaction_details, isLoading } = useGetTransaction(id);
  const {height} = Dimensions.get("screen")
  if (isLoading) {
    return (
      <View className="flex-1 px-4 justify-center items-center">
        <ActivityIndicator size={"large"} />
        <Text className="mt-4 text-center">loading transaction...</Text>
      </View>
    );
  }
  return (
    <HeaderName
      headertext="Transaction Details"
      showhistorybutton
      icon="customerservice"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80, gap: 16 }}
        style={{maxHeight: height*0.79}}
      >
        <View className="gap-5 bg-white flex-col mt-6 rounded-md px-3 py-4">
          <View className="items-center bottom-11">
            <MaterialCommunityIcons
              name="bank"
              size={24}
              className="bg-white p-3 rounded-full absolute border border-gray-50"
              color={"green"}
            />
          </View>
          <View className="gap-5 bg-white flex-col mt-6 rounded-md items-center">
            <Text className="font-semibold text-xl">
              Transfer to {transaction_details?.receiver}
            </Text>
            <View className="flex-row items-center">
              <Feather name="dollar-sign" size={24} />
              <Text className="font-bold text-4xl">
                {transaction_details?.amount}
              </Text>
            </View>
            <Text className="text-green-500">Successful</Text>
            <View className="flex-row items-center gap-2">
              <Feather
                name="check"
                color={"white"}
                size={15}
                className="bg-green-400 rounded-full"
              />
              <View className="h-px w-1/4 bg-green-500"></View>
              <Feather
                name="check"
                color={"white"}
                size={15}
                className="bg-green-400 rounded-full"
              />
              <View className="h-px w-1/4 bg-green-500"></View>
              <Feather
                name="check"
                color={"white"}
                size={15}
                className="bg-green-400 rounded-full"
              />
            </View>
            <View className="flex-row gap-5 overflow-hidden flex-wrap">
              <Text className="text-xs color-slate-400">
                payment successful
              </Text>
              <Text className="text-xs color-slate-400">
                Processing by Bank
              </Text>
              <Text className="text-xs color-slate-400">
                Transfer successful
              </Text>
            </View>
            <View className="bg-gray-100 p-4 rounded-3xl">
              <Text className="text-sm text-gray-600">
                The recipient account is expected to be credited within seconds
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-stretch">
            <Text>Amount</Text>
            <View className="flex-row items-center">
              <Feather name="dollar-sign" size={15} />
              <Text className="font-semibold">
                {transaction_details?.amount}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-stretch">
            <Text>Fees</Text>
            <View className="flex-row items-center">
              <Feather name="dollar-sign" size={15} />
              <Text className="font-semibold">0.00</Text>
            </View>
          </View>
          <View className="flex-row justify-between items-stretch">
            <Text>Amount Paid</Text>
            <View className="flex-row items-center">
              <Feather name="dollar-sign" size={15} />
              <Text className="font-semibold">
                {transaction_details?.amount}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-col px-3 py-4 rounded-lg bg-white gap-3 font-light">
          <Text className="font-semibold">Transaction Details</Text>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Recipent Details</Text>
            <Text className="font-semibold">
              {transaction_details?.receiver}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Transaction No.</Text>
            <Text className="font-semibold">{transaction_details?.id}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Transaction Date</Text>
            <Text className="font-semibold">
              {Monthdate(transaction_details?.created_at)}
            </Text>
          </View>
        </View>
        <View className="flex-col px-3 py-4 rounded-lg bg-white gap-3 font-light">
          <Text className="font-semibold">More Actions</Text>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Category</Text>
            <Text className="font-semibold">
              {transaction_details?.type}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Transfer Again</Text>
          </View>
        </View>
      </ScrollView>
      <View className="flex-row px-5 absolute bottom-0 gap-5 items-center self-center -mb-safe-offset-20">
        <TransactionButton
          title="Report Issue"
          size={ButtonSize.large}
          color={COLORS.lightgreen}
          textcolor={TEXTCOLORS.green}
        />
        <TransactionButton title="Share Receipt" size={ButtonSize.large} />
      </View>
    </HeaderName>
  );
};

export default TransactionDetails;
