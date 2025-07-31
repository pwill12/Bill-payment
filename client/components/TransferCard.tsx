import { View, Text } from "react-native";
import React, { useState } from "react";
import TransactionButton from "./TransactionButton";
import TextInputs from "./TextInputs";

interface TransferCardProps {
  onTransfer?: (username: string) => void;
  isLoading?: boolean;
  errors?: boolean;
}

const TransferCard = ({ onTransfer, isLoading }: TransferCardProps) => {
  const [recipientUsername, setRecipientUsername] = useState("");

  const handleChange = (text: string) => {
    setRecipientUsername(text);
  };

  const handleTransfer = () => {
    // if (recipientUsername.trim().includes()) {
    //   setError("Please enter a recipient username");
    //   return;
    // }
    // setError("");
    onTransfer?.(recipientUsername);
    setRecipientUsername('')
  };

  return (
    <View className="flex-col gap-6 rounded-xl bg-white px-3 py-7">
      <Text className="font-semibold text-xl">Recipient Account</Text>
      <TextInputs
        value={recipientUsername}
        onChange={handleChange}
        border
      />
      <TransactionButton
        title={isLoading ? "Processing..." : "Next"}
        disabled={isLoading || !recipientUsername.trim()}
        onPress={handleTransfer}
      />
    </View>
  );
};

export default TransferCard;
