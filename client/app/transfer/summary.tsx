import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AmountCard from "@/components/AmountCard";
import Remark from "@/components/Remark";
import TransactionButton from "@/components/TransactionButton";
import { useCurrentUser } from "@/hooks/useCurrentuser";
import ConfirmTransfer from "@/components/ConfirmTX";
import BottomSheet from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const TransferSummary = () => {
  const params = useLocalSearchParams();
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const firstname = Array.isArray(params.firstname)
    ? params.firstname[0]
    : params.firstname;
  const img = Array.isArray(params.img) ? params.img[0] : params.img;
  const lastname = Array.isArray(params.lastname)
    ? params.lastname[0]
    : params.lastname;
  const { currentUser, isLoading, error } = useCurrentUser();
  const [checkbalance, setcheckbalance] = useState(true)
  const [amount, setamount] = useState<string>("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleChange = (text: string) => {
    setamount(text);
  };
  const handleModal = () => {
    bottomSheetRef.current?.expand();
  };

  const handleCollapsePress = () => bottomSheetRef.current?.close();

  useEffect(() => {
    if (currentUser !== undefined && amount) {
    setcheckbalance(parseFloat(amount) > currentUser?.balance)
  }
  }, [currentUser, amount])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-slate-50 gap-4">
        <View className="flex-row justify-between py-5 px-3 bg-white">
          <TouchableOpacity
            className="flex-row items-center gap-3"
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" color={"lightgreen"} />
            <Text>Confirm Transaction</Text>
          </TouchableOpacity>
        </View>
        <View className="px-3 gap-4">
          <View className="flex-row gap-5">
            <Image
              source={{ uri: `${img}` }}
              className="size-20 rounded-full"
            />
            <View className="flex-col gap-1">
              <Text className="font-medium text-xl">
                {firstname} {lastname}
              </Text>
              <Text className="font-light text-gray-500">{name}</Text>
            </View>
          </View>
          <AmountCard handleChange={handleChange} amount={amount} />
          <Remark />
          <TransactionButton onPress={handleModal} title={!amount ? 'Enter amount' : checkbalance ? 'Insufficent funds' : 'Confirm' } disabled={checkbalance} />
        </View>
      </View>
      <ConfirmTransfer
        Ref={bottomSheetRef}
        onClose={handleCollapsePress}
        name={`${firstname} ${lastname}`}
        username={name}
        amount={parseFloat(amount)}
      />
    </SafeAreaView>
  );
};

export default TransferSummary;
