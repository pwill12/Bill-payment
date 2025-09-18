import { useQuery } from "@tanstack/react-query";
import { transactionsApi, useApiClient } from "../utils/api";
import { Transactions, User } from "@/types";

interface transaction {
  data: {
    data: Transactions[];
  };
}

interface user {
  data: {
    data: Omit<User, "balance" | "email">[];
  };
}

interface transactiondetail {
  data: Transactions;
}
export const useTransactions = (
  username: string | undefined,
  limit: number = 10,
  offset?: number
) => {
  const api = useApiClient();
  const normalizedUsername = username?.trim();
  const safeLimit = Math.max(1, Math.min(limit, 100));
  const offsetLimit = Math.max(1, Math.min(offset ?? 0, 100));
  const {
    data: transactionslog,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactions", normalizedUsername, safeLimit, offsetLimit],
    queryFn: () => transactionsApi.getUserTransactions(api, normalizedUsername!, safeLimit, offsetLimit),
    enabled: Boolean(normalizedUsername),
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

export const useRecentUsers = (username?: string, limit: number = 10) => {
  const api = useApiClient();

  const {
    data: recentUsers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recents", username, limit],
    queryFn: () => transactionsApi.getRecentTransactions(api, username, limit),
    enabled: Boolean(username),
    select: (response: user) => response.data.data,
  });

  return { recentUsers, isLoading, error, refetch };
};
