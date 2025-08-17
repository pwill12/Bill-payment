import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import HeaderName from "@/components/HeaderName";
import TransactionCard from "@/components/TransactionCard";
import { useTransactions } from "@/hooks/useTransactions";
import { useLocalSearchParams } from "expo-router";

const TransactionHistory = () => {
  const params = useLocalSearchParams();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;
  let loadmore = 10;
  const [moredata, setmoredata] = useState(loadmore)
  console.log(moredata)
  const { transactionslog, isLoading } = useTransactions(username, moredata);
  const [data, setdata] = useState(transactionslog)
  const handleloadmore = () => {
    setmoredata(loadmore+=1);
  };
  return (
    <HeaderName headertext="Transaction History">
      <TransactionCard
        transactions={transactionslog}
        loading={isLoading}
        username={username}
        loadpage={handleloadmore}
      />
    </HeaderName>
  );
};

export default TransactionHistory;
