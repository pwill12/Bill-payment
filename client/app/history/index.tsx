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
  const moredata = 10
  const [offset, setoffset] = useState<number>(0);
  const { transactionslog, isLoading, refetch } = useTransactions(
    username,
    moredata,
    offset
  );
  const [users, setUsers] = useState(transactionslog ?? []);
  const [loading, setloading] = useState(isLoading);
  const [hasMoreData, sethasMoreData] = useState(true);

  React.useEffect(() => {
    if (!transactionslog) return;
    setUsers((prev) => {
      if (prev.length === 0 && offset === 0) return transactionslog;
      const byId = new Map(prev.map((i) => [i.id, i]));
      for (const t of transactionslog) byId.set(t.id, t);
      return Array.from(byId.values());
    });
    setloading(false)
  }, [transactionslog, offset]);
  const handleloadmore = () => {
    setoffset((prev) => prev + moredata);
    void refetch();
  };

  React.useEffect(() => {
    if (transactionslog && transactionslog.length < moredata) {
      console.log("no more data");
      sethasMoreData(false);
      // setUsers((currentUsers) => [...currentUsers, ...transactionslog]);
    }
  }, [transactionslog, moredata]);
  return (
    <HeaderName headertext="Transaction History">
      <TransactionCard
        // transactions={Array.from(
        //   new Map(users.map((item) => [item.id, item])).values()
        // )}
        transactions={users}
        loading={loading}
        username={username}
        loadpage={handleloadmore}
        showload
        loadmore={isLoading}
        lastindex={hasMoreData}
      />
    </HeaderName>
  );
};

export default TransactionHistory;
