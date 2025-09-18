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
  const [offset, setoffset] = useState<number>(0);
  const { transactionslog, isLoading, refetch } = useTransactions(
    username,
    moredata,
    offset
  );
  const [users, setUsers] = useState(transactionslog ?? []);
  const [loading, setloading] = useState(isLoading);
  React.useEffect(() => {
    if (transactionslog) {
      setUsers(transactionslog);
      setloading(false);
    }
  }, [transactionslog]);
  console.log(
    transactionslog?.length !== undefined && transactionslog.length,
    transactionslog !== undefined && transactionslog.length < 10
      ? true
      : false
  );
  const handleloadmore = () => {
    setmoredata((prev) => prev + 10);
    if (transactionslog && transactionslog.length === 10) {
      setoffset((prev)=> prev + 10)
      setUsers((currentUsers) => [...currentUsers, ...transactionslog]);
    }else if (transactionslog && transactionslog.length < 10) {
      console.log('no more')
    }
    
    void refetch();
  };
  return (
    <HeaderName headertext="Transaction History">
      <TransactionCard
        transactions={Array.from(
          new Map(users.map((item) => [item.id, item])).values()
        )}
        loading={loading}
        username={username}
        loadpage={handleloadmore}
        showload
        loadmore={isLoading}
        lastindex={users.length - 1 ? true : false}
      />
    </HeaderName>
  );
};

export default TransactionHistory;
