import {
  View,
  Text,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import TransactionButton from "./TransactionButton";

 interface TransferCardProps {
   onTransfer?: (username: string) => void;
   isLoading?: boolean;
 }

const TransferCard = ({ onTransfer, isLoading = false }: TransferCardProps) => {
  const [recipientUsername, setRecipientUsername] = useState('');
  const [error, setError] = useState('');

   const handleTransfer = () => {
     if (!recipientUsername.trim()) {
       setError('Please enter a recipient username');
       return Alert.alert("pls Input username");
     }
     setError('');
     onTransfer?.(recipientUsername);
   };

  return (
    <View className="flex-col gap-6 rounded-xl bg-white px-3 py-7">
      <Text className="font-semibold text-2xl">Recipient Account</Text>
      <TextInput
        placeholder="Enter recipent username"
        className='font-medium text-xl border border-gray-200 rounded p-3'
        onChangeText={setRecipientUsername}
        value={recipientUsername}
      />
      {error ? <Text className='text-red-500 text-sm mt-1'>{error}</Text> : null}
      <TransactionButton title={isLoading ? "Processing..." : "Next"} disabled={isLoading || !recipientUsername.trim()} onPress={handleTransfer}/>
    </View>
  );
};

export default TransferCard;
