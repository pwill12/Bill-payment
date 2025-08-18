import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import HeaderName from "@/components/HeaderName";
import TransactionCard from "@/components/TransactionCard";
import { useTransactions } from "@/hooks/useTransactions";
import { useLocalSearchParams } from "expo-router";
import { Transactions } from "@/types";

const TransactionHistory = () => {
  const params = useLocalSearchParams();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;
  const [moredata, setmoredata] = useState<number>(10);
  const { transactionslog, isLoading } = useTransactions(username, moredata);
  const [data , setdata] = useState<Transactions[] | undefined>([...transactionslog as any[]])
  const handleloadmore = () => {
    setmoredata((prev) => prev + 1);
    setdata([...transactionslog as any[], transactionslog])
  };
  // const copied : Transactions[] | undefined = [...transactionslog as any[], ...[transactionslog]]
  console.log(data)
  return (
    <HeaderName headertext="Transaction History">
      <TransactionCard
        transactions={data}
        loading={isLoading}
        username={username}
        loadpage={handleloadmore}
      />
    </HeaderName>
  );
};

export default TransactionHistory;
