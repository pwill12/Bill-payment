import { useQuery } from "@tanstack/react-query";
import { transactionsApi, useApiClient } from "../utils/api";
import { Transactions } from "@/types";

interface transaction {
  data: Transactions[]
}
export const useTransactions = (username: string | undefined) => {
  const api = useApiClient();

  const {
    data: transactionslog,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionsApi.getUserTransactions(api, username),
    select: (response: transaction) => response.data,
  });

  return { transactionslog, isLoading, error, refetch };
};