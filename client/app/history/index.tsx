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
  const [moredata, setmoredata] = useState<number>(10);
  const { transactionslog, isLoading , refetch} = useTransactions(username, moredata);
  const handleloadmore = () => {
    setmoredata((prev) => prev + 10);
    void refetch();
  };
  return (
    <HeaderName headertext="Transaction History">
      <TransactionCard
        transactions={transactionslog}
        loading={isLoading}
        username={username}
        loadpage={handleloadmore}
        showload
      />
    </HeaderName>
  );
};

export default TransactionHistory;
