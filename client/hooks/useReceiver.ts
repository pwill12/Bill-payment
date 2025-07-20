import { useQuery } from "@tanstack/react-query";
import { receiverApi, useApiClient} from "../utils/api";

export const useReceiver = (username?: string) => {
  const api = useApiClient();

  const {
    data: receiver,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['receiver'],
    queryFn: () => (receiverApi.getReceiver(api, username)),
    select: (response) => response?.data
  });

  return { receiver, isLoading, error, refetch };
};