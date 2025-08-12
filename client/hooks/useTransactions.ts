import { useQuery } from "@tanstack/react-query";
import { transactionsApi, useApiClient } from "../utils/api";
import { Transactions } from "@/types";

interface transaction {
  data: {
    data: Transactions[]
  };
}

interface transactiondetail {
    data: Transactions
}
export const useTransactions = (username: string | undefined) => {
  const api = useApiClient();

  const {
    data: transactionslog,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactions", username],
    queryFn: () => transactionsApi.getUserTransactions(api, username!),
    enabled: Boolean(username),
    select: (response: transaction) => response.data.data,
  });

  return { transactionslog: transactionslog, isLoading, error, refetch };
};

export const useGetTransaction = (id: number | undefined) => {
  const api = useApiClient();

  const {
    data: transaction_details,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactiondetail", id],
    queryFn: () => transactionsApi.getTransaction(api, id!),
    enabled: Boolean(id),
    select: (response: transactiondetail) => response.data,
  });

  return { transaction_details, isLoading, error, refetch };
};
