import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import { Ref, useCallback } from "react";
import TransactionButton, { ButtonSize, COLORS } from "./TransactionButton";
import useTransfer from "@/hooks/useTransfer";
import { transactiontype } from "@/types";

interface Props {
  name: string | undefined;
  receiver: string | undefined;
  bank: string;
  amount: number;
  type: transactiontype | undefined;
  Ref: Ref<BottomSheet>;
  onClose: () => void;
}

const ConfirmTransfer = ({
  Ref,
  onClose,
  receiver,
  bank = "Billy",
  amount,
  type,
  name,
}: Props) => {
  const { createsend, isCreating} = useTransfer(
    amount,
    type,
    receiver,
  );
  const { height } = Dimensions.get("screen");
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  
  return (
    <BottomSheet
      ref={Ref}
      index={-1}
      onClose={onClose}
      handleIndicatorStyle={{ display: "none" }}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      {isCreating ? (
        <BottomSheetView
          className="flex-1 px-4 justify-center items-center"
          style={{ minHeight: height * 0.5 }}
        >
          <ActivityIndicator size={"large"} />
          <Text className="mt-4 text-center">Processing your transfer...</Text>
        </BottomSheetView>
      ) : (
        <BottomSheetView
          className="flex-1 px-4"
          style={{ minHeight: height * 0.5 }}
        >
          <TouchableOpacity className="self-end" onPress={onClose}>
            <Feather className="" name="x" size={20} />
          </TouchableOpacity>
          <View className="gap-5">
            <Text className="text-center text-xl font-semibold">Reminder</Text>
            <Text className="">
              Double check the transfer details before you proceed Pls note that
              successful transfers cannot be reversed.
            </Text>
            <View className="flex-col p-3 rounded-lg bg-slate-100 gap-3">
              <Text className="font-semibold">Transaction Details</Text>
              <View className="flex-row justify-between">
                <Text>Name</Text>
                <Text className="font-semibold">{name}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>username</Text>
                <Text className="font-semibold">{receiver}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Bank</Text>
                <Text className="font-semibold">{bank}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Amount</Text>
                <View className="flex-row items-center">
                  <Feather name="dollar-sign" size={15} />
                  <Text className="font-semibold">{amount ?? 0}</Text>
                </View>
              </View>
            </View>
            <View className="flex-row justify-between px-5">
              <TransactionButton
                title="Recheck"
                size={ButtonSize.xl}
                color={COLORS.lightblue}
                onPress={onClose}
              />
              <TransactionButton
                title="Confirm"
                size={ButtonSize.xl}
                onPress={createsend}
              />
            </View>
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
};

export default ConfirmTransfer;
